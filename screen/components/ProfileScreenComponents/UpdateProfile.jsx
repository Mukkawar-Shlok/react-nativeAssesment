import { View, Text, Button, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../../AppContext';
import Toast from 'react-native-toast-message';
import config from "../../../config";

const UpdateProfile = ({profile}) => {
    const{setUpdateMode,token,profileUpdated,setProfileUpdated} = useAppContext();
    const [seeLoad,setSeeLoad] = useState(false);
    const [name,setName] = useState(profile.name);
    const [email,setEmail] = useState(profile.email);
    const [city,setCity] = useState(profile.city);
    const [country,setCountry] = useState(profile.country);
    const [pincode,setPincode] = useState(String(profile.pincode));
    async function updateProfile(){
        try{
            let url = config.BASE_URL + "api/profile";
            let response = await fetch(url,
                {
                    method:"POST",
                    headers:{
                        'Content-Type':"application/json",
                        'Authorization': `Bearer ${token}`,
                    },
                    body:JSON.stringify({
                        email:email,
                        name:name,
                        pincode:pincode,
                        country:country,
                        city:city
                    })
                }
            )
            if(!response.ok){
                Toast.show({
                    type: 'error',
                    text1: "Network response was not ok."
                  }); 
            }
            response =await response.json();
            console.log(response)
            setProfileUpdated(!profileUpdated)
            Toast.show({
                type: 'success',
                text1: "Profile Updated Sucessfully."
              });
            setUpdateMode(false);
        }catch(error){
            console.log(error);
            Toast.show({
              type: 'error',
              text1: error.message
            });
        }
    } 
    console.log(profile)
    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Update Profile</Text>
            <Button title='Go Back' onPress={()=>setUpdateMode(false)}/>
            </View>
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/150' }} // Default profile image
                    style={styles.profileImage}
                />
                <Text style={styles.changePictureText}>Change Picture</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Name'
                    value={name}
                    onChangeText={(text)=>setName(text)}
                    
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    value={email}
                    onChangeText={(text)=>setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='City'
                    value={city}
                    onChangeText={(text)=>setCity(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Country'
                    value={country}
                    onChangeText={(text)=>setCountry(text)} 
                />
                <TextInput
                    style={styles.input}
                    placeholder='Pincode'
                    value={String(pincode)}
                    onChangeText={(text)=>setPincode(text)} 
                />
                <TouchableOpacity style={styles.updateButton} onPress={() => updateProfile()}>
                    <Text style={styles.updateButtonText}>Update</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#fa7268',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileContainer: {
        alignItems: 'center',
        padding: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    changePictureText: {
        color: '#555',
        marginBottom: 20,
    },
    input: {
        width: '90%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        fontSize:15,
        paddingLeft: 10,
        backgroundColor: '#fff',
    },
    updateButton: {
        width: '90%',
        height: 40,
        backgroundColor: '#000',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        color: '#999',
    },
});

export default UpdateProfile