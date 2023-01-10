import { ApolloError } from '@apollo/client';
import { useEffect } from 'react';
import { ProjectCard as ProjectCardType } from '../../../types';
import Loader from '../base/Loader';
import useNotification from '../../hooks/NotificationContext';
import { ProjectCard } from './ProjectCard';

export interface ProjectCardsProps {
  projects: ProjectCardType[];
  filterProjects(projects: ProjectCardType[]): ProjectCardType[];
  loading?: boolean;
  isMyProject?: boolean;
  error?: ApolloError;
}

export default function ProjectCards({
  projects,
  filterProjects,
  loading,
  isMyProject,
  error,
}: ProjectCardsProps) {
  const { setError } = useNotification();

  useEffect(() => {
    if (error) {
      setError(error.message);
    }
  }, [error]);

  if (loading) return <Loader />;

  const filteredProjects = filterProjects(projects);

  return (
    <div className="px-2 md:px-8 flex flex-col space-y-2 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
      {filteredProjects.length === 0 && <div>No projects found.</div>}
      {filteredProjects.map((p) => (
        <ProjectCard key={p._id} project={p} isMyProject={!!isMyProject} />
      ))}
    </div>
  );
}
