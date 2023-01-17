import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useCallback, useRef } from 'react';
import { useLayoutEffect } from 'react';
import WebView, { WebViewProps } from 'react-native-webview';
import WebViewActor, { WebViewAction } from './WebViewActor';
import { RootStackScreenProps } from './linking';
import { Share } from 'react-native';

const useWebViewActor = () => {
  const navigation = useNavigation();

  const actorListener = useCallback(() => {
    const handler = (action: WebViewAction) => {
      switch (action.command) {
        case 'setHeader': {
          navigation.setOptions({
            headerTitle: action.data.title,
          });

          break;
        }

        case 'close': {
          navigation.goBack();
          break;
        }

        case 'share': {
          const { url, title, message } = action.data;

          Share.share({
            url,
            title,
            message,
          });

          break;
        }

        case 'refresh': {
          // TODO:
          break;
        }
      }
    };

    WebViewActor.addListener(handler);

    return () => {
      WebViewActor.removeListener(handler);
    };
  }, [navigation]);

  useFocusEffect(actorListener);
};

const WebViewScreen: React.FC = () => {
  useWebViewActor();

  const ref = useRef<WebView>(null);
  const navigation = useNavigation();
  const {
    params: { url, title } = {
      url: 'http://localhost:4200',
      title: '호호홈',
    },
  } = useRoute<RootStackScreenProps<'WebViewScreen'>['route']>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, [navigation, title]);

  const onMessage: WebViewProps['onMessage'] = ({ nativeEvent: { data } }) => {
    const { callbackName, params } = JSON.parse(data);

    const [, key] = callbackName.split('-');

    let callbackData: unknown;
    let errorMessage: string;

    switch (key) {
      case 'statusBarHeight': {
        callbackData = 30;
        break;
      }

      case 'throwError': {
        callbackData = null;
        errorMessage = '에러 발생함';
        break;
      }
    }

    const script = `
    window.executeCallback(
      '${callbackName}', 
      ${JSON.stringify(callbackData)}, 
      '${errorMessage}'
    );`;

    ref.current.injectJavaScript(script);
  };

  return (
    <WebView
      source={{
        uri: url,
      }}
      ref={ref}
      onMessage={onMessage}
    />
  );
};

export default WebViewScreen;
