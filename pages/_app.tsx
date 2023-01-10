import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Exo_2 } from '@next/font/google';
import { ApolloProvider } from '@apollo/client';
import client from '../src/utils/apollo.client';
import { AuthProvider } from '../src/hooks/AuthContext';
import { NotificationProvider } from '../src/hooks/NotificationContext';
import { LoadingProvider } from '../src/hooks/LoadingContext';

const exo = Exo_2({
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={exo.className}>
      <ApolloProvider client={client}>
        <LoadingProvider>
          <AuthProvider>
            <NotificationProvider>
              <Component {...pageProps} />
            </NotificationProvider>
          </AuthProvider>
        </LoadingProvider>
      </ApolloProvider>
    </main>
  );
}
