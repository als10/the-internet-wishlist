import {
  IsAlphanumeric,
  IsEmail,
  IsJSON,
  IsLowercase,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Field, InputType, ObjectType } from 'type-graphql';
import { User } from '../../types';

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 50;

@ObjectType()
export class UserData {
  @Field(() => String)
  readonly _id: User['id'];

  @Field(() => String)
  username: User['username'];

  @Field(() => String)
  email: User['email'];

  @Field(() => String)
  avatar: User['avatar'];
}

@InputType()
export class CreateUserInput {
  @IsAlphanumeric()
  @IsLowercase()
  @Field(() => String)
  username: UserData['username'];

  @IsEmail()
  @Field(() => String)
  email: UserData['email'];

  @MinLength(MIN_PASSWORD_LENGTH, {
    message: 'Password must contain at least 6 characters.',
  })
  @MaxLength(MAX_PASSWORD_LENGTH, {
    message: 'Password must not contain more than 50 characters.',
  })
  @Field(() => String)
  password: User['password'];

  @IsJSON()
  @Field(() => String)
  avatar: UserData['avatar'];
}

@InputType()
export class UpdateUserInput {
  @IsAlphanumeric()
  @IsLowercase()
  @Field(() => String, { nullable: true })
  username?: UserData['username'];

  @IsEmail()
  @Field(() => String, { nullable: true })
  email?: UserData['email'];

  @IsJSON()
  @Field(() => String, { nullable: true })
  avatar?: UserData['avatar'];
}
