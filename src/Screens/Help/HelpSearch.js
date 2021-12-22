import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { globalStyle } from '../../GlobalStyle';
import { styles } from './styles';

const HelpSearch = (props) => {
    const { navigation } = props;

    return (
        <View style={styles.content}>
            <Text style={styles.text_header}>Comment embaucher avec finderht.com</Text>
            <Text style={styles.text}>Finderht.com vous permet en tant que clients d'embaucher des travailleurs indépendants ou des professionnels sur des projets hors ligne.</Text>
            <Text style={styles.text}>Pour engager un embaucheur pour votre, veillez:</Text>
            <Text style={[styles.text, globalStyle.center]}><Text style={styles.strong}>1-</Text> Cliquez sur <TouchableOpacity
                style={{ height: 25 }}
                onPress={() => navigation.navigate('Search', { jobValue: '', cityValue: '' })}
            >
                    <Text style={styles.link}>Parcourir</Text>
                </TouchableOpacity> sur la page d'accueil de Finderht.com ou inserrer le titre du mettier pour laquelle vous voullez embaucher.</Text>
            <Text style={styles.text}><Text style={styles.strong}> -</Text> Recherchez votre meilleur comptable, soyez sélectif dans le choix d'un comptable, ne choisissez pas le mauvais pour votre travail.</Text>
            <Text style={styles.text}><Text style={styles.strong}>2-</Text> Prendre Contact avec celui dont vous avez choisi.</Text>
            <Text style={styles.text}>Créez un contrat d'embauche avec l'embaucheur de votre choix, avec différentes formules de contrat pour votre travail.</Text>
            <Text style={styles.text}><Text style={styles.strong}>3-</Text> Commençer à travailler avec lui.</Text>
            <Text style={styles.text}><Text style={styles.strong}>-</Text>Commencez à travailler avec l'embaucheur de votre choix, embauchez selon le contrat qui a été fait.</Text>
            <TouchableOpacity style={[globalStyle.center, styles.btn]}
                onPress={() => navigation.navigate('Search', { jobValue: '', cityValue: '' })}
            >
                <Text style={styles.text_btn}>Parcourir</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HelpSearch;