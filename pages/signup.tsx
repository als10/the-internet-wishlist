import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import AccountForm, { BaseUser } from '../src/components/forms/AccountForm';
import Page from '../src/components/base/Page';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from '../src/utils/queries';
import useLoader from '../src/hooks/LoadingContext';
import useNotification from '../src/hooks/NotificationContext';
import { newUser } from '../src/utils';

export default function Signup() {
  const router = useRouter();
  const { setSuccess, setError } = useNotification();
  const { setLoading } = useLoader();

  const [user, setUser] = useState<BaseUser>(newUser());

  const [createUser] = useMutation(CREATE_USER_MUTATION, {
    onCompleted({ createUser }) {
      setLoading(false);
      if (createUser && createUser._id) {
        setSuccess('Account created successfully!');
        router.replace('/signin');
      }
    },
    onError(error) {
      setLoading(false);
      setError(error.message);
    },
  });

  const createAccountHandler = () => {
    setLoading(true);
    createUser({
      variables: {
        input: user,
      },
    });
  };

  const updateUserState = <T extends keyof BaseUser>(
    key: T,
    val: BaseUser[T],
  ) => {
    setUser({ ...user, [key]: val });
  };

  return (
    <Page pageTitle="Sign up">
      <section>
        <AccountForm
          titleText="Create an account to save your favorite ideas or add your own!"
          userState={user}
          updateUserState={updateUserState}
          saveUser={createAccountHandler}
          buttonText="Create account"
        />
        <span className="text-center">
          Already have an account?{' '}
          <Link className="link" href="/signin" replace>
            Sign in!
          </Link>
        </span>
      </section>
    </Page>
  );
}
