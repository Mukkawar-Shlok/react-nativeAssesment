import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { AppProvider, useAppContext } from './AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome,faUser } from '@fortawesome/free-solid-svg-icons'
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

function AllTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="List"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesomeIcon icon={faHome} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesomeIcon icon={faUser} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


const App = () => {
  const { token } = useAppContext(); // Ensure this context is provided correctly

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {token ? (
            <Stack.Screen name="eConceptual" component={AllTab} />
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  
    );
};

export default App;