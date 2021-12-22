import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        user: state.user,
        isLogged: state.isLogged,
    }
};

export const connector = connect(mapStateToProps);