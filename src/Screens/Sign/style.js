import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    image_logo: {
        width: 140,
        height: 40,
        marginBottom: 15,
    },
    text: {
        fontSize: 30, 
        marginBottom: 5,
        color: "#170f45",
    },
    text_button: {
        fontSize: 20, 
        fontWeight: "bold", 
        color: "#fff"
    },
    button_submit: {
        marginHorizontal: 30,
        height: 50,
        backgroundColor: "#ff7a59",
        borderRadius: 5,
        marginTop: 15,
    },
    input: {
        width: 330,
        height: 45,
        backgroundColor: "#fff",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        color: "#170f45",
        fontSize: 14,
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 5,
    },
    text_bottom: {
        marginTop: 5,
        fontSize: 16,
    },
    text_separator: {
        fontSize: 18,
        color: 'gray',
        marginVertical: 20,
    },
    bar: {
        width: 140,
        backgroundColor: "#e7ebee",
        height: 1,
        marginHorizontal: 5,
    },
    link: {
        color: 'blue',
        marginLeft: 2,
        marginBottom: 3,
    }
});