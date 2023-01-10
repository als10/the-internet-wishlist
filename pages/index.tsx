import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { AddIcon, SearchIcon } from '../src/components/base/Icon';
import { ProjectCard as ProjectCardType } from '../types';
import NavBar from '../src/components/base/NavBar';
import Page from '../src/components/base/Page';
import useAuth from '../src/hooks/AuthContext';
import { ALL_PROJECTS_QUERY } from '../src/utils/queries';
import { useQuery } from '@apollo/client';
import ProjectTypeFilter, {
  ProjectType,
} from '../src/components/filters/ProjectTypeFilter';
import TagFilter from '../src/components/filters/TagFilter';
import ProjectCards from '../src/components/projectcards';
import StarredProjectCards from '../src/components/projectcards/StarredProjectCards';
import MyProjectCards from '../src/components/projectcards/MyProjectCards';
import TextInputField from '../src/components/base/input/TextInputField';

function filterProjects(
  projects: ProjectCardType[],
  searchQuery: string,
  selectedTags: Set<string>,
): ProjectCardType[] {
  return projects
    .filter(
      (p) =>
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase().trim()),
    )
    .filter(
      (p) => selectedTags.size === 0 || p.tags.find((t) => selectedTags.has(t)),
    );
}

export default function App() {
  const { user } = useAuth();

  const [projectType, setProjectType] = useState(ProjectType.ALL_PROJECTS);
  const [selectedTags, setSelectedTags] = useState(new Set<string>());
  const [searchQuery, setSearchQuery] = useState('');

  const allProjects = useQuery(ALL_PROJECTS_QUERY, { pollInterval: 60000 });

  const projects: ProjectCardType[] = allProjects.data?.projects ?? [];

  const allTags: Record<string, boolean> = useMemo(() => {
    const tags: Record<string, boolean> = {};
    projects.forEach((project) => {
      project.tags.forEach((tag) => {
        tags[tag] = true;
      });
    });
    return tags;
  }, [projects]);

  const filteredProjects = (p: ProjectCardType[]) =>
    filterProjects(p, searchQuery, selectedTags);

  return (
    <Page pageTitle="The Internet Wishlist">
      <NavBar />
      <main className="min-h-screen py-8 flex flex-col space-y-8 bg-slate-100">
        <div className="px-4 md:px-8 flex space-x-4">
          <Link className="primary-button" href="/create">
            <div className="flex space-x-2 items-center">
              <AddIcon className="w-4 h-4 fill-none stroke-black" />
              <span className="hidden md:block">Add Project</span>
            </div>
          </Link>
          <TextInputField
            className="flex-1"
            icon={(className) => (
              <SearchIcon className={`icon-input ${className || ''}`} />
            )}
            placeholder="Search for projects"
            value={searchQuery}
            onValueChange={(value) => setSearchQuery(value)}
          />
        </div>
        <div className="flex flex-col space-y-4">
          {user && (
            <ProjectTypeFilter
              projectType={projectType}
              setProjectType={(t: ProjectType) => setProjectType(t)}
            />
          )}
          <TagFilter
            allTags={Object.keys(allTags)}
            selectedTags={selectedTags}
            setSelectedTags={(t: Set<string>) => setSelectedTags(t)}
          />
        </div>
        {projectType === ProjectType.ALL_PROJECTS && (
          <ProjectCards
            projects={projects}
            filterProjects={filteredProjects}
            loading={allProjects.loading}
            error={allProjects.error}
          />
        )}
        {projectType === ProjectType.STARRED_PROJECTS && (
          <StarredProjectCards filterProjects={filteredProjects} />
        )}
        {projectType === ProjectType.MY_PROJECTS && (
          <MyProjectCards filterProjects={filteredProjects} />
        )}
      </main>
    </Page>
  );
}
