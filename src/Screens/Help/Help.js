import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { globalStyle } from '../../GlobalStyle';
import HelpPost from './HelpPost';
import HelpSearch from './HelpSearch';
import Footer from '../../Component/Footer';

const Help = (props) => {
    const { route, navigation } = props;
    const { help } = route.params;

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.undraw}>
                <Text style={styles.text}>Aide sur les articles supplémentaires</Text>
            </View>
            <View style={[globalStyle.center, { marginHorizontal: 20 }]}>
                {help ? <HelpSearch navigation={navigation} /> : 
                    <HelpPost navigation={navigation} />
                }
            </View>
            <Footer />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    undraw: {
        height: 170,
        backgroundColor: "#0e1e25",
    },
    text: {
        textAlign: 'center',
        color: "#fff",
        fontSize: 30,
        marginVertical: 20,
    }
});

export default Help;