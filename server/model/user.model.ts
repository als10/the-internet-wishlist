import {
  pre,
  prop,
  index,
  ModelOptions,
  queryMethod,
  Severity,
} from '@typegoose/typegoose';
import type { ReturnModelType, Ref } from '@typegoose/typegoose';
import type { AsQueryMethod } from '@typegoose/typegoose/lib/types';
import bcrypt from 'bcrypt';
import { Project } from './project.model';
import { User as BaseUser } from '../../types';

const SALT_ROUNDS = 10;

function findByUsername(
  this: ReturnModelType<typeof User, QueryHelpers>,
  username: User['username'],
) {
  return this.findOne({ username });
}

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hashSync(password, salt);
}

export interface QueryHelpers {
  findByUsername: AsQueryMethod<typeof findByUsername>;
}

@pre<User>('save', async function () {
  if (this.isModified('password')) {
    this.password = await hashPassword(this.password);
  }
})
@index({ username: 1 })
@queryMethod(findByUsername)
@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User {
  readonly _id: BaseUser['id'];

  @prop({ default: true, select: false })
  verified: boolean;

  @prop({ required: true, unique: true })
  username: BaseUser['username'];

  @prop({ required: true, unique: true })
  email: BaseUser['email'];

  @prop({ required: true })
  password: BaseUser['password'];

  @prop({ required: true })
  avatar: BaseUser['avatar'];

  @prop({ default: [], ref: () => Project })
  projects: Ref<Project>[];

  @prop({ default: [], ref: () => Project })
  starredProjects: Ref<Project>[];
}
