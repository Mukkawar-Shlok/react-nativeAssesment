import { View, Text, Button, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useAppContext } from '../../../AppContext';

const UpdateProfile = ({profile}) => {
    const{setUpdateMode} = useAppContext();
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
                    value={profile.name}
                
                    
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    value={profile.email}
                    
                />
                <TextInput
                    style={styles.input}
                    placeholder='City'
                    value={profile.city}
                    
                />
                <TextInput
                    style={styles.input}
                    placeholder='Country'
                    value={profile.country}
                    
                />
                <TextInput
                    style={styles.input}
                    placeholder='Pincode'
                    value={String(profile.pincode)}
                    
                />
                <TouchableOpacity style={styles.updateButton} onPress={() => setUpdateMode(true)}>
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
