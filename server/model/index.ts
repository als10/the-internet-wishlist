import { getModelForClass } from '@typegoose/typegoose';
import { Project } from './project.model';
import { User, QueryHelpers } from './user.model';

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User);

export const ProjectModel = getModelForClass<typeof Project>(Project);
