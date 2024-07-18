import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { AppProvider } from './AppContext';


import HomeScreen from './screen/HomeScreen';
import ProfileScreen from './screen/ProfileScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EditScreen from './screen/EditScreen';
import UpdateScreen from './screen/UpdateScreen';
import LoginScreen from './screen/LoginScreen';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function EditTabStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Edit" component={EditScreen} />
      <Stack.Screen name="Update" component={UpdateScreen} />
    </Stack.Navigator>
  );
}

function AllTab(){
  return(
    <Tab.Navigator>
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Profile" component={EditTabStack} />
      </Tab.Navigator>
  )
}

const App = () => {
  return (
    <>
    <AppProvider>
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* <Stack.Screen name="AllTab" component={AllTab} /> */}
      
      </Stack.Navigator>
    </NavigationContainer>
    </AppProvider>
    <Toast />

    </>
    
  );
};

export default App;