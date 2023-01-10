import { PropsWithChildren } from 'react';
import { TickIcon } from './Icon';

interface TagButtonProps {
  selected: boolean;
  setSelected: (selected: boolean) => void;
}

export default function TagButton({
  selected,
  setSelected,
  children,
}: PropsWithChildren<TagButtonProps>) {
  return (
    <button
      className={selected ? 'tag-selected' : 'tag'}
      type="button"
      onClick={() => setSelected(!selected)}
    >
      <div className="flex space-x-2 items-center">
        {selected && <TickIcon className="icon-xs stroke-white" />}
        <span>{children}</span>
      </div>
    </button>
  );
}
