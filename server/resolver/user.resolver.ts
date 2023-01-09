/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import type { Context } from '../context';
import { ProjectCardData } from '../schema/project.schema';
import {
  CreateUserInput,
  UpdateUserInput,
  UserData,
} from '../schema/user.schema';
import UserService from '../service/user.service';

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => UserData)
  createUser(@Arg('input') input: CreateUserInput) {
    console.log(`createUser endpoint called`);
    return this.userService.createUser(input);
  }

  @Authorized()
  @Mutation(() => UserData)
  updateUser(@Arg('input') input: UpdateUserInput, @Ctx() context: Context) {
    console.log(`updateUser endpoint called`);
    const user = context.user!;
    return this.userService.updateUserById(user._id, input);
  }

  @Authorized()
  @Query(() => [ProjectCardData])
  myProjects(@Ctx() context: Context) {
    console.log(`myProjects endpoint called`);
    const user = context.user!;
    return this.userService.getUserProjects(user._id)!;
  }

  @Authorized()
  @Query(() => [ProjectCardData])
  myStarredProjects(@Ctx() context: Context) {
    console.log(`myStarredProjects endpoint called`);
    const user = context.user!;
    return this.userService.getUserStarredProjects(user._id)!;
  }
}
