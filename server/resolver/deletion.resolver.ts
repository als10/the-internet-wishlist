/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import type { Context } from '../context';
import { DeleteProjectInput } from '../schema/project.schema';
import LoginService from '../service/login.service';
import ProjectService from '../service/project.service';
import UserService from '../service/user.service';

@Resolver()
export default class DeletionResolver {
  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private loginService: LoginService,
  ) {
    this.projectService = new ProjectService();
    this.userService = new UserService();
    this.loginService = new LoginService();
  }

  async deleteProjectById(projectId: string) {
    const project = await this.projectService.deleteProjectById(projectId);
    if (!project) return project;

    for (const userWhoStarredId of project.starredBy as (
      | string
      | undefined
    )[]) {
      if (!userWhoStarredId) continue;

      await this.userService.removeStarredProject(userWhoStarredId, projectId);
    }

    return project;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteUser(@Ctx() context: Context) {
    console.log(`deleteUser endpoint called`);

    const user = context.user!;
    await this.userService.deleteUserById(user._id);
    if (!user) return false;

    for (const starredProjectId of user.starredProjects as (
      | string
      | undefined
    )[]) {
      if (!starredProjectId) continue;

      await this.projectService.removeUserFromStarredBy(
        starredProjectId,
        user._id,
      );
    }

    for (const projectId of user.projects as (string | undefined)[]) {
      if (!projectId) continue;

      await this.deleteProjectById(projectId);
    }

    await this.loginService.logout(context);

    return true;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteProject(
    @Arg('input') input: DeleteProjectInput,
    @Ctx() context: Context,
  ) {
    console.log(`deleteProject endpoint called`);

    const user = context.user!;

    const isProjectByUser = await this.userService.isProjectByUser(
      user._id,
      input.id,
    );
    if (!isProjectByUser) {
      console.log(
        `User ${user._id} is not authorized to delete project ${input.id}`,
      );
      return false;
    }

    const project = await this.deleteProjectById(input.id);
    if (!project) return false;

    await this.userService.removeProject(user._id, input.id);

    return true;
  }
}
