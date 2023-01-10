import colors from 'tailwindcss/colors';
import { CrossIcon } from './Icon';

export enum AlertType {
  INFO,
  WARNING,
  ERROR,
  SUCCESS,
}

interface AlertProps {
  title?: string;
  message: string;
  type?: AlertType;
  dismiss(): void;
}

export default function Alert({
  title,
  message,
  type = AlertType.INFO,
  dismiss,
}: AlertProps) {
  const color = {
    [AlertType.ERROR]: colors.red,
    [AlertType.WARNING]: colors.orange,
    [AlertType.SUCCESS]: colors.emerald,
    [AlertType.INFO]: colors.slate,
  }[type];

  return (
    <div
      className="md:w-1/2 lg:w-1/3 z-10 absolute right-0 m-2 p-2 md:m-4 md:p-4 border-2"
      style={{
        backgroundColor: color[100],
        borderColor: color[500],
        color: color[700],
      }}
      role="alert"
    >
      <div className="flex space-x-2 justify-between">
        <div className="flex flex-col space-y-2">
          {title && <p className="font-bold">{title}</p>}
          <p>{message}</p>
        </div>
        <button type="button" onClick={dismiss}>
          <CrossIcon className="icon-xs stroke-current" />
        </button>
      </div>
    </div>
  );
}
