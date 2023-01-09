import { IsAlphanumeric, IsLowercase } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { User } from '../model/user.model';

@InputType()
export class LoginInput {
  @IsLowercase()
  @IsAlphanumeric()
  @Field(() => String)
  username: User['username'];

  @Field(() => String)
  password: User['password'];
}
