import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Input, Icon, Image } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

import Footer from '../../Component/Footer';
import { city, getAllJob, getDate } from '../../Helpers/helpers';
import { globalStyle } from '../../GlobalStyle';
import Loading from '../../Component/Loading';

const Search = (props) => {
    const { jobValue, cityValue } = props.route.params;
    const [selectedCity, setSelectedCity] = useState(cityValue);
    const [selectFilter, setSelectFilter] = useState('Tout');
    const [data, setData] = useState([]);
    const [value, setValue] = useState(jobValue);
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getAllJob(jobValue, cityValue, setData);
    }, [jobValue, cityValue]);

    const handleSubmit = () => {
        if(!value) {
            Alert.alert('Le titre est obligatoire', 
                'Veillez bien inserer le titre du domaine que vous voulez rechercher, afin de continuer votre recherce correctement'
            );
        } else {
            setIsLoading(true);
            setTimeout(() => {
                getAllJob(value, selectedCity, setData);
                setIsLoading(false);
            }, 1000);
        }
    }

    return (
        <ScrollView style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Loading text="loading" isVisible={isLoading} />
            <View style={styles.header}>
                <View style={[{ marginVertical: 20 }]}>
                    <Text style={{ fontSize: 30, color: '#000' }}>Trouver un professionnel</Text>
                    <Text style={styles.text_header}>Trouvez votre professionnel pour votre travail et obtenez satisfaction en travaillant avec lui</Text>
                </View>
                <View style={[globalStyle.row_between_center, styles.content]}>
                    <Input inputContainerStyle={styles.input} 
                        placeholder="Titre"
                        containerStyle={styles.input_container}
                        value={value}
                        onChangeText={(e) => setValue(e)}
                    />
                    <Icon name="location" type='ionicon' size={15} color='grey' />
                    <Picker
                        placeholder="Adresse | Ville"
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
                    <TouchableOpacity style={[styles.btn, globalStyle.center]}
                        onPress={() => handleSubmit()}
                    >
                        <Text style={styles.btn_text}>Recherche</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[globalStyle.row_between_center, { margin: 20 }]}>
                <Text style={{ fontSize: 18 }}>{data.length} Freelance Trouvées</Text>
                <View style={[globalStyle.row, styles.border]}>
                    <Icon name="funnel" type='ionicon' size={15} color='grey' />
                    <Picker
                        placeholder="Adresse | Ville"
                        selectedValue={selectFilter}
                        style={styles.input_filter}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectFilter(itemValue)
                        }
                    >
                        <Picker.Item label="Tout" value="Tout" />
                        <Picker.Item label="Les plus recherchés" value="Les plus recherchés" />
                        <Picker.Item label="Les plus populaires" value="Les plus populaires" />
                    </Picker>
                </View>
            </View>
            {data.length > 0 && (<View style={{ marginBottom: 30 }}>
                {data.reverse().map((item, index) => (
                        <TouchableOpacity style={[styles.result, globalStyle.shadow]}
                            key={index}
                            onPress={() => navigation.navigate('ProfilStack', { screen: 'JobViewer', 
                            params: { item }
                        })}
                        >
                            <View style={[globalStyle.row, { paddingHorizontal: 20 }]}>
                                <Icon name="keypad" type='ionicon' size={15} color='rgba(255, 122, 89, 0.9)' 
                                    style={[styles.icon, globalStyle.center]}
                                />
                                <Text style={styles.text_name}>{item.nameCreator}</Text>
                            </View>
                            <View style={styles.center}>
                                <Text style={styles.text_job}>{item.job}</Text>
                                <Text>{item.description}</Text>
                            </View>
                            <View style={[globalStyle.row_between_center, styles.bottom]}>
                                <View>
                                    <Text style={{ fontSize: 15, marginBottom: 10 }}>{getDate(item.date)}</Text>
                                    <View style={globalStyle.row}>
                                        <Icon name="location" type='ionicon' size={15} color='#31C6AE' />
                                        <Text style={{ marginLeft: 15, fontSize: 18 }}>{item.location}</Text>
                                    </View>
                                </View>
                                <Image source={{ uri: item.images[0] }} style={styles.image} />
                            </View>
                        </TouchableOpacity>
                    ))
                } 
                </View>) 
            }
            {data.length < 1 && <View style={[styles.data_empty, globalStyle.center]}>
                <Image source={require('../../Images/notfound.png')} style={styles.image_empty} />
                <Text style={{ fontSize: 19 }}>Désolé, aucun résultat trouvé pour votre </Text>
                <Text style={{ fontSize: 19 }}>recherche: {value} {selectedCity ? 'à ' + selectedCity : ''}</Text>
            </View>}
            <Footer />
        </ScrollView>
    )
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ebf7fc",
    },
    header: {
        paddingHorizontal: 20,
        backgroundColor: '#f2faff',
    },
    text_header: {
        fontSize: 20,
        marginVertical: 5
    },
    input: {
        width: 120,
        height: 45,
        borderBottomColor: 'transparent',
        marginBottom: -25,
        marginLeft: -8,
    },
    input_city: {
        width: 120,
    },
    content: {
        width: width - 40,
        height: 55,
        backgroundColor: '#fff',
        marginBottom: 30,
        paddingEnd: 5,
        borderRadius: 5,
    },
    result: {
        height: 280,
        backgroundColor: '#fff',
        paddingVertical: 30,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 5,

    },
    center: {
        paddingHorizontal: 20,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 5,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 1,
    },
    bottom: {
        marginTop: 20,
        borderTopColor: 'grey',
        borderTopWidth: 1,
        paddingTop: 15,
        paddingHorizontal: 20,
    },
    icon: {
        width: 30, 
        height: 30,
        backgroundColor: 'rgba(49, 198, 174, 0.3)',
        borderRadius: 15, 
        marginRight: 10,
    },
    text_name: { 
        marginLeft: 10, 
        fontSize: 19, 
        color: 'rgba(0, 0, 0, 0.7)' 
    },
    text_job: { 
        marginVertical: 15,
        fontSize: 25, 
        color: "rgba(37, 35, 52, 0.9)"
    },
    border: {
        width: 170,
        paddingVertical: -10,
        paddingLeft: 5,
        borderColor: 'rgba(0, 0, 0, 0.3)',
        borderWidth: 1,
        borderRadius: 5,
    },
    input_filter: {
        width: 140,
        height: 30
    },
    data_empty: {
        marginVertical: 40,
    },
    image_empty: {
        width: 300,
        height: 240,
        marginBottom: 30,
    },
    input_container: { 
        width: 120,
        marginLeft: 0,
    },
    btn_text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    btn: {
        backgroundColor: '#ff7a59',
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderRadius: 5,
    }
});

export default Search;