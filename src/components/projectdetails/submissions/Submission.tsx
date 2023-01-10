import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { SubmissionDetails } from '../../../../types';
import Avatar from '../../base/Avatar';
import { TrashIcon } from '../../base/Icon';
import Loader from '../../base/Loader';
import useAuth from '../../../hooks/AuthContext';

dayjs.extend(relativeTime);

interface SubmissionLinkProps {
  className: string;
  link: string;
}

function SubmissionLink({ className, link }: SubmissionLinkProps) {
  return (
    <a className={`link ${className}`} href={link}>
      {link}
    </a>
  );
}

interface SubmissionProps {
  submission: SubmissionDetails;
  loading: boolean;
  removeSubmissionHandler(): void;
}

export default function Submission({
  submission,
  loading,
  removeSubmissionHandler,
}: SubmissionProps) {
  const { user } = useAuth();

  return (
    <div key={submission._id} className="flex space-x-2">
      <div className="w-full flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            <Avatar
              className="avatar-s"
              options={JSON.parse(submission.creator.avatar)}
            />
            <div className="font-bold">{submission.creator.username}</div>
            <SubmissionLink
              className="hidden md:block"
              link={submission.link}
            />
          </div>
          <div className="italic">{dayjs(submission.updatedAt).fromNow()}</div>
        </div>
        <SubmissionLink
          className="mt-2 block md:hidden"
          link={submission.link}
        />
      </div>
      {!!user &&
        submission.creator._id === user._id &&
        (loading ? (
          <Loader small />
        ) : (
          <button type="button" onClick={removeSubmissionHandler}>
            <TrashIcon className="icon-s fill-none highlight-on-hover" />
          </button>
        ))}
    </div>
  );
}
