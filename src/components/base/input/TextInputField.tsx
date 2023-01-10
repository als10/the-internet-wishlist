import { InputFieldProps, InputLayout } from '.';

export default function TextInputField({
  className = '',
  inputType = 'text',
  value,
  onValueChange,
  label,
  icon,
  placeholder,
}: InputFieldProps<string>) {
  return (
    <InputLayout className={className} label={label}>
      <div className="relative">
        {icon && icon()}
        <input
          className={icon ? 'pl-12' : 'pl-4'}
          value={value || ''}
          onChange={({ target }) => onValueChange(target.value)}
          placeholder={placeholder}
          type={inputType}
        />
      </div>
    </InputLayout>
  );
}
