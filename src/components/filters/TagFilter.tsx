import TagButton from '../base/TagButton';

interface TagFilterProps {
  allTags: string[];
  selectedTags: Set<string>;
  setSelectedTags(t: Set<string>): void;
}

export default function TagFilter({
  allTags,
  selectedTags,
  setSelectedTags,
}: TagFilterProps) {
  return (
    <div className="px-4 md:px-8 flex flex-nowrap items-center space-x-4 overflow-x-scroll">
      <div className="whitespace-nowrap">Filter by tags:</div>
      <TagButton
        selected={selectedTags.size === 0}
        setSelected={() => {
          setSelectedTags(new Set());
        }}
      >
        All
      </TagButton>
      {allTags.map((tag, i) => {
        const hasTag = selectedTags.has(tag);

        return (
          <TagButton
            key={i}
            selected={hasTag}
            setSelected={() => {
              const copy = new Set(selectedTags);
              if (hasTag) {
                copy.delete(tag);
              } else {
                copy.add(tag);
              }
              setSelectedTags(copy);
            }}
          >
            {tag}
          </TagButton>
        );
      })}
    </div>
  );
}
