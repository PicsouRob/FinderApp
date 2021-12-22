import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Picker } from '@react-native-picker/picker';

import { connector } from '../../connector';
import { globalStyle } from '../../GlobalStyle';
import { styles } from '../AddCarrier/styles';
import { loggedAction } from '../../Redux/Action';
import { updateUser, city } from '../../Helpers/helpers';
import Loading from '../../Component/Loading';

let schemaValidation = yup.object().shape({
    email: yup.string().email("L'email est incorrect").required(),
});

const UpdateProfil = (props) => {
    const { user, dispatch, navigation } = props;
    const { _id, name, email, website, location, phone, facebook, instagram,
    description } = user;
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCity, setSelectedCity] = useState(location);
    
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.undraw}></Text>
            <Loading text="Modifier Profil...." isVisible={isLoading} />
            <View style={[styles.content, globalStyle.shadow]}>
                <Text style={{ fontSize: 30 }}>Remplissez le formulaire</Text>
                <Text style={{ fontSize: 17, marginVertical: 5 }}>Veillez modifier vos données personnelles nécessaire pour modifier votre profil.</Text>
                <View style={{ marginVertical: 10 }}></View>
                <KeyboardAwareScrollView style={{ marginTop: 10 }}>
                    <Formik
                        initialValues={{ email, name, phone: phone.toString(), location: selectedCity, description,
                            website, facebook, instagram
                        }}
                        onSubmit={values => {
                            setIsLoading(true);
                            updateUser(_id, values, dispatch, loggedAction).then(() => {
                                setIsLoading(false);
                                navigation.goBack();
                            }).catch(err => console.log(err));
                        }}
                        validationSchema={schemaValidation}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched,  }) => (
                            <View>
                                <Text style={{ fontSize: 19 }}>Nom et Prenom</Text>
                                <Input 
                                    placeholder="Nom et Prenom"
                                    inputContainerStyle={styles.input}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    // errorMessage={ !touched.name ? "" : touched.name ? errors.name : ""}
                                    errorStyle={{ marginLeft: 20 }}
                                />
                                <Text style={{ fontSize: 19 }}>Courrier électronique</Text>
                                <Input 
                                    placeholder="Courier electronique"
                                    inputContainerStyle={styles.input}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    errorMessage={ !touched.password ? "" : touched.email ? errors.email : ""}
                                    errorStyle={{ marginLeft: 20 }}
                                    autoCapitalize="none"
                                    autoCompleteType="email"
                                    returnKeyLabel="next"
                                    returnKeyType="go"
                                />
                                <Text style={{ fontSize: 19 }}>Adresse | Ville</Text>
                                <Picker
                                    placeholder="Adresse | Ville"
                                    selectedValue={selectedCity}
                                    style={styles.input_city}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setSelectedCity(itemValue)
                                    }
                                >
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
                                    // errorMessage={ !touched.phone ? "" : touched.phone ? errors.phone : ""}
                                    errorStyle={{ marginLeft: 20 }}
                                />
                                <Text style={{ fontSize: 19 }}>Biographie</Text>
                                <Input 
                                    placeholder="Biographie"
                                    inputContainerStyle={styles.input}
                                    onChangeText={handleChange('description')}
                                    onBlur={handleBlur('description')}
                                    value={values.description}
                                    // errorMessage={ !touched.description ? "" : touched.description ? errors.description : ""}
                                    errorStyle={{ marginLeft: 20 }}
                                />
                                <Text style={{ fontSize: 19 }}>Website Url</Text>
                                <Input 
                                    placeholder="Website Url"
                                    inputContainerStyle={styles.input}
                                    onChangeText={handleChange('website')}
                                    onBlur={handleBlur('website')}
                                    value={values.website}
                                    // errorMessage={ !touched.website ? "" : touched.website ? errors.website : ""}
                                    errorStyle={{ marginLeft: 20 }}
                                />
                                <Text style={{ fontSize: 19 }}>Nom d'instagram profil</Text>
                                <Input 
                                    placeholder="Nom d'instagram profil"
                                    inputContainerStyle={styles.input}
                                    onChangeText={handleChange('instagram')}
                                    onBlur={handleBlur('instagram')}
                                    value={values.instagram}
                                    // errorMessage={ !touched.instagram ? "" : touched.instagram ? errors.instagram : ""}
                                    errorStyle={{ marginLeft: 20 }}
                                />
                                <Text style={{ fontSize: 19 }}>Nom de facebook profil</Text>
                                <Input 
                                    placeholder="Nom de facebook profil"
                                    inputContainerStyle={styles.input}
                                    onChangeText={handleChange('facebook')}
                                    onBlur={handleBlur('facebook')}
                                    value={values.facebook}
                                    // errorMessage={ !touched.facebook ? "" : touched.facebook ? errors.facebook : ""}
                                    errorStyle={{ marginLeft: 20 }}
                                />
                                <TouchableOpacity style={[globalStyle.center, styles.btn]}
                                    onPress={() => handleSubmit()}
                                >
                                    <Text style={styles.text}>Modifier mon profil</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </KeyboardAwareScrollView>
            </View>
        </ScrollView>
    );
}

export default connector(UpdateProfil);