import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Toast from 'react-native-toast-message';
import { useAppContext } from '../AppContext';
import validator from 'validator';
export default function LoginScreen({navigation}) {
  const [email,setEmail]  = useState('');
  const [password,setPassword]  = useState('');
  const [load,setLoading] = useState('');
  const {user,setUser} = useAppContext();

  function onLogin(){
    try{
        if(!(validator.isEmail(email))){
            Toast.show({
                type: 'error',
                text1: 'Please fill valid email.'
              });
        }else if (password.length <=8){
            Toast.show({
                type: 'error',
                text1: 'Please fill valid password.'
              });
        }else{

            Toast.show({
                type:'success',
                text1:"Sucess!"
            })
        }
    }catch(error){
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
            onChangeText={(text)=>{
                setEmail(text);
            }}
            value={email}
            style={styles.input}
        ></TextInput>
        
        <TextInput
            placeholder="Password"
            onChangeText={(text)=>{
                setPassword(text);
            }}
            value={password}
            secureTextEntry={true}
            autoCapitalize="none"
            style={styles.input}
        ></TextInput>
        
        <TouchableOpacity style={styles.button} onPress={onLogin} >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

    </View>
  )
}
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
      buttonText:{
        textAlign:'center'
      }

  });