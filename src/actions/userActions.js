import * as actions from '../constants'
import axios from 'axios'
import Cookie from 'js-cookie'

export const register = (name,email,password) => (dispatch) => {
    dispatch({type:actions.REGISTER_REQUEST});
    axios.post('https://res-backen.herokuapp.com/api/user/register',{name,email,password})
             .then(user => {
                 if(user.data.msg === "new user Created"){
                 dispatch({type:actions.REGISTER_SUCCESS,payload:user.data.userData});
                 Cookie.set('userInfo',JSON.stringify(user.data.userData));
                 }
                 else {
                    dispatch({type:actions.REGISTER_FAILURE,payload:user.data.msg})
                 }
                })
             .catch(err => {
                 dispatch({type:actions.REGISTER_FAILURE,payload:err.message})
             });
}

export const signIn = (email,password) => (dispatch) => {
    dispatch({type:actions.SIGNIN_REQUEST});
    axios.post('https://res-backen.herokuapp.com/api/user/signIn',{email,password})
             .then(user => {
                 if(user.data.msg === "valid password"){
                    Cookie.set('userInfo',JSON.stringify(user.data.userData));
                 dispatch({type:actions.SIGNIN_SUCCESS,payload:user.data.userData});
                 }
                 else {
                    dispatch({type:actions.SIGNIN_FAILURE,payload:user.data.msg});
                 }
             })
             .catch(err => {
                 dispatch({type:actions.SIGNIN_FAILURE,payload:err.message});
             });
}


export const logOut = () => (dispatch) => {
    dispatch({type:actions.USER_LOGOUT});
}