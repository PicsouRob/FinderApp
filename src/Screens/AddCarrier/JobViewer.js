import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, 
    ActivityIndicator, Linking } from 'react-native';
import { Avatar, Image, Icon } from 'react-native-elements';
import axios from 'axios';

import { globalStyle } from '../../GlobalStyle';
import { getDate } from '../../Helpers/helpers';
import { connector } from '../../connector';

const JobViewer = (props) => {
    const { navigation, route, user } = props;
    const [userProfil, setUserProfil] = useState('');
    const { item } = route.params;
    const { job, email, nameCreator, creatorId, _id, description, location, facebookProfil, instagramProfil, 
    date, phone, images } = item;

    useEffect(() => {
        axios.get(`/api/user/${creatorId}`).then((res) => {
            setUserProfil(res.data.image);
        }).catch((err) => console.log(err));
    }, [creatorId]);

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={globalStyle.row}
                onPress={() => navigation.navigate('Profil', { id: creatorId })}
            >
                <Avatar source={userProfil ? { uri: userProfil } : 
                    require('../../Images/avatar.png') } rounded size={45} 
                />
                <View style={{ marginLeft: 15 }}>
                    <Text style={{ fontSize: 19, fontWeight: "bold" }}>{nameCreator}</Text>
                    <Text>{email}</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.content}>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>{job}</Text>
                <Text style={{ fontSize: 19, marginVertical: 10 }}>{description}</Text>
                <Text style={{ fontSize: 16 }}>DEPUIS LE: {getDate(date)}</Text>
                {location && <View style={[globalStyle.row, { marginVertical: 10 }]}>
                    <Icon name="location-outline" type='ionicon' size={20} color='#31C6AE' />
                    <Text style={{ marginLeft: 15, fontSize: 19 }}>{location}</Text>
                </View>}
                {email && <TouchableOpacity style={[globalStyle.row, { marginVertical: 10 }]}
                    onPress={() => Linking.openURL(`mailto:${email}?subject=&body=`)}
                >
                    <Icon name="mail-outline" type='ionicon' size={20} color='#31C6AE' />
                    <Text style={{ marginLeft: 15, fontSize: 19 }}>{email}</Text>
                </TouchableOpacity>}
                {phone && <TouchableOpacity style={[globalStyle.row, { marginVertical: 10 }]}
                    onPress={() => Linking.openURL(`tel:${phone}`)}
                >
                    <Icon name="call-outline" type='ionicon' size={20} color='#31C6AE' />
                    <Text style={{ marginLeft: 15, fontSize: 19 }}>{phone}</Text>
                </TouchableOpacity>}
                {(instagramProfil || facebookProfil) && <Text style={{ marginVertical: 10, fontSize: 19 }}>Liens</Text>}
                {instagramProfil && <TouchableOpacity style={[globalStyle.row_between_center, styles.link]}
                    onPress={() => Linking.openURL(`instagram://user?username=${instagram}`)}
                >
                    <Text style={{ fontSize: 19 }}>instagram</Text>
                    <Icon name="trending-up" type='ionicon' size={30} color='grey' />
                </TouchableOpacity>}
                {facebookProfil && <TouchableOpacity style={[globalStyle.row_between_center, styles.link]}
                    onPress={() => Linking.openURL(`http://facebook.com/${facebook}`)}
                >
                    <Text style={{ fontSize: 19 }}>facebook</Text>
                    <Icon name="trending-up" type='ionicon' size={30} color='grey' />
                </TouchableOpacity>}
                <Text style={{ marginVertical: 10, fontSize: 19 }}>Gallerie</Text>
                {images ? <View>
                    {images.map((item, index) => (
                        <Image key={index} containerStyle={styles.gallery} source={{ uri: item }} 
                            PlaceholderContent={<ActivityIndicator />} resizeMode='stretch'
                        />
                    ))}
                </View> : <View>
                    <Image source={require('../../Images/undraw_youtube_tutorial_2gn3.png')} 
                        style={styles.image_empty}
                    />
                    <Text style={{ fontSize: 19 }}>Vous avez aucune image ,veillez cliquer sur modifier pour ajouter quelque une</Text>
                </View>}
                {user._id === creatorId && (
                    <View style={globalStyle.row_between_center}>
                        <TouchableOpacity style={[styles.btn, { backgroundColor: "#ff7a59" }, globalStyle.center]}
                            onPress={() => navigation.navigate('UpdateJob', { item })}
                        >
                            <Text style={styles.text_btn}>Modifier</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, { backgroundColor: "#31C6AE" }, globalStyle.center]}>
                            <Text style={styles.text_btn}>Supprimer</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginBottom: 40,
    },
    content: {
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 15,
        marginVertical: 30,
    },
    link: {
        marginVertical: 5,
        padding: 10,
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 5,
    },
    gallery: {
        width: '100%',
        height: 300,
        marginVertical: 10,
        borderRadius: 5,
    },
    image_empty: {
        width: 230,
        height: 300,
        marginVertical: 10,
    },
    text_btn: {
        fontSize: 18,
        color: "#fff",
        fontWeight: 'bold'
    },
    btn: {
        width: 150,
        height: 45,
        borderRadius: 5,
        marginVertical: 15,
    }
});

export default connector(JobViewer);