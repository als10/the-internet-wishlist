/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import type { Context } from '../context';
import {
  CreateProjectInput,
  GetProjectByIdInput,
  ProjectCardData,
  ProjectData,
  UpdateProjectInput,
} from '../schema/project.schema';
import ProjectService from '../service/project.service';
import UserService from '../service/user.service';

@Resolver()
export default class ProjectResolver {
  constructor(
    private projectService: ProjectService,
    private userService: UserService,
  ) {
    this.projectService = new ProjectService();
    this.userService = new UserService();
  }

  @Query(() => [ProjectCardData])
  projects() {
    console.log(`projects endpoint called`);
    return this.projectService.getProjects();
  }

  @Query(() => ProjectData, { nullable: true })
  project(@Arg('input') input: GetProjectByIdInput) {
    console.log(`project endpoint called`);
    return this.projectService.getProjectById(input.id);
  }

  @Authorized()
  @Mutation(() => ProjectCardData)
  async createProject(
    @Arg('input') input: CreateProjectInput,
    @Ctx() context: Context,
  ) {
    console.log(`createProject endpoint called`);
    const user = context.user!;
    const newProject = await this.projectService.createProject({
      ...input,
      creator: user._id,
    });
    await this.userService.addProject(user._id, newProject._id);
    return newProject;
  }

  @Authorized()
  @Mutation(() => ProjectCardData, { nullable: true })
  async updateProject(
    @Arg('input') input: UpdateProjectInput,
    @Ctx() context: Context,
  ) {
    console.log(`updateProjectDetails endpoint called`);

    const user = context.user!;
    const isProjectByUser = await this.userService.isProjectByUser(
      user._id,
      input.id,
    );
    if (!isProjectByUser) {
      console.log(
        `User ${user._id} is not authorized to update project ${input.id}`,
      );
      return null;
    }

    return this.projectService.updateProjectById(input.id, input);
  }
}
