import { useQuery } from '@apollo/client';
import ProjectCards, { ProjectCardsProps } from '.';
import { MY_PROJECTS_QUERY } from '../../utils/queries';

type MyProjectCardsProps = Pick<ProjectCardsProps, 'filterProjects'>;

export default function MyProjectCards({
  filterProjects,
}: MyProjectCardsProps) {
  const { data, loading, error } = useQuery(MY_PROJECTS_QUERY);

  return (
    <ProjectCards
      projects={data?.myProjects ?? []}
      filterProjects={filterProjects}
      loading={loading}
      error={error}
      isMyProject
    />
  );
}
