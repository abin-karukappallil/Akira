import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen'; 
import login_screen from './login_screen/login_screen';
import SignUpScreen from './login_screen/signup_screen';
import Dashboard from './dashboard/dash';
import Cart from './cart/cart';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={login_screen} /> 
        <Stack.Screen name="Signup"component={SignUpScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name='Cart' component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;