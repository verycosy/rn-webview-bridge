import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useCallback } from 'react';
import { useLayoutEffect } from 'react';
import WebView from 'react-native-webview';
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

  return (
    <WebView
      source={{
        uri: url,
      }}
    />
  );
};

export default WebViewScreen;
