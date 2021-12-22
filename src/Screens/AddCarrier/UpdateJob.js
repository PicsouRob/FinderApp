import React, { useState, useRef } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import axios from 'axios';
import Toast from 'react-native-easy-toast';
import { Picker } from '@react-native-picker/picker';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import { launchImageLibrary, OpenPicker } from 'react-native-image-picker';

import { globalStyle } from '../../GlobalStyle';
import { styles } from './styles';
import { city } from '../../Helpers/helpers';
import Loading from '../../Component/Loading';

let schemaValidation = yup.object().shape({
    email: yup.string().email("L'email est incorrect")
    .required("L'email est oligatoire"),
});

const UpdateJob = (props) => {
    const { route, navigation } = props;
    const { item } = route.params;
    const { nameCreator, email, location, phone, facebookProfil, instagramProfil,
    description, _id, job, creatorId } = item;
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCity, setSelectedCity] = useState(location);
    const [images, setImages] = useState([]);
    const [imagesStuff, setImagesStuff] = useState({});

    // let imagesStuff = {};
    const selectImages = async () => {
        try {
            const response = await MultipleImagePicker.openPicker({
                selectedAssets: images,
                isPreview: false,
            });
            
            await setImages(response);
        } catch (error) {
            console.log(error);
        }
    }
    // console.log(imagesStuff);

    const getImages = (val) => {
        for(let i = 0; i < images.length; i++) {
            return { images: val[i] };
        }
    }
    
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Loading text="Modifier carrière" isVisible={isLoading} />
            <Text style={styles.undraw}></Text>
            <View style={[styles.content, globalStyle.shadow]}>
                <Text style={{ fontSize: 30 }}>Remplissez le formulaire</Text>
                <Text style={{ fontSize: 17, marginVertical: 5 }}>Veillez modifier les données nécessaires pour modifier cette carrière.</Text>
                <View style={{ marginVertical: 10 }}></View>
                <KeyboardAwareScrollView style={{ marginTop: 10 }}>
                    <Formik
                        initialValues={{ email, nameCreator, phone: phone.toString(), description,
                            job, facebookProfil, instagramProfil
                        }}
                        onSubmit={async (values) => {
                            // setIsLoading(true);
                            // var formData = await new FormData();
                            // formData.append('location', selectedCity);
                            // for(let name in values) {
                            //     formData.append(`${name}`, values[name]);
                            // }
                            
                            // for(let k in response) {
                            //     const data = {
                            //         name: response[k].fileName,
                            //         type: response[k].type,
                            //         size: response[k].size,
                            //         lastModified: response[k].lastModified,
                            //         mime: response[k].mime,
                            //     };
                            //     formData.append('images', data);
                            // }
                            const images = () => {
                                for(let j in images) {
                                    return { images: images[j]};
                                }
                            }

                            const data = { ...values, location: selectedCity };
                            console.log(data);
                            // axios({
                            //     method: 'put',
                            //     url: `/api/job/${_id}`,
                            //     data,
                            // }).then(res => {
                            //     setIsLoading(false);
                            //     // setImages([]);
                            //     console.log(res.data);
                            //     // navigation.navigate('Profil', { id: creatorId });
                            // }).catch(err => {
                            //     console.log(err);
                            //     setIsLoading(false);
                            // });
                        }}
                        validationSchema={schemaValidation}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched,  }) => (
                            <View>
                                <Text style={{ fontSize: 19 }}>Nom et Prenom</Text>
                                <Input 
                                    placeholder="Nom et Prenom"
                                    inputContainerStyle={styles.input}
                                    onChangeText={handleChange('nameCreator')}
                                    onBlur={handleBlur('nameCreator')}
                                    value={values.nameCreator}
                                    errorMessage={errors.nameCreator}
                                    errorStyle={{ marginLeft: 20 }}
                                />
                                <Text style={{ fontSize: 19 }}>Courrier électronique</Text>
                                <Input 
                                    placeholder="Courier electronique"
                                    inputContainerStyle={styles.input}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    errorMessage={errors.email}
                                    errorStyle={{ marginLeft: 20 }}
                                    autoCapitalize="none"
                                    autoCompleteType="email"
                                    returnKeyLabel="next"
                                    returnKeyType="go"
                                />
                                <Text style={{ fontSize: 19 }}>Nom de votre carrière</Text>
                                <Input 
                                    placeholder="Nom de votre carrière"
                                    inputContainerStyle={styles.input}
                                    onChangeText={handleChange('job')}
                                    onBlur={handleBlur('job')}
                                    value={values.job}
                                    errorMessage={errors.location}
                                    errorStyle={{ marginLeft: 20 }}
                                />
                                <Text style={{ fontSize: 19 }}>Adresse | Ville</Text>
                                <Picker
                                    placeholder="Adresse | Ville"
                                    selectedValue={selectedCity}
                                    style={styles.input_city}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setSelectedCity(itemValue)
                                }>
                                    <Picker.Item label="Adresse" value="Adresse" />
                                    {city.map((item, index) => (
                                        <Picker.Item key={index} label={item} value={item} />
                                    ))}
                                </Picker>
                                <Text style={{ fontSize: 19 }}>No telephone</Text>
                                <Input 
                                    placeholder="No telephone"
                                    inputContainerStyle={styles.input}
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                    value={values.phone}
                                    errorMessage={errors.phone}
                                    errorStyle={{ marginLeft: 20 }}
                                />
                                <Text style={{ fontSize: 19 }}>Description</Text>
                                <Input 
                                    placeholder="Description"
                                    inputContainerStyle={styles.input}
                                    onChangeText={handleChange('description')}
                                    onBlur={handleBlur('description')}
                                    value={values.description}
                                    errorMessage={errors.description}
                                    errorStyle={{ marginLeft: 20 }}
                                />
                                <Text style={{ fontSize: 19 }}>Choisir des images</Text>
                                <View style={[globalStyle.row_between_center, styles.images_select]}>
                                    <TouchableOpacity style={[styles.btn_select, globalStyle.center]}
                                        onPress={() => selectImages(values.images)}
                                    >
                                        <Text style={{ fontSize: 19 }}>Select. Fichiers</Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 19 }}>{images.length} image(s) sélectionnées</Text>
                                </View>
                                <Input 
                                    placeholder="images"
                                    containerStyle={{ width: 0, height: 0 }}
                                    inputContainerStyle={{ width: 0, height: 0 }}
                                    onChangeText={handleChange('images')}
                                    onBlur={handleBlur('images')}
                                    value={values.images}
                                    errorMessage={errors.images}
                                />
                                <Text style={{ fontSize: 19 }}>Nom d'instagram profil</Text>
                                <Input 
                                    placeholder="Nom d'instagram profil"
                                    inputContainerStyle={styles.input}
                                    onChangeText={handleChange('instagramProfil')}
                                    onBlur={handleBlur('instagramProfil')}
                                    value={values.instagramProfil}
                                    errorMessage={errors.instagramProfil}
                                    errorStyle={{ marginLeft: 20 }}
                                />
                                <Text style={{ fontSize: 19 }}>Nom de facebook profil</Text>
                                <Input 
                                    placeholder="Nom de facebook profil"
                                    inputContainerStyle={styles.input}
                                    onChangeText={handleChange('facebookProfil')}
                                    onBlur={handleBlur('facebookProfil')}
                                    value={values.facebookProfil}
                                    errorMessage={errors.facebookProfil}
                                    errorStyle={{ marginLeft: 20 }}
                                />
                                <TouchableOpacity style={[globalStyle.center, styles.btn]}
                                    onPress={() => handleSubmit()}
                                >
                                    <Text style={styles.text}>Modifier Carriere</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </KeyboardAwareScrollView>
            </View>
        </ScrollView>
    );
}

export default UpdateJob;