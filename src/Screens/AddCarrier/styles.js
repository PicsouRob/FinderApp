import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        margin: 20,
        backgroundColor: "#e7ebee",
    },
    content: {
        backgroundColor: "#e7ebee",
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 30,
        marginTop: -70,
        borderRadius: 5,
        marginBottom: 40,
    },
    input: {
        width: width - 40,
        height: 45,
        backgroundColor: "#fff",
        borderRadius: 5,
        paddingHorizontal: 10,
        color: "#170f45",
        fontSize: 14,
        borderBottomColor: "transparent",
        marginTop: 5,
        marginLeft: -10,
        marginBottom: -10,
    },
    btn: {
        width: '100%',
        height: 45,
        backgroundColor: "#ff7a59",
        borderRadius: 5,
        marginVertical: 15,
    },
    text: {
        fontSize: 19,
        fontWeight: 'bold',
        color: "#fff",
    },
    images_select: {
        height: 45,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    btn_select: {
        height: 35,
        borderColor: 'grey',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    undraw: {
        width,
        height: 140, 
        backgroundColor: '#0e1e25',
    },
    input_city: {
        height: 35,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        borderRadius: 15,
        marginVertical: 10,
    },
    error_style: {
        marginLeft: -10,
        marginTop: 10 
    }
});