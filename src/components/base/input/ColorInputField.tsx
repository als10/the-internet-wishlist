import { InputFieldProps, InputLayout } from '.';
import { ALL_COLORS } from '../../../../types';
import { colorToHex } from '../../../utils';
import { TickIcon } from '../Icon';

type ColorInputFieldProps = Omit<InputFieldProps<string>, 'inputType'>;

function ColorInput({
  value,
  onValueChange,
}: Omit<ColorInputFieldProps, 'label'>) {
  return (
    <div className="flex space-x-4">
      {ALL_COLORS.map((c) => {
        const hexColor = colorToHex(c);

        return (
          <button
            key={c}
            type="button"
            className="w-8 h-8 rounded-full flex items-center"
            onClick={() => {
              onValueChange(hexColor);
            }}
            style={{ backgroundColor: hexColor }}
          >
            {value === hexColor && <TickIcon className="icon-xs m-auto" />}
          </button>
        );
      })}
    </div>
  );
}

export default function ColorInputField({
  className = '',
  value,
  onValueChange,
  label,
  placeholder,
}: ColorInputFieldProps) {
  return (
    <InputLayout className={className} label={label}>
      <ColorInput
        value={value}
        onValueChange={onValueChange}
        placeholder={placeholder}
      />
    </InputLayout>
  );
}
