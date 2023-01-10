import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Page from '../../src/components/base/Page';
import ProjectForm, {
  BaseProject,
} from '../../src/components/forms/ProjectForm';
import {
  ALL_PROJECTS_QUERY,
  DELETE_PROJECT_MUTATION,
  MY_PROJECTS_QUERY,
  PROJECT_QUERY,
  UPDATE_PROJECT_MUTATION,
} from '../../src/utils/queries';
import useLoader from '../../src/hooks/LoadingContext';
import useNotification from '../../src/hooks/NotificationContext';
import Loader from '../../src/components/base/Loader';
import { newProject } from '../../src/utils';
import useAuth from '../../src/hooks/AuthContext';

export default function UpdateProject() {
  const router = useRouter();
  const { pid } = router.query;

  const { setLoading } = useLoader();
  const { user } = useAuth();
  const { setSuccess, setError } = useNotification();

  const [project, setProject] = useState<BaseProject>(newProject());
  const [fetchLoader, setFetchLoader] = useState(true);

  useQuery(PROJECT_QUERY, {
    variables: {
      input: { id: pid },
    },
    onCompleted(data) {
      setFetchLoader(false);
      if (data.project && data.project._id) {
        if (user && data.project.creator._id === user._id) {
          setProject({
            title: data.project.title,
            description: data.project.description,
            tags: data.project.tags,
            backgroundColor: data.project.backgroundColor,
          });
        } else {
          setError('You may only edit projects that you created.');
          router.back();
        }
      }
    },
    onError(error) {
      setFetchLoader(false);
      setError(error.message);
    },
  });

  const [updateProject] = useMutation(UPDATE_PROJECT_MUTATION, {
    refetchQueries: [
      { query: ALL_PROJECTS_QUERY },
      { query: MY_PROJECTS_QUERY },
      { query: PROJECT_QUERY, variables: { input: { id: pid } } },
    ],
    onCompleted(data) {
      setLoading(false);
      if (data.updateProject && data.updateProject._id) {
        setSuccess('Project updated successfully!');
        router.back();
      }
    },
    onError(error) {
      setLoading(false);
      setError(error.message);
    },
  });
  const [deleteProject] = useMutation(DELETE_PROJECT_MUTATION, {
    refetchQueries: [
      { query: ALL_PROJECTS_QUERY },
      { query: MY_PROJECTS_QUERY },
    ],
    onCompleted(data) {
      setLoading(false);
      if (data.deleteProject) {
        setSuccess('Project updated successfully!');
        router.back();
      }
    },
    onError(error) {
      setLoading(false);
      setError(error.message);
    },
  });

  const updateProjectHandler = () => {
    setLoading(true);
    updateProject({
      variables: {
        input: {
          ...project,
          id: pid,
        },
      },
    });
  };

  const deleteProjectHandler = () => {
    setLoading(true);
    deleteProject({
      variables: {
        input: { id: pid },
      },
    });
  };

  const updateProjectState = <T extends keyof BaseProject>(
    key: T,
    val: BaseProject[T],
  ) => {
    setProject({ ...project, [key]: val });
  };

  return (
    <Page pageTitle="Update Project">
      {fetchLoader ? (
        <Loader />
      ) : (
        <section>
          <ProjectForm
            titleText="Update project."
            project={project}
            updateProject={updateProjectState}
            saveProject={updateProjectHandler}
            buttonText="Update"
          />
          <button
            className="submit-button text-black bg-red-400"
            type="button"
            onClick={deleteProjectHandler}
          >
            Delete
          </button>
        </section>
      )}
    </Page>
  );
}
