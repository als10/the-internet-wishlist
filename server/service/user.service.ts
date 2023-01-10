import { UserModel } from '../model';
import { Project } from '../model/project.model';
import { User } from '../model/user.model';
import { CreateUserInput, UpdateUserInput } from '../schema/user.schema';

export default class UserService {
  async getUsers() {
    console.log(`Fetching all users...`);
    return UserModel.find().lean();
  }

  async getUserById(id: User['_id']) {
    console.log(`Fetching user with id ${id}`);
    return UserModel.findById(id).lean();
  }

  async getUserByUsername(username: User['username']) {
    console.log(`Fetching user with username ${username}`);
    return UserModel.findOne({ username }).lean();
  }

  async getUserProjects(id: User['_id']) {
    console.log(`Fetching user projects with id ${id}`);
    return UserModel.findById(id)
      .populate('projects')
      .lean()
      .then((user) => user?.projects ?? []);
  }

  async getUserStarredProjects(id: User['_id']) {
    console.log(`Fetching user starred projects with id ${id}`);
    return UserModel.findById(id)
      .populate('starredProjects')
      .lean()
      .then((user) => user?.starredProjects ?? []);
  }

  async isProjectByUser(id: User['_id'], projectId: Project['_id']) {
    console.log(`Checking if project ${projectId} is by user ${id}`);
    return UserModel.findOne({ _id: id, projects: projectId }).count();
  }

  async createUser(input: CreateUserInput) {
    console.log(`Creating new user...`);
    return UserModel.create(input);
  }

  async updateUserById(id: User['_id'], input: UpdateUserInput) {
    console.log(`Updating user with id ${id}...`);
    return UserModel.findByIdAndUpdate(id, input, { new: true }).lean();
  }

  async deleteUserById(id: User['_id']) {
    console.log(`Deleting user with id ${id}...`);
    return UserModel.findByIdAndDelete(id).lean();
  }

  async addProject(id: User['_id'], projectId: Project['_id']) {
    console.log(`Adding project ${projectId} to user ${id}...`);
    return UserModel.findByIdAndUpdate(
      id,
      { $push: { projects: projectId } },
      { new: true },
    ).lean();
  }

  async removeProject(id: User['_id'], projectId: Project['_id']) {
    console.log(`Removing project ${projectId} from user ${id}...`);
    return UserModel.findByIdAndUpdate(
      id,
      { $pull: { projects: projectId } },
      { new: true },
    ).lean();
  }

  async addStarredProject(id: User['_id'], projectId: Project['_id']) {
    console.log(`Adding starred project ${projectId} to user ${id}...`);
    return UserModel.findByIdAndUpdate(
      id,
      { $push: { starredProjects: projectId } },
      { new: true },
    ).lean();
  }

  async removeStarredProject(id: User['_id'], projectId: Project['_id']) {
    console.log(`Removing starred project ${projectId} from user ${id}...`);
    return UserModel.findByIdAndUpdate(
      id,
      { $pull: { starredProjects: projectId } },
      { new: true },
    ).lean();
  }
}
