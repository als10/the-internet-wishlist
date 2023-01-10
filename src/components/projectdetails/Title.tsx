import { AvatarProps } from '@bigheads/core';
import Avatar from '../base/Avatar';

interface TitleProps {
  title: string;
  avatarOptions: AvatarProps;
  username: string;
  timeString: string;
}

export default function Title({
  title,
  avatarOptions,
  username,
  timeString,
}: TitleProps) {
  return (
    <div className="flex flex-col space-y-4">
      <h2>{title}</h2>
      <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center">
        <div className="flex space-x-4 items-center">
          <Avatar className="avatar-s" options={avatarOptions} />
          <h4>{username}</h4>
        </div>
        <h4 className="italic">Last updated {timeString}</h4>
      </div>
    </div>
  );
}
