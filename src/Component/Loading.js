import React from 'react';
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Overlay } from 'react-native-elements';

import { globalStyle } from '../GlobalStyle';

function Loading(props) {
    const { isVisible, text } = props;

    return (
        <Overlay overlayStyle={[globalStyle.center, styles.overlay]}
            isVisible={isVisible}
            overlayBackgroundColor="transparent"
        >
            <View style={globalStyle.center}>
                <ActivityIndicator size="large" color="#ff7a59">
                </ActivityIndicator>
                {text && <Text style={styles.text}>{text}</Text>}
            </View>

        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay: {
        width: '100%',
        height: 100,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        shadowColor: "transparent",
        flex: 1,
    },
    text: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        marginTop: 10,
    }
});

export default Loading;