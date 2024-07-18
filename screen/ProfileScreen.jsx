import { useEffect } from 'react';
import { Button, Text } from 'react-native';
import config from "../config";
import { useAppContext } from '../AppContext';
const ProfileScreen = ({navigation, route}) => {
    const{token} = useAppContext();
    //for fetching profile details.
    useEffect(()=>{
        async function fetchData() {
            const url = config.BASE_URL + "api/profile";
            try {
                const response = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Ensure your token variable is defined
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                const data = await response.json();
                console.log(data);
                return data;
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle errors here
            }
        }
        const data =  fetchData();
        console.log(data)

    },[])
    return(
        <Text>Profile</Text>
    )
  };

export default ProfileScreen;