import { View, Text, Button, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../../AppContext';
import Toast from 'react-native-toast-message';
import config from "../../../config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import validator from 'validator';
import {SelectList} from 'react-native-dropdown-select-list';

const UpdateProfile = () => {
    const { setUpdateMode, token, profileUpdated, setProfileUpdated } = useAppContext();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    
    const [selected, setSelectedList] = useState("")
    const data = [
        { key: 'China', value: 'China' },
        { key: 'Nepal', value: 'Nepal' },
        { key: 'India', value: 'India' },
        { key: 'Bhutan', value: 'Bhutan' },
        { key: 'Bangladesh', value: 'Bangladesh' }
    ];

    useEffect(() => {
        const fetchProfileData = async () => {
            let profileData = await AsyncStorage.getItem("userProfile");
            profileData = JSON.parse(profileData);
            if (profileData) {
                setName(profileData.name);
                setEmail(profileData.email);
                setCity(profileData.city);
                setCountry(profileData.country);
                setPincode(String(profileData.pincode));
            }
        };

        fetchProfileData();
    }, []);

    const updateProfile = async () => {
        try {
            if(name.length <= 0){
                Toast.show({ type: 'error', text1: 'Please fill valid name.' });
                return;
            }
            if (!validator.isEmail(email)) {
                Toast.show({ type: 'error', text1: 'Please fill valid email.' });
                return;
            }
            if(city.length <= 0){
                Toast.show({ type: 'error', text1: 'Please fill valid city.' });
                return;
            }
            if(pincode.length < 6){
                Toast.show({ type: 'error', text1: 'Please fill valid pincode.' });
                return;
            }
            let url = `${config.BASE_URL}api/profile`;
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ email, name, pincode, country, city })
            });
            if (!response.ok) {
                Toast.show({ type: 'error', text1: "Network response was not ok." });
                return;
            }
            response = await response.json();
            await AsyncStorage.setItem("userProfile", JSON.stringify(response));
            setProfileUpdated(!profileUpdated);
            Toast.show({ type: 'success', text1: "Profile Updated Successfully." });
            setUpdateMode(false);
        } catch (error) {
            console.log(error);
            Toast.show({ type: 'error', text1: error.message });
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Update Profile</Text>
                    <Button title='Go Back' onPress={() => setUpdateMode(false)} />
                </View>
                <View style={styles.profileContainer}>
                    <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
                    <Text style={styles.changePictureText}>Change Picture</Text>
                    <TextInput style={styles.input} placeholder='Name' value={name} onChangeText={(text) => setName(text)} />
                    <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={(text) => setEmail(text)} />
                    <TextInput style={styles.input} placeholder='City' value={city} onChangeText={(text) => setCity(text)} />
                    {/* <TextInput style={styles.input} placeholder='Country' value={country} onChangeText={(text) => setCountry(text)} /> */}
                    <TextInput style={styles.input} placeholder='Pincode' value={pincode} onChangeText={(text) => setPincode(text)} />
                    <SelectList 
                    data={data} 
                    setSelected={setCountry} 
                    style={{ width: '90%' }} 
                    placeholder={country}
                    // selected={country}
                    />                   
                    <TouchableOpacity style={styles.updateButton} onPress={updateProfile}>
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
        fontSize: 15,
        paddingLeft: 10,
        backgroundColor: '#fff',
    },
    dropdown: {
        width: '90%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        fontSize: 15,
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
});

export default UpdateProfile;
