import { useQuery } from '@apollo/client';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ME_QUERY } from '../utils/queries';
import { User } from '../../types';

interface AuthContextType {
  user?: User;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loadingInitial, setLoadingInitial] = useState(true);

  const meQuery = useQuery(ME_QUERY);

  useEffect(() => {
    const { data, loading } = meQuery;
    if (!loading) {
      if (data.me) {
        setUser({
          _id: data.me._id,
          username: data.me.username,
          email: data.me.email,
          avatar: data.me.avatar,
          password: '',
        } as User);
      } else {
        setUser(undefined);
      }
      setLoadingInitial(false);
    }
  }, [meQuery]);

  const authContext: AuthContextType = useMemo(() => ({ user }), [user]);

  return (
    <AuthContext.Provider value={authContext}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
