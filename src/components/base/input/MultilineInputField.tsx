import { InputFieldProps, InputLayout } from '.';

interface MultilineInputFieldProps extends InputFieldProps<string> {
  lines: number;
}

export default function MultilineTextInputField({
  className = '',
  value,
  onValueChange,
  lines,
  label,
  icon,
  placeholder,
}: MultilineInputFieldProps) {
  return (
    <InputLayout className={className} label={label}>
      <div className="relative">
        {icon && icon()}
        <textarea
          className={icon ? 'pl-12' : 'pl-4'}
          value={value || ''}
          onChange={({ target }) => onValueChange(target.value)}
          placeholder={placeholder}
          rows={lines}
        />
      </div>
    </InputLayout>
  );
}
