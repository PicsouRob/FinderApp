import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    content: {
        width: '100%',
        backgroundColor: "#fff",
        zIndex: 10,
        marginTop: -70,
        borderRadius: 5,
        paddingHorizontal: 15,
        marginBottom: 40,
        paddingBottom: 20,
    },
    text_header: {
        fontSize: 30,
        color: "rgba(0, 0, 0, 0.8)",
        marginVertical: 15,
    },
    text: {
        fontSize: 19,
        color: "rgba(0, 0, 0, 0.8)",
        marginVertical: 5,
        lineHeight: 35,
    },
    text_btn: {
        fontSize: 18,
        color: "#fff",
        fontWeight: 'bold',
    },
    link: {
        textDecorationLine: 'underline',
        color: 'blue',
        fontSize: 20,
        marginHorizontal: 5,
        lineHeight: 35,
    },
    btn: {
        width: 170,
        height: 50,
        backgroundColor: '#31C6AE',
        borderRadius: 5,
        marginVertical: 30,
    },
    strong: {
        color: '#000',
        fontWeight: '500',
    },
    image: {
        width: 300,
        height: 500,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 1,
        marginVertical: 20,
    },
});