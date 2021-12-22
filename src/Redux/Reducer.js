import { USERNOTLOGGED, USERLOGGED } from './Type';

const initialState = { user: {}, isLogged: false };

function Reducer(state = initialState, action) {
    switch (action.type) {
        case USERNOTLOGGED:
            return { 
                ...state,
                user: {}, 
                isLogged: false,
            }
        case USERLOGGED:
            return { 
                ...state,
                user: action.value,
                isLogged: true
            }
        default:
            return state;
    }
};

export default Reducer;