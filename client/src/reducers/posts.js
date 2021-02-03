import * as actionTypes from '../constants/actionTypes';

const reducer = (state=[], action) => {
    switch(action.type) {
        case actionTypes.FETCH_ALL:
            return action.payload;
        case actionTypes.CREATE:
            return [...state, action.payload];
        case actionTypes.UPDATE:
        case actionTypes.LIKE:
            return state.map(post => post._id === action.payload._id ? action.payload : post);
        case actionTypes.DELETE: 
            return state.filter(post => post._id !== action.payload);
        default:
            return state;
    }
}

export default reducer;