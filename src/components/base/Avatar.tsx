import { AvatarProps, BigHead } from '@bigheads/core';

interface CustomAvatarProps {
  options: AvatarProps;
  className: string;
}

export default function Avatar({ options, className }: CustomAvatarProps) {
  return (
    <div className={className}>
      <BigHead {...options} />
    </div>
  );
}
