import { User } from '../../../types';
import Avatar from '../base/Avatar';
import { ArrowPathIcon } from '../base/Icon';
import { getRandomOptions } from '../../utils';
import TextInputField from '../base/input/TextInputField';

export interface BaseUser extends Omit<User, '_id' | 'password'> {
  password?: User['password'];
}

interface AccountFormProps {
  titleText: string;
  userState: BaseUser;
  updateUserState<T extends keyof BaseUser>(key: T, val: BaseUser[T]): void;
  saveUser(): void;
  buttonText: string;
}

export default function AccountForm({
  titleText,
  userState,
  updateUserState,
  saveUser,
  buttonText,
}: AccountFormProps) {
  return (
    <form
      className="flex flex-col space-y-16"
      onSubmit={(event) => {
        event.preventDefault();
        saveUser();
      }}
    >
      <div className="flex flex-col space-y-8">
        <h2>{titleText}</h2>
        <div className="flex items-start space-x-8 mx-auto">
          <Avatar className="avatar-l" options={JSON.parse(userState.avatar)} />
          <button
            className="primary-button p-2 bg-slate-100"
            type="button"
            onClick={() =>
              updateUserState('avatar', JSON.stringify(getRandomOptions()))
            }
          >
            <ArrowPathIcon className="icon-s fill-none" />
          </button>
        </div>
        <TextInputField
          label="Username"
          value={userState.username}
          onValueChange={(v) => updateUserState('username', v)}
        />
        <TextInputField
          label="Email"
          value={userState.email}
          onValueChange={(v) => updateUserState('email', v)}
          inputType="email"
        />
        {userState.password !== undefined && (
          <TextInputField
            label="Password"
            value={userState.password}
            onValueChange={(v) => updateUserState('password', v)}
            inputType="password"
          />
        )}
      </div>
      <button className="submit-button" type="submit">
        {buttonText}
      </button>
    </form>
  );
}
