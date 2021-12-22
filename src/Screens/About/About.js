import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, 
    ImageBackground, Dimensions } from 'react-native';
import { Image } from 'react-native-elements';
import { globalStyle } from '../../GlobalStyle';
import { connector } from '../../connector';
import { aboutData } from '../../Helpers/helpers';
import Footer from '../../Component/Footer';

const About = (props) => {
    const { user, navigation } = props;

    const link = () => {
        if(user) {
            navigation.navigate('ProfilStack', { screen: 'AddCarrier' });
        } else {
            navigation.navigate('Sign');
        }
    }

    return (
        <ScrollView style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <ImageBackground style={[styles.image_background, globalStyle.item_center]}
                source={require('../../Images/fondd.jpg')}
                resizeMode="cover"
            >
                <Text style={styles.text}>À propos de nous</Text>
                <Text style={styles.text_2}>FinderHt est une communauté où vous pouvez trouver des travailleurs indépendants pour tout type de travail, par exemple un designer, un photographe, un développeur, un professionnel du marketing ou autre, vous pouvez aussi ajouter vos compétences en tant que professionnel afin que des clients puissent vous contacter pour un future boulot et nous valorisons votre confiance et votre sécurité comme notre priorité numéro un. Les possibilités sont infinies. Nous avons des pigistes ambaucheurs qui travaillent dans tous les domaines techniques, professionnels et créatifs imaginables.</Text>
                <TouchableOpacity style={[styles.btn, globalStyle.center]}
                    onPress={() => Link()}
                >
                    <Text style={styles.text_btn}>Parcourir</Text>
                </TouchableOpacity>
            </ImageBackground>
            <View style={styles.guide}>
                <Text style={styles.guide_text}>Comment ça marche?</Text>
                <View style={globalStyle.center}>
                    <Image source={require("../../Images/list.png")} 
                        style={styles.image}
                    />
                </View>
                {aboutData.map((item, index) => (
                    <View style={{ marginVertical: 15 }} key={index}>
                        <Text style={styles.text_title}>{item.id} {item.title}</Text>
                        <Text style={{ fontSize: 20 }}>{item.text}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.link}>
                <Text style={{ fontSize: 29, marginBottom: 15 }}>Alors qu'est-ce que tu attends?</Text>
                <Text style={{ fontSize: 22, marginBottom: 15 }}>Publiez un projet aujourd'hui et obtenez des offres des clients partout dans le pays ou recherchez un freelancer pour votre boulot.</Text>
                <TouchableOpacity style={[styles.btn_link, globalStyle.center]}
                    onPress={() => link()}
                >
                    <Text style={styles.btn_link_text}>Publier une offre</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn_link, globalStyle.center]}
                    onPress={() => navigation.navigate('Search', {
                        jobValue: '', cityValue: ''
                    })}
                >
                    <Text style={styles.btn_link_text}>Recherche Freelancer</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottom}>
                <Text style={{ fontSize: 28, color: '#fff', marginBottom: 15 }}>Aide supplémentaire</Text>
                <Text style={{ fontSize: 20, color: 'grey' }}>Vous ne savez pas par où commencer ? Consultez les liens ci-dessous: </Text>
                <TouchableOpacity style={styles.btn_href}
                    onPress={() => navigation.navigate("ProfilStack", 
                    { screen: 'Help', params: { help: true } })}
                >
                    <Text style={styles.text_href}>Comment embaucher avec finderht.com</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn_href}
                    onPress={() => navigation.navigate("ProfilStack", 
                    { screen: 'Help', params: { help: false } })}
                >
                    <Text style={styles.text_href}>Conseils pour publier des projets</Text>
                </TouchableOpacity>
            </View>
            <Footer />
        </ScrollView>
    )
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image_background: {
        paddingHorizontal: 20,
        height: height - 40,
    },
    text: {
        fontSize: 35,
        color: "#fff",
        fontWeight: "bold",
        marginBottom: 15,
    },
    text_2: {
        fontSize: 20,
        color: "#fff",
        lineHeight: 30,
    },
    btn: {
        width: 200,
        height: 50,
        backgroundColor: "#31C6AE",
        borderRadius: 5,
        marginVertical: 30,
    },
    text_btn: {
        fontSize: 18,
        color: "#fff",
        fontWeight: 'bold',
    },
    guide: {
        marginVertical: 30,
        paddingHorizontal: 20,
    },
    link: {
        backgroundColor: '#fff',
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    bottom: {
        backgroundColor: '#0e1e25',
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    btn_link: {
        width: 200,
        height: 50,
        paddingHorizontal: 20,
        paddingVertical: 13,
        borderColor: "#ff7a59",
        borderWidth: 2,
        marginVertical: 15,
        borderRadius: 50,
    },
    btn_link_text: { 
        fontSize: 18, 
        color: 'rgba(0, 0, 0, 0.8)', 
        fontWeight: 'bold' 
    },
    guide_text: {
        fontSize: 30,
        textAlign: "center",
        color: 'rgba(0, 0, 0, 0.9)', 
    },
    text_title: {
        fontSize: 24, 
        color: 'rgba(0, 0, 0, 0.9)', 
        marginVertical: 5,
    },
    image: {
        width: 320,
        height: 280,
        marginVertical: 25,
    },
    text_href: {
        fontSize: 25, 
        color: "#fff",
        textDecorationLine: 'underline',
        marginVertical: 10,
    }
});

export default connector(About);