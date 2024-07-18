import React from 'react';
import { View, Text, StyleSheet, Button, Image, TextInput, TouchableOpacity } from 'react-native';
import { useAppContext } from '../../../AppContext';

const ReadProfile = ({ profile }) => {
    const { setUpdateMode } = useAppContext();
    if (!profile) {
        return <Text style={styles.loadingText}>Loading profile...</Text>;
        console.log(profile);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Profile</Text>
            </View>
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/150' }} 
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
                    <Text style={styles.updateButtonText}>Update</Text>
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
        fontWeight:'800',
        fontSize:15,
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
    loadingText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        color: '#999',
    },
});

export default ReadProfile;
