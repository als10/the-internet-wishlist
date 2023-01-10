import { useState } from 'react';
import { InputFieldProps, InputLayout } from '.';
import { CrossIcon } from '../Icon';

interface TagProps {
  tag: string;
  onClick(): void;
}

function Tag({ tag, onClick }: TagProps) {
  return (
    <div className="tag" onClick={onClick}>
      <div className="flex space-x-2">
        <div>{tag}</div>
        <button type="button">
          <CrossIcon className="icon-xs" />
        </button>
      </div>
    </div>
  );
}

function TagInput({
  className,
  inputType = 'text',
  value,
  onValueChange,
  placeholder,
}: Omit<InputFieldProps<string[]>, 'label'>) {
  const [currentValue, setCurrentValue] = useState('');

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4">
        <input
          className={className}
          value={currentValue}
          onChange={({ target }) => setCurrentValue(target.value)}
          placeholder={placeholder}
          type={inputType}
        />
        <button
          className="submit-button-s"
          type="button"
          onClick={() => {
            onValueChange([...value, currentValue]);
            setCurrentValue('');
          }}
        >
          Add
        </button>
      </div>
      <div className="flex space-x-2">
        {value.map((tag, i) => (
          <Tag
            key={i}
            tag={tag}
            onClick={() => onValueChange(value.filter((v) => v !== tag))}
          />
        ))}
      </div>
    </div>
  );
}

export default function TagInputField({
  className = '',
  value,
  onValueChange,
  label,
  icon,
  placeholder,
  inputType,
}: InputFieldProps<string[]>) {
  return (
    <InputLayout className={className} label={label}>
      <div className="relative">
        {icon && icon()}
        <TagInput
          className={icon ? 'pl-12' : 'pl-4'}
          value={value}
          onValueChange={onValueChange}
          placeholder={placeholder}
          inputType={inputType}
        />
      </div>
    </InputLayout>
  );
}
