import { SubmissionDetails } from '../../../../types';
import { useState } from 'react';
import {
  ADD_SUBMISSION_MUTATION,
  PROJECT_QUERY,
  REMOVE_SUBMISSION_MUTATION,
} from '../../../utils/queries';
import { ApolloCache, useMutation } from '@apollo/client';
import useAuth from '../../../hooks/AuthContext';
import useNotification from '../../../hooks/NotificationContext';
import SubmissionInput from './SubmissionInput';
import Submission from './Submission';

interface SubmissionsProps {
  submissions: SubmissionDetails[];
  projectId: string;
}

export default function Submissions({
  submissions,
  projectId,
}: SubmissionsProps) {
  const { user } = useAuth();
  const { setSuccess, setError } = useNotification();

  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState('');

  const updateProjectCache = (
    cache: ApolloCache<any>,
    submissions: SubmissionDetails[],
  ) => {
    const project = cache.readQuery({
      query: PROJECT_QUERY,
      variables: { input: { id: projectId } },
    }) as Record<string, any>;
    cache.writeQuery({
      query: PROJECT_QUERY,
      variables: { input: { id: projectId } },
      data: {
        project: {
          ...project,
          submissions,
        },
      },
    });
  };

  const [addSubmission] = useMutation(ADD_SUBMISSION_MUTATION, {
    update(cache, { data: { addSubmissionToProject } }) {
      setLoading(false);
      if (addSubmissionToProject) {
        updateProjectCache(cache, addSubmissionToProject);
        setSuccess('Submission added successfully!');
      }
    },
    onError(error) {
      setLoading(false);
      setError(error.message);
    },
  });

  const [removeSubmission] = useMutation(REMOVE_SUBMISSION_MUTATION, {
    update(cache, { data: { removeSubmissionFromProject } }) {
      setLoading(false);
      if (removeSubmissionFromProject) {
        updateProjectCache(cache, removeSubmissionFromProject);
        setSuccess('Submission removed successfully!');
      }
    },
    onError(error) {
      setLoading(false);
      setError(error.message);
    },
  });

  const addSubmissionHandler = () => {
    if (user) {
      setLoading(true);
      addSubmission({
        variables: {
          input: {
            id: projectId,
            link,
          },
        },
      });
    }
  };

  const removeSubmissionHandler = () => {
    if (user) {
      setLoading(true);
      removeSubmission({
        variables: {
          input: {
            id: projectId,
          },
        },
      });
    }
  };

  const canSubmitLink =
    !!user && !submissions.find((s) => s.creator._id === user._id);

  return (
    <div className="flex flex-col space-y-4">
      {submissions.map((submission) => (
        <Submission
          submission={submission}
          loading={loading}
          removeSubmissionHandler={removeSubmissionHandler}
        />
      ))}
      {canSubmitLink && (
        <SubmissionInput
          link={link}
          setLink={(v) => setLink(v)}
          submitHandler={addSubmissionHandler}
          loading={loading}
        />
      )}
    </div>
  );
}
