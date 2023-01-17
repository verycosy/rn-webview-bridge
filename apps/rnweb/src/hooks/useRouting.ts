import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AppSchemeUtil from '../utils/AppSchemeUtil';

Link.defaultProps = {
  prefetch: false,
};

const useRouting = () => {
  const router = useRouter();

  useEffect(() => {
    const onRouteChangeStart = (url: string) => {
      if (window.ReactNativeWebView) {
        router.events.emit('routeChangeError');

        AppSchemeUtil.goToWebView(url);

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
