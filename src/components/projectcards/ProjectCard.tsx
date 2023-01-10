import Link from 'next/link';
import { ProjectCard as ProjectCardType } from '../../../types';
import { PencilIcon } from '../base/Icon';
import StarButton from '../projectdetails/StarButton';
import Tag from '../base/Tag';

interface ProjectProps {
  project: ProjectCardType;
  isMyProject: boolean;
}

export function ProjectCard({ project, isMyProject }: ProjectProps) {
  return (
    <div
      className="p-4 flex flex-col justify-between space-y-4 box md:shadow-on-hover"
      style={{ backgroundColor: project.backgroundColor }}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between">
          <h3>{project.title}</h3>
          {isMyProject && (
            <Link href={`/update/${project._id}`}>
              <PencilIcon className="icon-s fill-none highlight-on-hover" />
            </Link>
          )}
        </div>
        <div>{project.description.substring(0, 300)}...</div>
        <div className="flex flex-wrap space-x-2">
          {project.tags.map((t, i) => (
            <Tag key={i}>{t}</Tag>
          ))}
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <Link
            className="text-lg highlight-on-hover"
            href={`/project/${project._id}`}
          >
            Read More →
          </Link>
          <StarButton
            shortened
            starredBy={project.starredBy}
            projectId={project._id}
          />
        </div>
      </div>
    </div>
  );
}
