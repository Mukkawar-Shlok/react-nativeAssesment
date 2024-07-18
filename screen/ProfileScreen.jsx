import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import config from "../config";
import { useAppContext } from '../AppContext';
import UpdateProfile from './components/ProfileScreenComponents/UpdateProfile';
import ReadProfile from './components/ProfileScreenComponents/ReadProfile';

const ProfileScreen = ({ navigation, route }) => {
    const { token,updateMode } = useAppContext();
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
                    throw new Error('Network response was not ok.');
                }
                const data = await response.json();
                setProfile(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [token]);

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
