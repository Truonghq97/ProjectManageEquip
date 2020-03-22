import * as actionTypes from '../actions/types';

const initialState = {
    data: "",
    token: "",
    listUser: [],
    newUser: ""
};

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            state.data = action.result
            console.log(action.result)
            state.data = action.result.token
            return { 
                ...state,
            };
            
        case actionTypes.LOGIN_FAILED:
            return {
                ...state,
            };

        case actionTypes.GET_LIST_USER:
            state.listUser = action.result.data
            console.log(action.result.data)
            return {
                ...state,
            };
        case actionTypes.ADD_USER:
            state.newUser = action.result
            console.log(action.result)
            return {
                ...state,
            }
            
        case 'DELETE_POST':
            return state.filter((listUser)=>listUser.id !== action.id);   
        default:
            return {
                ...state
            };
    }
}

export default rootReducer