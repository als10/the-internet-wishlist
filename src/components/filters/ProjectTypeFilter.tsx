import TagButton from '../base/TagButton';

export enum ProjectType {
  ALL_PROJECTS = 'All Projects',
  STARRED_PROJECTS = 'Starred Projects',
  MY_PROJECTS = 'My Projects',
}

interface ProjectTypeFilterProps {
  projectType: ProjectType;
  setProjectType(t: ProjectType): void;
}

export default function ProjectTypeFilter({
  projectType,
  setProjectType,
}: ProjectTypeFilterProps) {
  return (
    <div className="px-4 md:px-8 flex flex-nowrap items-center space-x-4 overflow-x-scroll">
      {Object.values(ProjectType).map((type, i) => (
        <TagButton
          key={i}
          selected={projectType === type}
          setSelected={(t) => {
            if (t) {
              setProjectType(type);
            }
          }}
        >
          {type}
        </TagButton>
      ))}
    </div>
  );
}
