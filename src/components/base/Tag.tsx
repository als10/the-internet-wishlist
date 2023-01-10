import { PropsWithChildren } from 'react';

export default function Tag({ children }: PropsWithChildren) {
  return <div className="tag mt-2">{children}</div>;
}
