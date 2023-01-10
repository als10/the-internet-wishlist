import { Project } from '../../../types';
import ColorInputField from '../base/input/ColorInputField';
import MultilineTextInputField from '../base/input/MultilineInputField';
import TagInputField from '../base/input/TagInputField';
import TextInputField from '../base/input/TextInputField';

export type BaseProject = Pick<
  Project,
  'title' | 'description' | 'tags' | 'backgroundColor'
>;

interface ProjectFormProps {
  titleText: string;
  project: BaseProject;
  updateProject<T extends keyof BaseProject>(key: T, val: BaseProject[T]): void;
  saveProject(): void;
  buttonText: string;
}

export default function ProjectForm({
  titleText,
  project,
  updateProject,
  saveProject,
  buttonText,
}: ProjectFormProps) {
  return (
    <form
      className="flex flex-col space-y-16"
      onSubmit={(event) => {
        event.preventDefault();
        saveProject();
      }}
    >
      <h2 className="my-8">{titleText}</h2>
      <div className="mb-16 flex flex-col space-y-8">
        <TextInputField
          label="Title"
          value={project.title}
          onValueChange={(v) => updateProject('title', v)}
        />
        <MultilineTextInputField
          label="Description"
          value={project.description}
          onValueChange={(v) => updateProject('description', v)}
          lines={10}
        />
        <TagInputField
          label="Tags"
          value={project.tags}
          onValueChange={(v) => updateProject('tags', v)}
        />
        <ColorInputField
          label="Background Color"
          value={project.backgroundColor}
          onValueChange={(v) => updateProject('backgroundColor', v)}
        />
      </div>
      <div className="mb-16 flex flex-col space-y-8">
        <button className="submit-button" type="submit">
          {buttonText}
        </button>
      </div>
    </form>
  );
}
