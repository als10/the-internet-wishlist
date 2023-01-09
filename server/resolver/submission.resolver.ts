/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import type { Context } from '../context';
import {
  AddSubmissionInput,
  RemoveSubmissionInput,
  SubmissionData,
} from '../schema/project.schema';
import ProjectService from '../service/project.service';

@Resolver()
export default class SubmissionResolver {
  constructor(private projectService: ProjectService) {
    this.projectService = new ProjectService();
  }

  @Authorized()
  @Mutation(() => [SubmissionData], { nullable: true })
  async addSubmissionToProject(
    @Arg('input') input: AddSubmissionInput,
    @Ctx() context: Context,
  ) {
    console.log(`addSubmissionToProject endpoint called`);
    const user = context.user!;
    return this.projectService
      .addSubmission(input.id, user._id, input.link)
      .then((p) => p?.submissions);
  }

  @Authorized()
  @Mutation(() => [SubmissionData], { nullable: true })
  async removeSubmissionFromProject(
    @Arg('input') input: RemoveSubmissionInput,
    @Ctx() context: Context,
  ) {
    console.log(`removeSubmissionFromProject endpoint called`);
    const user = context.user!;
    return this.projectService
      .removeSubmission(input.id, user._id)
      .then((p) => p?.submissions);
  }
}
