import { Logger } from '@rnweb-template/common';
import { LinkingOptions } from '@react-navigation/native';
import { Linking } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import queryString from 'query-string';
import WebViewActor, { WebViewCommand } from './WebViewActor';

const appScheme = 'sample://';
const actionScheme = 'sample-action://';

type RootStackParamList = {
  HomeScreen: undefined;
  SampleScreen: undefined;
  NotFound: undefined;
  WebViewScreen: {
    url?: string;
    title?: string;
  };
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [appScheme, actionScheme],
  config: {
    screens: {
      HomeScreen: '/home',
      WebViewScreen: '/webview/:url?/:title?',
      SampleScreen: '/sample',
      NotFound: '*',
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    Logger.log('>>>> INITIAL URL : ' + url);

    return url;
  },
  subscribe(listener) {
    const handler = ({ url }: { url: string }) => {
      Logger.log('>>>> SUBSCRIBE URL : ' + url);

      if (url.startsWith(appScheme)) {
        return listener(url);
      }

      if (url.startsWith(actionScheme)) {
        const { url: _url, query } = queryString.parseUrl(url);

        const command = _url.split(actionScheme)[1] as WebViewCommand;

        return WebViewActor.emit({
          command,
          data: query,
        });
      }
    };

    const linkingSubscription = Linking.addEventListener('url', handler);

    return () => {
      linkingSubscription.remove();
    };
  },
};

export default linking;
