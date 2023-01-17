import { AppProps } from 'next/app';
import Head from 'next/head';
import useBridge from '../hooks/useBridge';
import useRouting from '../hooks/useRouting';
import './styles.css';

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (data: string) => void;
    };

    executeCallback: (
      callbackName: string,
      callbackData: Record<string, unknown> | null,
      errorMessage?: string
    ) => void;
  }
}

function CustomApp({ Component, pageProps }: AppProps) {
  useRouting();
  useBridge();

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
