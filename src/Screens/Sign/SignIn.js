import React, { useState, useEffect, useRef, useDispatch } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { SocialIcon, Icon, Input, Image } from 'react-native-elements';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import * as yup from 'yup';
import { Formik } from 'formik';
import Toast from "react-native-easy-toast";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import { globalStyle } from '../../GlobalStyle';
import { connector } from '../../connector';
import { styles } from './style';
import Loading from '../../Component/Loading';
import { loggedAction } from '../../Redux/Action';

let schemaValidation = yup.object().shape({
    email: yup.string().email("L'email est incorrect").required(),
    password: yup.string().label("password").min(6, 'Cela semble tros court...')
    .max(20, 'Nous préférons un système sécurisé, essayez un mot de passe plus court')
    .required(),
});

const SignIn = (props) => {
    const { dispatch, user } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const toastRef = useRef();
    const navigation = useNavigation();
    console.log(user);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '442243462250-lon3mvrjhm0b5t3ad4ht3l7jr9an3vcp.apps.googleusercontent.com',
        });
    }, []);

    const googleSignLogin = () => {};

    return (
        <View style={[styles.main_container, globalStyle.center]}>
            <Loading isVisible={isLoading} text="Chargement" />
            <Toast ref={toastRef} position="top" opacity={0.9} />
            <Image style={styles.image_logo} source={require('../../Images/logo.png')} />
            <View style={[{ marginBottom: 15 }, globalStyle.center]}>
                <Text style={styles.text}>Bienvenue a Nouveau</Text>
            </View>

            <GoogleSigninButton 
                style={{ width: 220, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={() => googleSignLogin()}
            />

            <View style={globalStyle.center_row}>
                <View style={styles.bar}></View>
                <Text style={styles.text_separator}>Ou</Text>
                <View style={styles.bar}></View>
            </View>
            
            <View>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={values => {
                        setIsLoading(true);
                        axios.post('/api/user/login', {
                            password: values.password, email: values.email
                        })
                        .then((res) => {
                            setIsLoading(false);
                            dispatch(loggedAction(res.data.user));
                            navigation.navigate("Home");
                        }).catch((err) => console.log(err));
                    }}
                    validationSchema={schemaValidation}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched,  }) => (
                        <View>
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
                            <Input 
                                placeholder="Mot de passe"
                                inputContainerStyle={styles.input}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('email')}
                                value={values.password}
                                errorMessage={ !touched.email ? "" : touched.password ? errors.password : ""}
                                errorStyle={{ marginLeft: 20 }}
                                autoCapitalize="none"
                                autoCompleteType="password"
                                returnKeyLabel="next"
                                returnKeyType="go"
                                password={true}
                                secureTextEntry={showPassword ? false : true}
                                rightIcon={
                                    <Icon type='ionicon' name={showPassword ? "eye" : "eye-off"}
                                        color={ !touched.email || !errors.password ? "#ff7a59" : "red" }
                                    onPress={ () => setShowPassword(!showPassword)}/>
                                }
                            />

                            <TouchableOpacity style={[styles.button_submit, globalStyle.center]} onPress={handleSubmit}>
                                <Text style={styles.text_button}>Connecter</Text>
                            </TouchableOpacity>
                            <View style={[globalStyle.center_row,]}>
                                <Text style={styles.text_bottom}>Vous n'avez pas de compte ?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={[styles.text_bottom, styles.link]}>
                                    <Text style={[styles.text_bottom, styles.link]}>Inscrivez-vous</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    )
}

export default connector(SignIn);