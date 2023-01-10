import { Field, InputType, ObjectType } from 'type-graphql';
import { IsHexColor, IsNotEmpty, IsUrl } from 'class-validator';
import type { Project, Submission } from '../../types';
import { UserData } from './user.schema';

@ObjectType()
export class ProjectCardData {
  @Field(() => String)
  readonly _id: Project['_id'];

  @Field(() => String)
  title: Project['title'];

  @Field(() => String)
  description: Project['description'];

  @Field(() => [String])
  tags: Project['tags'];

  @Field(() => String)
  backgroundColor: Project['backgroundColor'];

  @Field(() => [String])
  starredBy: Project['starredBy'];

  @Field(() => Date)
  createdAt: Project['createdAt'];

  @Field(() => Date)
  updatedAt: Project['updatedAt'];
}

@ObjectType()
export class ProjectData extends ProjectCardData {
  @Field(() => UserData)
  creator: Project['creator'];

  @Field(() => [SubmissionData])
  submissions: Project['submissions'];
}

@ObjectType()
export class SubmissionData {
  @Field(() => String)
  readonly _id: Submission['_id'];

  @Field(() => UserData)
  creator: Submission['creator'];

  @Field(() => String)
  link: Submission['link'];

  @Field(() => Date)
  createdAt: Submission['createdAt'];

  @Field(() => Date)
  updatedAt: Submission['updatedAt'];
}

@InputType()
export class GetProjectByIdInput {
  @IsNotEmpty()
  @Field(() => String)
  id: ProjectData['_id'];
}

@InputType()
export class CreateProjectInput {
  @Field(() => String)
  title: ProjectData['title'];

  @Field(() => String)
  description: ProjectData['description'];

  @Field(() => [String])
  tags: ProjectData['tags'];

  @IsHexColor()
  @Field(() => String)
  backgroundColor: ProjectData['backgroundColor'];
}

@InputType()
export class UpdateProjectInput {
  @Field(() => String)
  id: ProjectData['_id'];

  @Field(() => String, { nullable: true })
  title?: ProjectData['title'];

  @Field(() => String, { nullable: true })
  description?: ProjectData['description'];

  @Field(() => [String], { nullable: true })
  tags?: ProjectData['tags'];

  @IsHexColor()
  @Field(() => String, { nullable: true })
  backgroundColor?: ProjectData['backgroundColor'];
}

@InputType()
export class DeleteProjectInput {
  @IsNotEmpty()
  @Field(() => String)
  id: ProjectData['_id'];
}

@InputType()
export class StarProjectInput {
  @IsNotEmpty()
  @Field(() => String)
  id: ProjectData['_id'];
}

@InputType()
export class AddSubmissionInput {
  @IsNotEmpty()
  @Field(() => String)
  id: ProjectData['_id'];

  @IsUrl()
  @Field(() => String)
  link: SubmissionData['link'];
}

@InputType()
export class RemoveSubmissionInput {
  @IsNotEmpty()
  @Field(() => String)
  id: ProjectData['_id'];
}
