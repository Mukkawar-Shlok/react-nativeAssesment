import React, { useEffect, useState } from 'react';
import { 
    View,
    Text,
    Image,
    StyleSheet,
    Button
} from 'react-native';

//config for base url
import config from "../config";

//for loading context
import { useAppContext } from '../AppContext';

//components for read mode profile and update mode profile
import UpdateProfile from './components/ProfileScreenComponents/UpdateProfile';
import ReadProfile from './components/ProfileScreenComponents/ReadProfile';

//for showing toast message
import Toast from 'react-native-toast-message';

const ProfileScreen = ({ navigation, route }) => {
    const { token,updateMode,profileUpdated } = useAppContext();
    //in case update mode is turned on update mode profile component will get loaded
    //else read profile will be loaded
    return (
        <>
        {updateMode ? (
            //update mode is on
            <>
            <UpdateProfile  />
            </>
            
        ):
        (
            //update mode is off
            <ReadProfile />
        )}
        </>
    );
};


export default ProfileScreen;
