// LoginScreen.jsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { useAppContext } from '../AppContext';
import validator from 'validator';
import config from '../config';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useAppContext();

  async function onLogin() {
    try {
      if (!validator.isEmail(email)) {
        Toast.show({
          type: 'error',
          text1: 'Please fill valid email.',
        });
      } else if (password.length <= 8) {
        Toast.show({
          type: 'error',
          text1: 'Please fill valid password.',
        });
      } else {
        const url = config.BASE_URL + "api/login";
        let response = await fetch(url, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        });
        response = await response.json();
        if (response.token) {
          setToken(response.token);
          Toast.show({
            type: 'success',
            text1: "Successfully Logged In."
          });
        } else {
          Toast.show({
            type: 'error',
            text1: response.message
          });
        }
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: error.message
      });
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        autoCapitalize="none"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    padding: 10,
    backgroundColor: 'lightgreen',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
  }
});

export default LoginScreen;
