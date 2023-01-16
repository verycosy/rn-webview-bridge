import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WebView from 'react-native-webview';

const Stack = createStackNavigator();

const WebViewScreen: React.FC = () => {
  return (
    <WebView
      source={{
        uri: 'https://google.com',
      }}
    />
  );
};

export const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
