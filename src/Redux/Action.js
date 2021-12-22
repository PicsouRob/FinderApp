import { USERLOGGED, USERNOTLOGGED } from './Type';

export const loggedAction = (val) => {
    return {
        type: USERLOGGED,
        value: val
    }
};

export const notLoggedAction = (val) => {
    return {
        type: USERNOTLOGGED,
    }
};