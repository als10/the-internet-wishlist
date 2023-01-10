import { User } from '../../../types';
import TextInputField from '../base/input/TextInputField';

export interface LoginDetails {
  username: User['username'];
  password: User['password'];
}

interface LoginFormProps {
  loginDetails: LoginDetails;
  updateLoginDetails<T extends keyof LoginDetails>(
    key: T,
    val: LoginDetails[T],
  ): void;
  login(): void;
}

export default function LoginForm({
  loginDetails,
  updateLoginDetails,
  login,
}: LoginFormProps) {
  return (
    <form
      className="flex flex-col space-y-16"
      onSubmit={(event) => {
        event.preventDefault();
        login();
      }}
    >
      <h2 className="mt-16 mb-32">Welcome back!</h2>
      <div className="mb-16 flex flex-col space-y-8">
        <TextInputField
          label="Username"
          value={loginDetails.username}
          onValueChange={(v) => updateLoginDetails('username', v)}
        />
        <TextInputField
          label="Password"
          value={loginDetails.password}
          onValueChange={(v) => updateLoginDetails('password', v)}
          inputType="password"
        />
      </div>
      <div className="mb-16 flex flex-col space-y-8">
        <button className="submit-button" type="submit">
          Sign in
        </button>
      </div>
    </form>
  );
}
