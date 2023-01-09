/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import type { Context } from '../context';
import { StarProjectInput } from '../schema/project.schema';
import ProjectService from '../service/project.service';
import UserService from '../service/user.service';

@Resolver()
export default class StarringResolver {
  constructor(
    private projectService: ProjectService,
    private userService: UserService,
  ) {
    this.projectService = new ProjectService();
    this.userService = new UserService();
  }

  @Authorized()
  @Mutation(() => [String], { nullable: true })
  async starProject(
    @Arg('input') input: StarProjectInput,
    @Ctx() context: Context,
  ) {
    console.log(`starProject endpoint called`);
    const user = context.user!;
    const project = await this.projectService.addUserToStarredBy(
      input.id,
      user._id,
    );
    if (project) {
      await this.userService.addStarredProject(user._id, project._id);
    }
    return project?.starredBy;
  }

  @Authorized()
  @Mutation(() => [String], { nullable: true })
  async unstarProject(
    @Arg('input') input: StarProjectInput,
    @Ctx() context: Context,
  ) {
    console.log(`unstarProject endpoint called`);
    const user = context.user!;
    const project = await this.projectService.removeUserFromStarredBy(
      input.id,
      user._id,
    );
    if (project) {
      await this.userService.removeStarredProject(user._id, project._id);
    }
    return project?.starredBy;
  }
}
