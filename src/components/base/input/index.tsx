import { PropsWithChildren } from 'react';

interface InputLayoutProps {
  className?: string;
  label?: string;
}

export function InputLayout({
  className = '',
  label,
  children,
}: PropsWithChildren<InputLayoutProps>) {
  return (
    <div className={`flex flex-col space-y-4 ${className}`}>
      {label && <label>{label}</label>}
      {children}
    </div>
  );
}

export interface InputFieldProps<T>
  extends Omit<InputLayoutProps, 'inputComponent'> {
  value: T;
  onValueChange(value: T): void;
  placeholder?: string;
  icon?(className?: string): JSX.Element;
  inputType?: 'text' | 'number' | 'email' | 'password';
}
