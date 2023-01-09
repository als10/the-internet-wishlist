import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import type { Context } from '../context';
import LoginService from '../service/login.service';
import { LoginInput } from '../schema/login.schema';
import { UserData } from '../schema/user.schema';

@Resolver()
export default class LoginResolver {
  constructor(private loginService: LoginService) {
    this.loginService = new LoginService();
  }

  @Mutation(() => UserData, { nullable: true })
  login(@Arg('input') input: LoginInput, @Ctx() context: Context) {
    console.log(`login endpoint called`);
    return this.loginService.login(input, context);
  }

  @Mutation(() => Boolean)
  logout(@Ctx() context: Context) {
    console.log(`logout endpoint called`);
    return this.loginService.logout(context);
  }

  @Query(() => UserData, { nullable: true })
  me(@Ctx() context: Context) {
    console.log(`me endpoint called`);
    return context.user;
  }
}
