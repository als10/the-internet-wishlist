import { ApolloCache, useMutation } from '@apollo/client';
import {
  ALL_PROJECTS_QUERY,
  MY_PROJECTS_QUERY,
  PROJECT_QUERY,
  STARRED_PROJECTS_QUERY,
  STAR_PROJECT_MUTATION,
  UNSTAR_PROJECT_MUTATION,
} from '../../utils/queries';
import useAuth from '../../hooks/AuthContext';
import { StarIcon } from '../base/Icon';
import useNotification from '../../hooks/NotificationContext';

interface StarButtonProps {
  shortened: boolean;
  starredBy: string[];
  projectId: string;
}

export default function StarButton({
  shortened,
  starredBy,
  projectId,
}: StarButtonProps) {
  const { user } = useAuth();
  const { setError } = useNotification();

  const updateProjectCache = (cache: ApolloCache<any>, starredBy: string[]) => {
    const thisProject = cache.readQuery({
      query: PROJECT_QUERY,
      variables: { input: { id: projectId } },
    }) as Record<string, any>;
    cache.writeQuery({
      query: PROJECT_QUERY,
      variables: { input: { id: projectId } },
      data: {
        project: {
          ...thisProject,
          starredBy,
        },
      },
    });
  };

  const [starProject] = useMutation(STAR_PROJECT_MUTATION, {
    refetchQueries: [
      { query: ALL_PROJECTS_QUERY },
      { query: STARRED_PROJECTS_QUERY },
      { query: MY_PROJECTS_QUERY },
    ],
    update(cache, { data: { starProject } }) {
      if (starProject) {
        updateProjectCache(cache, starProject);
      }
    },
    onError(error) {
      setError(error.message);
    },
  });
  const [unstarProject] = useMutation(UNSTAR_PROJECT_MUTATION, {
    refetchQueries: [
      { query: ALL_PROJECTS_QUERY },
      { query: STARRED_PROJECTS_QUERY },
      { query: MY_PROJECTS_QUERY },
    ],
    update(cache, { data: { unstarProject } }) {
      if (unstarProject) {
        updateProjectCache(cache, unstarProject);
      }
    },
    onError(error) {
      setError(error.message);
    },
  });

  const numberStarred = starredBy.length;
  const isStarred = !!user && starredBy.includes(user._id);

  const starButtonHandler = () => {
    const input = { id: projectId };

    if (isStarred) {
      unstarProject({
        variables: {
          input,
        },
      });
    } else {
      starProject({
        variables: {
          input,
        },
      });
    }
  };

  return (
    <div className="flex space-x-2 items-center">
      <button
        className={user ? '' : 'pointer-events-none'}
        type="button"
        onClick={user ? starButtonHandler : undefined}
      >
        <StarIcon
          className={`icon-s highlight-on-hover ${
            isStarred ? 'fill-amber-400' : 'fill-none'
          }`}
        />
      </button>
      {shortened ? (
        <div>{numberStarred}</div>
      ) : (
        <div>
          <span className="font-bold">{numberStarred} users</span> starred this{' '}
          project.
        </div>
      )}
    </div>
  );
}
