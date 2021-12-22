import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, 
    ScrollView, Dimensions } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import * as yup from 'yup';
import { Formik } from 'formik';
import Toast from "react-native-easy-toast";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { globalStyle } from '../GlobalStyle';
import Loading from '../Component/Loading.js';
import Footer from '../Component/Footer';

let schemaValidation = yup.object().shape({
    email: yup.string().email("L'email est incorrect").required("L'email est obligatoire"),
    name: yup.string().label("name").required("Le nom est obligatoire"),
    message: yup.string().required("Votre messagge est obligatoire")
});

const Contact = () => {
    const [isloading, setIsloading] = useState(false);
    const toastRef = useRef();

    return (
        <ScrollView style={style.container}
            showsVerticalScrollIndicator={false}
        >
            <Toast ref={toastRef} position="top" opacity={0.9} />
            <Loading isVisible={isloading} text="Envoie...." />
            <View style={style.header}>
                <View style={{ marginVertical: 20 }}>
                    <Text style={style.text_header}>Contacter Nous</Text>
                    <Text style={{ fontSize: 18 }}>Remplissez le formulaire et notre équipe vous répondra dans les 24 heures.</Text>
                </View>
                <View style={{ marginVertical: 10 }}>
                    <TouchableOpacity style={[globalStyle.row, style.linking]}
                        onPress={() => Linking.openURL(`tel:+1 809 429 8594`)}
                    >
                        <Icon name="call" type="ionicon" color="#31C6AE"size={20} />
                        <Text style={style.text}>+1 809 429 8594</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[globalStyle.row, style.linking]}
                        onPress={() => Linking.openURL((`mailto:finderht@gmail.com?subject=&body=`))}
                    >
                        <Icon name="mail" type="ionicon" color="#31C6AE" size={20} />
                        <Text style={style.text}>finderht@gmail.com</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[globalStyle.row, style.linking]}
                        onPress={() => Linking.openURL('google.navigation:q=100+101')}
                    >
                        <Icon name="location" type="ionicon" color="#31C6AE" size={20} />
                        <Text style={style.text}>102 Street Saint-Marc</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={style.form}>
                <Formik
                    initialValues={{ name: '', email: '', message: '' }}
                    onSubmit={values => {
                        setIsloading(true);
                        // values.email = '';
                        console.log(values);
                    }}
                    validationSchema={schemaValidation}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched,  }) => (
                        <KeyboardAwareScrollView>
                            <Input 
                                placeholder="Nom & Prenom"
                                inputContainerStyle={style.input}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                errorMessage={errors.name}
                                errorStyle={{ marginLeft: -10 }}
                            />
                            <Input 
                                placeholder="Courier electronique"
                                inputContainerStyle={style.input}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                errorMessage={errors.email}
                                errorStyle={{ marginLeft: -10 }}
                                autoCapitalize="none"
                                autoCompleteType="email"
                                returnKeyLabel="next"
                                returnKeyType="go"
                            />
                            <Input 
                                placeholder="Entrez votre message"
                                inputContainerStyle={style.input}
                                onChangeText={handleChange('message')}
                                onBlur={handleBlur('message')}
                                value={values.message}
                                errorMessage={errors.message}
                                errorStyle={{ marginLeft: -10 }}
                            />
                            <TouchableOpacity style={[globalStyle.center, style.btn]}
                                onPress={handleSubmit}
                            >
                                <Text style={style.text_btn}>Envoyer</Text>
                            </TouchableOpacity>
                        </KeyboardAwareScrollView>
                    )}
                </Formik>
            </View>
            <Footer />
        </ScrollView>
    )
}

const { width } = Dimensions.get('window'); 

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f9fb",
    },
    header: {
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    linking: {
        marginVertical: 15,
    },
    text: {
        marginLeft: 15,
        fontSize: 19,
        fontWeight: '500',
    },
    text_header: { 
        fontSize: 30, 
        marginVertical: 10,
        color: "#000"
    },
    form: {
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    input: {
        width: width - 40,
        height: 45,
        backgroundColor: "#fff",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginLeft: -10,
        color: "#170f45",
        fontSize: 14,
        marginTop: 10,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 1,
    },
    btn: {
        backgroundColor: '#ff7a59',
        height: 50,
        borderRadius: 5,
        marginTop: 15,
        marginBottom: 40,
    },
    text_btn: {
        fontSize: 22,
        fontWeight: '500',
        color: "#fff",
    },
});

export default Contact; 