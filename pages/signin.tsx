import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Page from '../src/components/base/Page';
import LoginForm, { LoginDetails } from '../src/components/forms/LoginForm';
import useLoader from '../src/hooks/LoadingContext';
import useNotification from '../src/hooks/NotificationContext';
import { LOGIN_MUTATION, ME_QUERY } from '../src/utils/queries';

export default function Signin() {
  const router = useRouter();
  const { setLoading } = useLoader();
  const { setSuccess, setError } = useNotification();

  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    username: '',
    password: '',
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    update(cache, { data: { login } }) {
      setLoading(false);
      if (login && login._id) {
        cache.writeQuery({
          query: ME_QUERY,
          data: { me: login },
        });
        setSuccess('Logged in successfully!');
        router.back();
      }
    },
    onError(error) {
      setLoading(false);
      setError(error.message);
    },
  });

  const loginHandler = () => {
    setLoading(true);
    login({
      variables: {
        input: {
          username: loginDetails.username,
          password: loginDetails.password,
        },
      },
    });
  };

  const updateLoginDetails = <T extends keyof LoginDetails>(
    key: T,
    val: LoginDetails[T],
  ) => {
    setLoginDetails({ ...loginDetails, [key]: val });
  };

  return (
    <Page pageTitle="Log in">
      <section>
        <LoginForm
          loginDetails={loginDetails}
          updateLoginDetails={updateLoginDetails}
          login={loginHandler}
        />
        <span className="text-center">
          Don&apos;t already have an account?{' '}
          <Link className="link" href="/signup" replace>
            Create one!
          </Link>
        </span>
      </section>
    </Page>
  );
}
