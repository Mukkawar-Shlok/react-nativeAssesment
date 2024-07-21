import React, { useEffect, useState } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

//context
import { useAppContext } from '../../../AppContext';

//async storage for storing profile after it gets fetched
import AsyncStorage from '@react-native-async-storage/async-storage';

//for showing text messages
import Toast from 'react-native-toast-message';

//static image for profile
import defaultImage from "../../../public/static/images/default.webp";

//config for base url of api
import config from '../../../config'; 

const ReadProfile = () => {
    const { setUpdateMode, setToken, token } = useAppContext();

    //profile state
    const [profile, setProfile] = useState({});
    //loading state
    const [load,setLoad] = useState(false);
    
    //fetching profile
    useEffect(() => {
        async function fetchData() {

            const url = config.BASE_URL + "api/profile";
            setLoad(true);
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
            }finally{
                setLoad(false);
            }
        }
        fetchData();
    }, [token]);

    //logout function
    async function LogOut() {    
        try {
            //removing token from local storage and context
            setToken("");
            await AsyncStorage.removeItem("userToken");
            //removing profile from local storage
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



    return (
        <>
        {load ? (
            //loading
        <View style={[styles.actContainer, styles.horizontal]}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
        ) : (
            // loaded
        <View style={styles.container}>
            <View style={styles.header}>
            
                <Text style={styles.headerText}>Profile</Text>
                {/* log out button */}
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
                {/* edit profile */}
                <TouchableOpacity style={styles.updateButton} onPress={() => setUpdateMode(true)}>
                    <Text style={styles.updateButtonText}>Edit Profile</Text>
                </TouchableOpacity>

            </View>
        </View>
        )}
        </>
        
    );
};

//styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    actContainer: {
        flex: 1,
        justifyContent: 'center',
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
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
