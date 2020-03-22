import * as actionTypes from './types';
import axios from 'axios';

// Login
export const loginActions = (userData) => {
    return dispatch => {
     
        axios.post("http://localhost:8000/user/login", userData)
        .then( res => {
            
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                result: res.data,
                
            })
              
            // console.log(res.data);
        }).catch(err => {
            console.log('Login Fail', err);
        })
    }

};

// Get List Data User
export const getListUser = (token) => {
    return dispatch => {
        axios.get("http://localhost:8000/user/create", 
        {
            headers: { Authorization: "Bearer " + token }
        })
        .then( res => {
            dispatch({
                type: actionTypes.GET_LIST_USER,
                result: res
            })
        }).catch(err => {
            console.log('Fail', err);
        })
    }

};

// Add User
export const addUserAction = (token, newUser) => {
    return dispatch => {
     
        axios.post("http://localhost:8000/user/create", newUser, 
        {
            headers: { Authorization: "Bearer " + token }
        }
        )
        .then( res => {
            
            dispatch({
                type: actionTypes.ADD_USER,
                result: res.user
            })
            //console.log(res.data);
        }).catch(err => {
            console.log('Add  User is Fail', err);
        })
    }

};
