import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WebViewScreen from './WebViewScreen';
import linking from './linking';
import HomeScreen from './HomeScreen';
import NotFoundScreen from './NotFoundScreen';
import SampleScreen from './SampleScreen';

const Stack = createStackNavigator();

export const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer linking={linking}>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen
            name="WebViewScreen"
            component={WebViewScreen}
            getId={({ params }) => params?.['url']}
          />
          <Stack.Screen name="SampleScreen" component={SampleScreen} />
          <Stack.Screen name="NotFound" component={NotFoundScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
