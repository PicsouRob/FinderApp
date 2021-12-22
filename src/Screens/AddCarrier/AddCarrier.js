import React, { useState, useRef } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Picker } from '@react-native-picker/picker';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import Toast from 'react-native-easy-toast';
import axios from 'axios';

import { connector } from '../../connector';
import { globalStyle } from '../../GlobalStyle';
import { styles } from './styles';
import { city } from '../../Helpers/helpers';
import Loading from '../../Component/Loading';

let schemaValidation = yup.object().shape({
    email: yup.string().email("L'email est incorrect").required("L'email est obligatoire"),
    nameCreator: yup.string().required("Votre Nom et Prenom est obligatoire"),
    // location: yup.string().required("Votre adresse est obligatoire"),
    description: yup.string().required("La description est obligatoire"),
    // // phone: yup.number().required("Le numero du téléphone est obligatoire").min(8, 
    // //     "Le numero du téléphone doit être d'au moins 8 chiffres").max(11, 
    // //     "Le numero du téléphone ne doit pas être plus de 11 chiffres"),
    job: yup.string().required("Le nom du votre métier est obligatoire"),
});

const AddCarrier = (props) => {
    const { user, navigation } = props;
    const toastRef = useRef();
    const { _id, name, email, location, phone, 
        facebook, instagram,
    } = user;
    const [imagesStuff, setImagesStuff] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCity, setSelectedCity] = useState(location);

    const selectImage = async () => {
        try {
            const response = await MultipleImagePicker.openPicker({
                selectedAssets: imagesStuff,
                mediaType: 'images',
                isPreview: false,
            });
            
            setImagesStuff(response);
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Toast position='top' ref={toastRef} opacity={0.9} />
            <Loading text="Ajouter carrière" isVisible={isLoading} />
            <Text style={styles.undraw}></Text>
            <View style={[styles.content, globalStyle.shadow]}>
                <Text style={{ fontSize: 30 }}>Remplissez le formulaire</Text>
                <Text style={{ fontSize: 17, marginVertical: 5 }}>Veillez entrer les données nécessaires pour ajouter votre carrière.</Text>
                <View style={{ marginVertical: 10 }}></View>
                <KeyboardAwareScrollView style={{ marginTop: 10 }}>
                    <Formik
                        initialValues={{ email, nameCreator: name, description: '', job: '', facebookProfil: facebook, instagramProfil: instagram, creatorId: _id, phone: phone.toString(),
                        }}
                        onSubmit={values => {
                            // setIsLoading(true);
                            // alert(1);
                            var formData = new FormData();
                            formData.append('location', selectedCity);
                            // formData.append('phone', phone);
                            for(let name in values) {
                                formData.append(`${name}`, values[name]);
                            }

                            for(let i in imagesStuff) {
                                const file = {
                                    name: imagesStuff[i].fileName,
                                    type: imagesStuff[i].type,
                                    size: imagesStuff[i].size,
                                    lastModified: imagesStuff[i].lastModified,
                                    mime: imagesStuff[i].mime,
                                }
                                formData.append('images', file);
                            }
                            console.log(formData);
                            
                            // const data = { ...values, formData };
                            axios({
                                url: '/api/job/add-job', 
                                method: 'POST',    
                                data: formData,
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'multipart/form-data'
                                },
                            })
                            .then(res => {
                                setIsLoading(false);
                                // setImagesStuff([]);
                                // navigation.goBack();
                                console.log(res.data);
                            }).catch(err => {
                                setIsLoading(false);
                                console.log(err);
                            });
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
                                    errorMessage={ errors.nameCreator }
                                    errorStyle={styles.error_style}
                                />
                                <Text style={{ fontSize: 19 }}>Courrier électronique</Text>
                                <Input 
                                    placeholder="Courier electronique"
                                    inputContainerStyle={styles.input}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    errorMessage={errors.email}
                                    errorStyle={styles.error_style}
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
                                    errorMessage={errors.job}
                                    errorStyle={styles.error_style}
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
                                    errorStyle={styles.error_style}
                                    keyboardType='number-pad'
                                />
                                <Text style={{ fontSize: 19 }}>Biographie</Text>
                                <Input 
                                    placeholder="Description"
                                    inputContainerStyle={styles.input}
                                    onChangeText={handleChange('description')}
                                    onBlur={handleBlur('description')}
                                    value={values.description}
                                    errorMessage={errors.description}
                                    errorStyle={styles.error_style}
                                />
                                <Text style={{ fontSize: 19 }}>Choisir des images</Text>
                                <View style={[globalStyle.row_between_center, styles.images_select]}>
                                    <TouchableOpacity style={[styles.btn_select, globalStyle.center]}
                                        onPress={() => selectImage()}
                                    >
                                        <Text style={{ fontSize: 19 }}>Select. Fichiers</Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 19 }}>{imagesStuff.length} image(s) sélectionnées</Text>
                                </View>
                                <Text style={{ fontSize: 19 }}>Nom d'instagram profil</Text>
                                <Input 
                                    placeholder="Nom d'instagram profil"
                                    inputContainerStyle={styles.input}
                                    onChangeText={handleChange('instagramProfil')}
                                    onBlur={handleBlur('instagramProfil')}
                                    value={values.instagramProfil}
                                    errorMessage={errors.instagramProfil}
                                    errorStyle={styles.error_style}
                                />
                                <Text style={{ fontSize: 19 }}>Nom de facebook profil</Text>
                                <Input 
                                    placeholder="Nom de facebook profil"
                                    inputContainerStyle={styles.input}
                                    onChangeText={handleChange('facebookProfil')}
                                    onBlur={handleBlur('facebookProfil')}
                                    value={values.facebookProfil}
                                    errorMessage={errors.facebookProfil}
                                    errorStyle={styles.error_style}
                                />
                                <TouchableOpacity style={[globalStyle.center, styles.btn]}
                                    onPress={handleSubmit}
                                >
                                    <Text style={styles.text}>Publier</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </KeyboardAwareScrollView>
            </View>
        </ScrollView>
    );
}

export default connector(AddCarrier);