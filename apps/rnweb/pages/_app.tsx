import { AppProps } from 'next/app';
import Head from 'next/head';
import useRouting from '../hooks/useRouting';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  useRouting();

  return (
    <>
      <Head>
        <title>Welcome to rnweb!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
