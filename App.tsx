import * as React from 'react';
import {useState,useEffect} from 'react';

//navigation imports
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//toast for showing toast mesages
import Toast from 'react-native-toast-message';

//context
import { useAppContext } from './AppContext';

//icon
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome,faUser } from '@fortawesome/free-solid-svg-icons'

//screens
import HomeScreen from './screen/HomeScreen';
import ProfileScreen from './screen/ProfileScreen';
import LoginScreen from './screen/LoginScreen';

//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { View } from 'react-native';


//creating bottom tabs
const Tab = createBottomTabNavigator();
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

//for creating stacks
const Stack = createNativeStackNavigator();
//We have two stacks
//1.which contains login page which can further contains pages that does not require auth like signup,privacy policy,terms and condition etc
//2.all the screens that require auth.

const App = () => {
  const { token,setToken } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  //Loading and checking if user is already logged in and have token saved inside localstorage
  useEffect(() => {
    const getToken = async () => {
      setIsLoading(true);
      try {
        //getting token from local storage
        const storedToken = await AsyncStorage.getItem('userToken');
        //if storedToken is not null
        if (storedToken !== null) {
          //parsing the token
          const parsedToken = JSON.parse(storedToken);
          //setting tokens value in context using localstorage
          setToken(parsedToken);
        }
      } catch (error) {
        console.error('Failed to get token from AsyncStorage:', error);
      }finally{
        setIsLoading(false);
      }
    };
    getToken();
  }, []);

  //loading stack based upon token
  return (
    <>
    {
      isLoading ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ):
      (
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
      )
    }
      
    </>
  
    );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default App;