import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Sample"
            component={() => (
              <View>
                <Text>Good</Text>
              </View>
            )}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
