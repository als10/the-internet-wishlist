export const ALL_COLORS = [
  'GRAY',
  'RED',
  'ORANGE',
  'YELLOW',
  'GREEN',
  'BLUE',
  'PURPLE',
  'PINK',
] as const;

type ColorTuple = typeof ALL_COLORS;

export type Color = ColorTuple[number];

export interface User {
  _id: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
}

export interface ProjectCard {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  backgroundColor: string;
  starredBy: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Project extends ProjectCard {
  creator: User;
  submissions: Submission[];
}

export interface Submission {
  _id: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
  creator: User;
}

export type UserDetails = Pick<User, '_id' | 'username' | 'avatar'>;

export interface SubmissionDetails
  extends Omit<Submission, 'creator' | 'createdAt'> {
  creator: UserDetails;
}

export interface ProjectDetails
  extends Omit<Project, 'creator' | 'createdAt' | 'submissions'> {
  creator: UserDetails;
  submissions: SubmissionDetails[];
}
