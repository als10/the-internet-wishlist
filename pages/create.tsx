import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Page from '../src/components/base/Page';
import ProjectForm, { BaseProject } from '../src/components/forms/ProjectForm';
import {
  ALL_PROJECTS_QUERY,
  CREATE_PROJECT_MUTATION,
  MY_PROJECTS_QUERY,
} from '../src/utils/queries';
import useLoader from '../src/hooks/LoadingContext';
import useNotification from '../src/hooks/NotificationContext';
import { newProject } from '../src/utils';

export default function CreateProject() {
  const router = useRouter();
  const { setLoading } = useLoader();
  const { setSuccess, setError } = useNotification();

  const [project, setProject] = useState<BaseProject>(newProject());

  const [createProject] = useMutation(CREATE_PROJECT_MUTATION, {
    refetchQueries: [
      { query: ALL_PROJECTS_QUERY },
      { query: MY_PROJECTS_QUERY },
    ],
    onCompleted(data) {
      setLoading(false);
      if (data.createProject && data.createProject._id) {
        setSuccess('Project created successfully!');
        router.back();
      }
    },
    onError(error) {
      setLoading(false);
      setError(error.message);
    },
  });

  const updateProjectState = <T extends keyof BaseProject>(
    key: T,
    val: BaseProject[T],
  ) => {
    setProject({ ...project, [key]: val });
  };

  const createProjectHandler = () => {
    createProject({
      variables: {
        input: project,
      },
    });
  };

  return (
    <Page pageTitle="Create Project">
      <section>
        <ProjectForm
          titleText="Add a new project."
          project={project}
          updateProject={updateProjectState}
          saveProject={createProjectHandler}
          buttonText="Create"
        />
      </section>
    </Page>
  );
}
