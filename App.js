import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen'; 
import login_screen from './login_screen/login_screen';
import SignUpScreen from './login_screen/signup_screen';
import Dashboard from './dashboard/dash';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={login_screen} /> 
        <Stack.Screen name="Signup"component={SignUpScreen} />
        <Stack.Screen name="dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;