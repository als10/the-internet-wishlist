/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useAuth from '../src/hooks/AuthContext';
import Page from '../src/components/base/Page';
import AccountForm, { BaseUser } from '../src/components/forms/AccountForm';
import { ME_QUERY, UPDATE_USER_MUTATION } from '../src/utils/queries';
import useLoader from '../src/hooks/LoadingContext';
import useNotification from '../src/hooks/NotificationContext';

type UpdatedUser = Omit<BaseUser, 'password'>;

export default function Profile() {
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const { setLoading } = useLoader();
  const { setSuccess, setError } = useNotification();

  const [user, setUser] = useState<UpdatedUser>(
    {
      username: currentUser!.username,
      email: currentUser!.email,
      avatar: currentUser!.avatar,
    }!,
  );

  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    update(cache, { data: { updateUser } }) {
      setLoading(false);
      if (updateUser && updateUser._id) {
        cache.writeQuery({
          query: ME_QUERY,
          data: { me: updateUser },
        });
        setSuccess('Updated user details successfully!');
        router.back();
      }
    },
    onError(error) {
      setLoading(false);
      setError(error.message);
    },
  });

  const saveUserHandler = async () => {
    setLoading(true);
    updateUser({
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
    <Page pageTitle="Profile">
      <section>
        <AccountForm
          titleText="Your Profile."
          userState={user}
          updateUserState={updateUserState}
          saveUser={saveUserHandler}
          buttonText="Update profile"
        />
      </section>
    </Page>
  );
}
