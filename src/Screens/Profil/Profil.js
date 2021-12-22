import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, 
    Linking } from 'react-native';
import { Avatar, Icon, Image } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

import { connector } from '../../connector';
import { globalStyle } from '../../GlobalStyle';
import { getDate, updateUser } from '../../Helpers/helpers';
import { notLoggedAction } from '../../Redux/Action';
import Footer from '../../Component/Footer';

const Profil = (props) => {
    const { user, dispatch, route } = props;
    const navigation = useNavigation();
    const [stuff, setStuff] = useState([]);
    const [images, setImages] = useState({});
    const [data, setData] = useState({});
    const { id } = route.params;
    const { name, email, website, location, phone, facebook, instagram,
    description, image, date } = data;

    useFocusEffect(
        useCallback(() => {
            axios.get(`/api/job/user/${id}`)
            .then(res => {
                setStuff(res.data);
            }).catch(err => console.log(err));
        }, [id, stuff])
    );

    useFocusEffect(
        useCallback(() => {
            axios.get(`/api/user/${id}`)
            .then(async (res) => {
                await setData(res.data);
            }).catch(err => console.log(err));
        }, [id, user])
    );

    const userDeconnected = async () => {
        await dispatch(notLoggedAction());
        navigation.navigate('Home');
    };

    const changeAvatar = async () => {
        try {
            const response = await MultipleImagePicker.openPicker({
                selectedAssets: images,
                isPreview: true,
                singleSelectedMode: true,
            });
            updateUser(id, data).then((res) => {})
            .catch(err => console.log(err));
            setImages(response);
            // console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteAccount = () => {}

    return (
        <ScrollView styles={styles.container}
            showsVerticalScrollIndicator={false}
        >
            {image ? <Image source={data.image ? { uri: data.image } : require('../../Images/avatar.png')} 
                style={styles.image_header} 
                resizeMode='cover'
            /> :<Text style={styles.undraw}></Text>}
            <View style={[styles.profil_info, globalStyle.shadow]}>
                <View style={globalStyle.center}>
                    <Avatar source={{uri: image}} rounded size={90}>
                        {user._id === id && 
                            <Avatar.Accessory size={30} onPress={() => console.log(1)} 
                                color="#31C6AE" onPress={() => changeAvatar()}
                            />
                        }
                    </Avatar>
                    <Text style={{ fontSize: 22, marginTop: 5 }}>{name}</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(`mailto:${email}?subject=&body=`)}>
                        <Text style={{ fontSize: 17, marginVertical: 5 }}>{email}</Text>
                    </TouchableOpacity>
                    {website ? <TouchableOpacity style={globalStyle.center_row}
                        onPress={() => Linking.openURL(`https://${website}`)}
                    >
                        <Icon name="globe" color='#31C6AE' type='font-awesome' size={20} />
                        <Text style={styles.website}>{website}</Text>
                    </TouchableOpacity> : <View></View>}
                    {location && <View style={[globalStyle.center_row, { marginVertical: 5 }]}>
                        <Icon name="location" color='#31C6AE' type='ionicon' size={20} />
                        <Text style={{ fontSize: 20, marginLeft: 5 }}>{location}</Text>    
                    </View>}
                </View>
                {description && <Text style={{ fontSize: 17, marginVertical: 10 }}>{description}</Text>}
                {phone && <TouchableOpacity style={globalStyle.row_between}
                    onPress={() => Linking.openURL(`tel:${phone}`)}
                >
                    <Text style={{ fontSize: 19 }}>Numero de telephone</Text>
                    <Text style={{ fontSize: 19 }}>{phone}</Text>
                </TouchableOpacity>}
                <View style={globalStyle.row_between}>
                    <Text style={{ fontSize: 19 }}>compétence(s)</Text>
                    <Text style={{ fontSize: 19 }}>{stuff.length}</Text>
                </View>
                {(facebook || instagram) && <Text style={{ fontSize: 19, marginTop: 5 }}>Sur le web</Text>}
                {instagram && <TouchableOpacity style={[globalStyle.center_row, styles.social]}
                    onPress={() => Linking.openURL(`instagram://user?username=${instagram}`)}
                >
                    <Icon name="logo-instagram" type='ionicon' size={20} />
                    <Text style={{ fontSize: 17, marginLeft: 5 }}>instagram</Text>    
                </TouchableOpacity>}
                {facebook && <TouchableOpacity style={[globalStyle.center_row, styles.social]}
                    onPress={() => Linking.openURL(`http://facebook.com/${facebook}`)}
                >
                    <Icon name="logo-facebook" type='ionicon' size={20} />
                    <Text style={{ fontSize: 17, marginLeft: 5 }}>facebook</Text>    
                </TouchableOpacity>}
                {user._id === id && 
                    <AddCarrier navigation={navigation} />
                }
                <View style={globalStyle.center}>
                    {user._id === id && 
                        <TouchableOpacity style={[globalStyle.center, styles.btn_update]}
                            onPress={() => navigation.navigate('UpdateProfil', data)}
                        >
                            <Text style={styles.text_update}>Modifier votre profil</Text>
                        </TouchableOpacity>
                    }
                    <Text>MEMBRE DEPUIS LE : {getDate(date)}</Text>
                    {user._id === id && 
                        <View style={[globalStyle.row_between, { marginTop: 10 }]}>
                            <TouchableOpacity style={styles.btn_bottom}
                                onPress={() => userDeconnected()}
                            >
                                <Text style={{ fontSize: 17 }}>Se déconnecter</Text>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 17 }}>|</Text>
                            <TouchableOpacity style={styles.btn_bottom}
                                onPress={() => deleteAccount()}
                            >
                                <Text style={{ fontSize: 17 }}>Supprimer mon compte</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>

            <View style={[styles.profil_stuff, globalStyle.shadow]}>
                <View style={globalStyle.row_between}>
                    <Text style={{ fontSize: 19 }}>Compétence</Text>
                    <Icon name='compass' type='ionicon' size={20} />
                </View>

                {stuff ? <View>
                    {stuff.map((item, index) => (
                        <TouchableOpacity key={index} style={[globalStyle.row_between_center, globalStyle.shadow, styles.flatlist]}
                            onPress={() => navigation.navigate('JobViewer', { item })}
                        >
                            <View style={globalStyle.row_between_center}>
                                <Image source={item.images ? {uri: item.images[0]} : require('../../Images/images.jpg')} 
                                    style={styles.image_flatlist}
                                />
                                <View>
                                    <Text style={{ fontSize: 20, color: '#000' }}>{item.job}</Text>
                                    <Text style={{ fontSize: 17, marginVertical: 5 }}>{item.description}</Text>
                                    <Text>DEPUIS {getDate(item.date)}</Text>
                                </View>
                            </View>
                            <Icon name="arrow-forward" type='ionicon' size={20} />
                        </TouchableOpacity>
                    ))}
                </View> :
                <View style={globalStyle.center}>
                    <Image source={require('../../Images/add.png')} 
                        style={styles.empty_image}
                    />
                    <Text style={styles.text_empty}>Vous n'avez pas encore pulier votre carriere ou compétence, Veillez cliquer sur ajouter compétence pour en ajouter une</Text>
                    <AddCarrier navigation={navigation} />
                </View>}
            </View>
            <Footer />
        </ScrollView>
    )
}

function AddCarrier(props) {
    const { navigation } = props;

    return (
        <View style={globalStyle.center}>
            <View style={[globalStyle.center, styles.add_icon]}>
                <Icon name='add-circle' type='ionicon' size={20} 
                    color="#31C6AE"
                />
            </View>
            <TouchableOpacity style={[globalStyle.center, styles.btn_add]}
                onPress={() => navigation.navigate('AddCarrier')}
            >
                <Text style={{ fontSize: 17 }}>Ajouter compétence</Text>
            </TouchableOpacity>
        </View>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginHorizontal: 20,
    },
    undraw: {
        width,
        height: 140, 
        backgroundColor: '#0e1e25',
    },
    image_header: {
        width,
        height: 140, 
    },
    profil_info: {
        justifyContent: 'center',
        height: 'auto',
        width: width - 40,
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginTop: -80,
        padding: 20,
        borderRadius: 5,
        zIndex: 10,
    },
    add_icon: {
        backgroundColor: 'rgba(49, 198, 174, 0.2)',
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    profil_stuff: {
        width: width - 40,
        height: 'auto',
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 20,
        margin: 20,
    },
    btn_add: {
        width: 200,
        height: 40,
        borderRadius: 50,
        borderColor: "gray",
        borderWidth: 1,
        marginVertical: 10,
    },
    btn_update: {
        width: 300,
        height: 45,
        borderRadius: 5,
        marginVertical: 10,
        backgroundColor: "#31C6AE",
    },
    text_update: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    btn_bottom: {
        marginHorizontal: 10,
    },
    social: {
        height: 45,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 50,
        marginVertical: 10,
    },
    empty_image: {
        width: 190,
        height: 190,
        marginVertical: 20,
    },
    text_empty: {
        fontSize: 20,
        marginVertical: 20,
        textAlign: 'center',
    },
    flatlist: {
        height: 120,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        marginVertical: 15,
        borderRadius: 5,
    },
    image_flatlist: {
        width: 90,
        height: 90,
        borderRadius: 5,
        marginRight: 10,
    },
    website: { 
        fontSize: 17, 
        marginVertical: 7,
        borderBottomColor: 'blue',
        borderBottomWidth: 1,
        color: 'blue',
        marginLeft: 10,
    }
});

export default connector(Profil);