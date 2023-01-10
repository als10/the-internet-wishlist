import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';
import Loader from '../components/base/Loader';

interface LoadingContextType {
  setLoading(loading: boolean): void;
}

const LoadingContext = createContext<LoadingContextType>(
  {} as LoadingContextType,
);

export function LoadingProvider({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(false);

  const loadingContext: LoadingContextType = useMemo(
    () => ({ setLoading: (l) => setLoading(l) }),
    [],
  );

  return (
    <LoadingContext.Provider value={loadingContext}>
      <div className={loading ? 'pointer-events-none' : ''}>
        {loading && <Loader tintedBackground />}
        {children}
      </div>
    </LoadingContext.Provider>
  );
}

export default function useLoader() {
  return useContext(LoadingContext);
}
