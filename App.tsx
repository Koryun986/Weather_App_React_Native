import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import {
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  TRANSPARENT_COLOR_PRIMARY,
} from './src/utils/styles/color-constants';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={TRANSPARENT_COLOR_PRIMARY} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'Home'}
          screenOptions={{
            headerStyle: {
              backgroundColor: TRANSPARENT_COLOR_PRIMARY,
            },
            headerTitleStyle: {
              color: COLOR_SECONDARY,
            },
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
export default App;
