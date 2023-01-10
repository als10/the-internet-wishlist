import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Tag from '../../src/components/base/Tag';
import Title from '../../src/components/projectdetails/Title';
import Submissions from '../../src/components/projectdetails/submissions';
import Page from '../../src/components/base/Page';
import ClientOnly from '../../src/components/ClientOnly';
import { useQuery } from '@apollo/client';
import { ProjectDetails as ProjectDetailsType } from '../../types';
import { PROJECT_QUERY } from '../../src/utils/queries';
import StarButton from '../../src/components/projectdetails/StarButton';
import useNotification from '../../src/hooks/NotificationContext';
import Loader from '../../src/components/base/Loader';

dayjs.extend(relativeTime);

export default function ProjectDetails() {
  const router = useRouter();
  const { pid } = router.query;

  const { setError } = useNotification();

  const { data } = useQuery(PROJECT_QUERY, {
    variables: {
      input: { id: pid },
    },
    onError(error) {
      setError(error.message);
    },
  });

  if (!data) {
    return (
      <Page pageTitle="Project">
        <Loader />
      </Page>
    );
  }

  const project: ProjectDetailsType = data.project;

  return (
    <ClientOnly>
      <Page pageTitle={project.title} bgColor={project.backgroundColor}>
        <section className="flex flex-col space-y-16">
          <Title
            title={project.title}
            avatarOptions={JSON.parse(project.creator.avatar)}
            username={project.creator.username}
            timeString={dayjs(project.updatedAt).fromNow()}
          />
          <div className="flex flex-col space-y-8">
            <div>{project.description}</div>
            <div className="flex flex-wrap space-x-2">
              {project.tags.map((t, i) => (
                <Tag key={i}>{t}</Tag>
              ))}
            </div>
            <StarButton
              shortened={false}
              starredBy={project.starredBy}
              projectId={project._id}
            />
          </div>
          <Submissions
            submissions={project.submissions}
            projectId={project._id}
          />
        </section>
      </Page>
    </ClientOnly>
  );
}
