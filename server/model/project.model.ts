import { ModelOptions, prop, Severity } from '@typegoose/typegoose';
import type { Ref } from '@typegoose/typegoose';
import { User } from './user.model';
import {
  Project as BaseProject,
  Submission as BaseSubmission,
} from '../../types';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Project {
  readonly _id: BaseProject['id'];

  @prop({ required: true, ref: () => User })
  creator: Ref<User>;

  @prop({ required: true })
  title: BaseProject['title'];

  @prop({ required: true })
  description: BaseProject['description'];

  @prop({ required: true })
  tags: BaseProject['tags'];

  @prop({ required: true })
  backgroundColor: BaseProject['backgroundColor'];

  @prop({ default: [], ref: () => User })
  starredBy: Ref<User>[];

  @prop({ type: () => [Submission], default: [] })
  submissions: Submission[];
}

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Submission {
  readonly _id: BaseSubmission['id'];

  @prop({ required: true, ref: () => User })
  creator: Ref<User>;

  @prop({ required: true })
  link: BaseSubmission['link'];
}
