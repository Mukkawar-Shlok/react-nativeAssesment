import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import config from "../config";
import { useAppContext } from '../AppContext';
import UpdateProfile from './components/ProfileScreenComponents/UpdateProfile';
import ReadProfile from './components/ProfileScreenComponents/ReadProfile';
import Toast from 'react-native-toast-message';

const ProfileScreen = ({ navigation, route }) => {
    const { token,updateMode,profileUpdated } = useAppContext();
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
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: error.message
                  });
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [token,profileUpdated]);

    return (
        <>
        {updateMode ? (
            <>
            <UpdateProfile profile={profile} />
            </>
            
        ):
        (
            <ReadProfile profile={profile}/>
        )}
        </>
    );
};


export default ProfileScreen;
