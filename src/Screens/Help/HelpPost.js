import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';

import { globalStyle } from '../../GlobalStyle';
import { styles } from './styles';

const HelpPost = (props) => {
    const { navigation } = props;

    return (
        <View style={styles.content}>
            <Text style={styles.text_header}>Commencer sur Finderht.com</Text>
            <Text style={styles.text}>Finderht.com permet aux clients et aux indépendants de travailler ensemble sur des projets hors ligne.</Text>
            <Text style={styles.text}>L'inscription est facile.</Text>
            <Text style={styles.text}><Text style={styles.strong}> 1-</Text> Cliquez sur <TouchableOpacity
                style={{ height: 25 }}
                onPress={() => navigation.navigate('Sign')}
            >
                    <Text style={styles.link}>Connecter</Text>
            </TouchableOpacity> sur la page d'accueil de Finderht.com. L'inscription est  
            <Text style={styles.strong}> gratuite</Text>
            </Text>
            <Text style={styles.text}><Text style={styles.strong}> 2-</Text> Vous pouvez choisir de vous inscrire via 
                <Text style={styles.strong}> Google</Text> ou par <Text style={styles.strong}> E-mail</Text>
            </Text>
            <Image style={styles.image} source={require('../../Images/IMG_20211008_232537.jpg')} />
            <Text style={styles.text}>Si vous n'avez pas de compte cliquez sur le lien ci-dessous pour en créer un:</Text>
            <Text style={styles.text}>Vous n'avez pas de compte? <TouchableOpacity
                onPress={() => navigation.navigate('Sign', { screen: 'SignUp' })}
            >
                    <Text style={styles.link}>Inscrivez-vous</Text>
                </TouchableOpacity></Text>
            <Text style={styles.text}><Text style={styles.strong}> .</Text>Pour creer votre compte, le noms d'utilisateur doivent :</Text>
            <Text style={styles.text}><Text style={styles.strong}> -</Text>être alphanumérique (contient des lettres et/ou des chiffres),</Text>
            <Text style={styles.text}><Text style={styles.strong}> -</Text>commencer par une lettre et</Text>
            <Text style={styles.text}><Text style={styles.strong}> -</Text>avoir 16 caractères au maximum.</Text>
        </View>
    )
}

export default HelpPost;