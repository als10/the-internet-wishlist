export enum Color {
  GRAY = 'bg-zinc-300',
  RED = 'bg-red-400',
  ORANGE = 'bg-orange-400',
  YELLOW = 'bg-amber-400',
  GREEN = 'bg-emerald-500',
  BLUE = 'bg-sky-500',
  PURPLE = 'bg-indigo-400',
  PINK = 'bg-pink-400',
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
}

export interface ProjectCard {
  id: string;
  title: string;
  description: string;
  tags: string[];
  backgroundColor: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project extends ProjectCard {
  creator: User;
  starredBy: string[];
  submissions: Submission[];
}

export interface Submission {
  id: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
  creator: User;
}
