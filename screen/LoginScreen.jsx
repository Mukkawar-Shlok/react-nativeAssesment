import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

//for showing tost messages
import Toast from 'react-native-toast-message';

//loading context
import {useAppContext} from '../AppContext';

//validator for validating email field
import validator from 'validator';

//config for getting base url of api
import config from '../config';

//async storage for saving token in local storage after login
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(true);
  const [seeLoad, setSeeLoad] = useState(false);
  const {setToken} = useAppContext();

  async function onLogin() {
    setSeeLoad(true);
    try {
      if (!validator.isEmail(email)) {
        //validating email
        Toast.show({
          type: 'error',
          text1: 'Please fill valid email.',
        });

        setSeeLoad(false);
      } else if (password.length <= 8) {
        //validaing password
        Toast.show({
          type: 'error',
          text1: 'Please fill valid password.',
        });

        setSeeLoad(false);
      } else {
        //email and password are validated make a request to url
        const url = config.BASE_URL + 'api/login';
        
        //fetching token
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        //converting response into json
        response = await response.json();
        
        if (response.token) {
          //if token set token in local storage
          await AsyncStorage.setItem(
            'userToken',
            JSON.stringify(response.token),
          );
          //setting token in context so that we don't have to fetch from local storage every time
          setToken(response.token);
          
          //showing toaster
          Toast.show({
            type: 'success',
            text1: 'Successfully Logged In.',
          });
          
          setSeeLoad(false);
        
        } else {
        
          Toast.show({
            type: 'error',
            text1: response.message,
          });
        
          setSeeLoad(false);
        }
      }
    } catch (error) {
      console.log(error);
      
      Toast.show({
        type: 'error',
        text1: error.message,
      });
      
      setSeeLoad(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome back!</Text>
      <Text style={styles.startText}>let's start now</Text>
      <Image
        source={{
          uri: 'https://www.econceptual.com/wp-content/uploads/2023/11/E-conceptual-LOGO-1.png',
        }}
        style={styles.image}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your email"
          onChangeText={text => setEmail(text)}
          value={email}
          style={styles.input}
          keyboardType="email-address"
        />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter your password"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={seePassword}
            autoCapitalize="none"
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => setSeePassword(!seePassword)}
            style={styles.seePasswordButton}>
            <Text>{seePassword ? '👁️ Password' : '🙈 Password'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={onLogin}
        disabled={seeLoad}>
        <Text style={styles.loginButtonText}>
          {seeLoad ? 'Loading...' : 'Login'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.registerText}>
          Don’t have an account?{' '}
          <Text style={styles.registerNow}>Register Now</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff8c42',
  },
  startText: {
    fontSize: 18,
    color: '#ff8c42',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  passwordContainer: {
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
  },

  seePasswordButton: {
    padding: 10,
  },
  loginButton: {
    width: '90%',
    height: 50,
    backgroundColor: '#ff8c42',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  registerText: {
    color: '#333',
  },
  registerNow: {
    color: '#ff8c42',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
