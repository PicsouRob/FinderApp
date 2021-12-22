import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import Footer from '../../Component/Footer';
import { globalStyle } from '../../GlobalStyle';
import { data, city } from '../../Helpers/helpers';

function Home(props) {
    const { navigation } = props;
    const [selectedCity, setSelectedCity] = useState('');
    const [value, setValue] = useState('');

    return (
        <ScrollView style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <View style={[styles.top, globalStyle.item_center]}>
                <Text style={styles.top_text}>Trouver des Embaucheurs en ligne pour votre travail</Text>
                <Text style={styles.top_text_2}>Or publier votre mettier</Text>
                <View style={[globalStyle.row_between_center, styles.input_content]}>
                    <KeyboardAwareScrollView>
                        <Input inputContainerStyle={styles.input} 
                            placeholder="Titre"
                            containerStyle={styles.input_container}
                            value={value}
                            onChangeText={(e) => setValue(e)}
                        />
                    </KeyboardAwareScrollView>
                    <Icon name="location" type='ionicon' size={15} color='grey' />
                    <Picker
                        placeholder="Ville"
                        selectedValue={selectedCity}
                        style={styles.input_city}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedCity(itemValue)
                    }>
                        <Picker.Item label="Ville" value="Ville" />
                        {city.map((item, index) => (
                            <Picker.Item key={index} label={item} value={item} />
                        ))}
                    </Picker>
                    <TouchableOpacity style={[styles.btn_search, globalStyle.center]}
                        onPress={() => navigation.navigate('Search', {
                            jobValue: value, cityValue: selectedCity
                        })}
                    >
                        <Text style={styles.btn_text}>Recherche</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.btn, globalStyle.center]}
                    onPress={() => navigation.navigate('Search', {
                        jobValue: '', cityValue: ''
                    })}
                >
                    <Text style={styles.btn_text}>TROUVEZ UN EMPLOYEUR</Text>
                </TouchableOpacity>
                <View style={[styles.social, globalStyle.center_row]}>
                    <Text style={styles.follow}>Suivez-Nous</Text>
                    <TouchableOpacity style={styles.icon_social}
                        onPress={() => Linking.openURL(`http://facebook.com/roberto.phanord`)}
                    >
                        <Icon name="logo-facebook" type='ionicon' size={25} color='#33475b' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon_social}
                        onPress={() => Linking.openURL(`instagram://user?username=iampicsou`)}
                    >
                        <Icon name="logo-instagram" type='ionicon' size={25} color='#33475b' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon_social}
                        onPress={() => Linking.openURL(`twitter://user?screen_name=picsouRoberto`)}
                    >
                        <Icon name="logo-twitter" type='ionicon' size={25} color='#33475b' />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.containt, globalStyle.center]}>
                <Text style={styles.text}>Comment trouver votre meilleur Embaucheurs </Text>
                <Text style={styles.text_2}>Le moyen rapide de trouver votre meilleur Embaucheurs</Text>
                {data.map((item, index) => (
                    <View key={index} style={[globalStyle.center, styles.content]}>
                        <Icon type='ionicon' name={item.iconName} color={item.icon} 
                            style={[styles.icon, globalStyle.center ,{ backgroundColor: item.color }]}
                        />
                        <Text style={styles.content_text}>{item.title}</Text>
                        <Text style={styles.content_text_2}>{item.text}</Text>
                    </View>
                ))}
            </View>
            <Footer />
        </ScrollView>
    )
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e7ebee",
    },
    top: {
        height,
        paddingHorizontal: 20,
    },
    top_text: {
        fontSize: 40,
        color: "#170f45",
        fontWeight: 'bold',
        marginBottom: 5,
        lineHeight: 55,
    },
    top_text_2: {
        fontSize: 18,
        color: "#33475b",
        marginVertical: 5,
    },
    btn: {
        width: 230,
        height: 52,
        backgroundColor: "#ff7a59",
        borderRadius: 10,
        marginVertical: 10,
    },
    btn_text: {
        fontSize: 18,
        color: "#fff",
        fontWeight: 'bold',
    },
    containt: {
        backgroundColor: "#fff",
        paddingVertical: 30,
        paddingHorizontal: 20,
    }, 
    content: {
        width: 290,
        height: 210,
        marginVertical: 30,
    },
    input_content: {
        width: width - 40,
        height: 55,
        backgroundColor: '#fff',
        marginBottom: 30,
        paddingEnd: 5,
        borderRadius: 5,
        marginTop: 20,
    },
    input_city: {
        width: 120,
    },
    input: {
        width: 120,
        height: 45,
        borderBottomColor: 'transparent',
        marginBottom: -25,
        marginLeft: -8,
    },
    input_filter: {
        width: 140,
        height: 30
    },
    input_container: { 
        width: 120,
        marginLeft: 0,
    },
    btn_search: {
        backgroundColor: '#31C6AE',
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderRadius: 5,
    },
    content_text: {
        fontSize: 23,
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.7)',
        marginVertical: 10,
    },
    content_text_2: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 5,
        lineHeight: 25,
    },
    text: {
        fontSize: 25,
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.8)',
        marginBottom: 10,
    },
    text_2: {
        fontSize: 18,
        textAlign: 'center',
    },
    icon: {
        width: 45,
        height: 45,
        borderRadius: 15,
        marginVertical: 10,
    },
    social: {
        paddingVertical: 30,
    },
    follow: {
        color: "#33475b",
        fontSize: 20,
        marginRight: 10,
    },
    icon_social: {
        marginHorizontal: 15,
    },
});

export default Home;
