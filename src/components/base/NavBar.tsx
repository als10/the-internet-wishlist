import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LOGOUT_MUTATION, ME_QUERY } from '../../utils/queries';
import { User } from '../../../types';
import useAuth from '../../hooks/AuthContext';
import Avatar from './Avatar';

interface LoggedInUserTileProps {
  currentUser: User;
  logout(): void;
}

function LoggedInUserTile({ currentUser, logout }: LoggedInUserTileProps) {
  const router = useRouter();

  const goToProfile = () => {
    router.push('/profile');
  };

  return (
    <div className="h-full flex flex-col border-black border-l-2">
      <button
        className="h-2/3 flex h-full items-center space-x-4 pl-2 pr-8"
        type="button"
        onClick={goToProfile}
      >
        <Avatar className="avatar-s" options={JSON.parse(currentUser.avatar)} />
        <div className="font-bold">{currentUser.username}</div>
      </button>
      <button
        className="h-1/3 submit-button-s border-b-0 border-x-0"
        type="button"
        onClick={logout}
      >
        Log out
      </button>
    </div>
  );
}

function NotLoggedInActions() {
  return (
    <div className="flex h-full text-md sm:text-xl">
      <Link
        className="submit-button bg-white text-black border-y-0 border-r-0"
        href="/signin"
      >
        Log in
      </Link>
      <Link className="submit-button border-y-0" href="/signup">
        Create account
      </Link>
    </div>
  );
}

export default function NavBar() {
  const { user } = useAuth();

  const [logout] = useMutation(LOGOUT_MUTATION, {
    update(cache, { data: { logout } }) {
      if (logout) {
        cache.writeQuery({
          query: ME_QUERY,
          data: { me: null },
        });
      }
    },
  });

  return (
    <nav className="h-24 pl-8 flex items-center bg-white border-y-2 border-black">
      <h2 className="hidden md:block">The Internet Wishlist</h2>
      <div className="flex-1" />
      {user ? (
        <LoggedInUserTile currentUser={user} logout={logout} />
      ) : (
        <NotLoggedInActions />
      )}
    </nav>
  );
}
