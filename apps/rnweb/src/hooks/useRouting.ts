import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (data: string) => void;
    };
  }
}

Link.defaultProps = {
  prefetch: false,
};

const useRouting = () => {
  const router = useRouter();

  useEffect(() => {
    const onRouteChangeStart = (url: string) => {
      if (window.ReactNativeWebView) {
        router.events.emit('routeChangeError');

        const [href, hash] = url.split('#');
        const title = hash ?? '';

        window.location.href = `sample://webview?url=${encodeURIComponent(
          window.location.origin + href
        )}&title=${title}`;

        throw '무시해도 되는 에러';
      }
    };

    router.events.on('routeChangeStart', onRouteChangeStart);

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
    };
  }, [router]);
};

export default useRouting;
