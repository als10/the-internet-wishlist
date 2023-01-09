import UserResolver from './user.resolver';
import ProjectResolver from './project.resolver';
import LoginResolver from './login.resolver';
import DeletionResolver from './deletion.resolver';
import StarringResolver from './starring.resolver';
import SubmissionResolver from './submission.resolver';

export default [
  UserResolver,
  ProjectResolver,
  DeletionResolver,
  LoginResolver,
  StarringResolver,
  SubmissionResolver,
] as const;
