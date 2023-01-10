import { useQuery } from '@apollo/client';
import ProjectCards, { ProjectCardsProps } from '.';
import { STARRED_PROJECTS_QUERY } from '../../utils/queries';

type StarredProjectCardsProps = Pick<ProjectCardsProps, 'filterProjects'>;

export default function StarredProjectCards({
  filterProjects,
}: StarredProjectCardsProps) {
  const { data, loading, error } = useQuery(STARRED_PROJECTS_QUERY);

  return (
    <ProjectCards
      projects={data?.myStarredProjects ?? []}
      loading={loading}
      filterProjects={filterProjects}
      error={error}
    />
  );
}
