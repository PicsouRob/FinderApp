import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { Image, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { globalStyle } from '../GlobalStyle';

const Footer = () => {
    const navigation = useNavigation();
    
    return (
        <View style={[styles.container]}>
            <View style={[styles.header, globalStyle.row_between_center]}>
                <Image source={require('../Images/logo_2.png')} containerStyle={styles.image} 
                    onPress={() => navigation.navigate('Home')}
                />
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <Text style={styles.text_header}>Recherche</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('About')}>
                    <Text style={styles.text_header}>À propos</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
                    <Text style={styles.text_header}>Contact</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.social, globalStyle.center_row]}>
                <Text style={styles.follow}>Suivez-Nous</Text>
                <TouchableOpacity style={styles.icon}
                    onPress={() => Linking.openURL(`http://facebook.com/roberto.phanord`)}
                >
                    <Icon name="logo-facebook" type='ionicon' size={30} color='grey' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}
                    onPress={() => Linking.openURL(`instagram://user?username=iampicsou`)}
                >
                    <Icon name="logo-instagram" type='ionicon' size={30} color='grey' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}
                    onPress={() => Linking.openURL(`twitter://user?screen_name=picsouRoberto`)}
                >
                    <Icon name="logo-twitter" type='ionicon' size={30} color='grey' />
                </TouchableOpacity>
            </View>
            <View style={globalStyle.center}>
                <Text style={styles.text_bottom}>Copyright © 2021 - All Rights Reserved</Text>
                <Text style={styles.text_bottom}>Powered by Phanord Roberto</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 190,
        backgroundColor: "#1C1F21",
        paddingHorizontal: 20,
        paddingVertical: 35,
    },
    header: {
        marginBottom: 10,
        marginTop: -10,
    },
    image: {
        width: 71,
        height: 25,
    },
    text_header: {
        color: "#fff",
        fontSize: 20,
    },
    text_bottom: {
        color: "grey",
        fontSize: 17,
    },
    social: {
        paddingVertical: 10,
    },
    follow: {
        color: "#4a5b8a",
        fontSize: 20,
        marginRight: 10,
    },
    icon: {
        marginHorizontal: 15,
    }
});

export default Footer;