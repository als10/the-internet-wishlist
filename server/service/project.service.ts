import { ProjectModel } from '../model';
import { Project, Submission } from '../model/project.model';
import { User } from '../model/user.model';
import {
  CreateProjectInput,
  UpdateProjectInput,
} from '../schema/project.schema';

type NewProject = CreateProjectInput & { creator: User['_id'] };

export default class ProjectService {
  async getProjects() {
    console.log('Fetching all projects...');
    return ProjectModel.find().lean();
  }

  async getProjectById(id: Project['_id']) {
    console.log(`Fetching project with id ${id}...`);
    return ProjectModel.findOne({ _id: id })
      .populate('creator')
      .populate('submissions.creator')
      .lean();
  }

  async createProject(input: NewProject) {
    console.log('Creating new project...');
    return ProjectModel.create(input);
  }

  async updateProjectById(id: Project['_id'], input: UpdateProjectInput) {
    console.log(`Updating project with id ${id}...`);
    return ProjectModel.findByIdAndUpdate(
      id,
      { ...input, timestamp: new Date() },
      { new: true },
    ).lean();
  }

  async deleteProjectById(id: Project['_id']) {
    console.log(`Deleting project with id ${id}...`);
    return ProjectModel.findByIdAndDelete(id).lean();
  }

  async addUserToStarredBy(id: Project['_id'], userId: User['_id']) {
    console.log(`Adding user ${userId} to project ${id} starredBy...`);
    return ProjectModel.findByIdAndUpdate(
      id,
      { $addToSet: { starredBy: userId } },
      { new: true },
    ).lean();
  }

  async removeUserFromStarredBy(id: Project['_id'], userId: User['_id']) {
    console.log(`Removing user ${userId} from project ${id} starredBy...`);
    return ProjectModel.findByIdAndUpdate(
      id,
      { $pull: { starredBy: userId } },
      { new: true },
    ).lean();
  }

  async addSubmission(
    id: Project['_id'],
    userId: User['_id'],
    submission: Submission['link'],
  ) {
    console.log(`Adding submission for project with id ${id}...`);
    return ProjectModel.findByIdAndUpdate(
      id,
      { $push: { submissions: { creator: userId, link: submission } } },
      { new: true },
    )
      .populate('submissions.creator')
      .lean();
  }

  async removeSubmission(id: Project['_id'], userId: User['_id']) {
    console.log(`Removing submission for project with id ${id}...`);
    return ProjectModel.findByIdAndUpdate(
      id,
      { $pull: { submissions: { creator: userId } } },
      { new: true },
    )
      .populate('submissions.creator')
      .lean();
  }
}
