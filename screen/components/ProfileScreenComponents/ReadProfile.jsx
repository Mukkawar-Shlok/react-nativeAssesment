import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TextInput, TouchableOpacity } from 'react-native';
import { useAppContext } from '../../../AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import defaultImage from "../../../public/static/images/default.webp";
import config from '../../../config'; 

const ReadProfile = () => {
    const { setUpdateMode, setToken, token } = useAppContext();
    const [profile, setProfile] = useState(null);
    
    useEffect(() => {
        async function fetchData() {
            const url = config.BASE_URL + "api/profile";
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    Toast.show({
                        type: 'error',
                        text1: "Network response was not ok."
                    });  
                }
                const data = await response.json();
                setProfile(data);
                await AsyncStorage.setItem("userProfile",JSON.stringify(data));
                console.log(data);
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: error.message
                });
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [token]);

    async function LogOut() {    
        try {
            setToken("");
            await AsyncStorage.removeItem("userToken");
            await AsyncStorage.removeItem("userProfile");
            Toast.show({
                type: 'success',
                text1: "Successfully Logged Out."
            });
        } catch (error) {
            console.log(error);
            Toast.show({
                type: 'error',
                text1: error.message
            });
        }
    }

    if (!profile) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading profile...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Profile</Text>
                <Button
                    title="Log Out"
                    onPress={LogOut}
                />
            </View>
            <View style={styles.profileContainer}>
                <Image
                    source={defaultImage} 
                    style={styles.profileImage}
                />
                <Text style={styles.changePictureText}>Change Picture</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Name'
                    value={profile.name}
                    editable={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    value={profile.email}
                    editable={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder='City'
                    value={profile.city}
                    editable={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Country'
                    value={profile.country}
                    editable={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Pincode'
                    value={String(profile.pincode)}
                    editable={false}
                />
                <TouchableOpacity style={styles.updateButton} onPress={() => setUpdateMode(true)}>
                    <Text style={styles.updateButtonText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        fontWeight: '800',
        fontSize: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        color: '#999',
    },
});

export default ReadProfile;
