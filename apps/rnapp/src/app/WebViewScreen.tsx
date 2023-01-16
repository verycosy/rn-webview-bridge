import { useNavigation, useRoute } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import WebView from 'react-native-webview';
import { RootStackScreenProps } from './linking';

const WebViewScreen: React.FC = () => {
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
