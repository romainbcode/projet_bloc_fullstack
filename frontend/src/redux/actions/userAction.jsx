import { toast } from "react-toastify";
import { USER_LOAD_FAIL, USER_LOAD_REQUEST, USER_LOAD_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "../constants/userConstants"
import axios from 'axios';

export const userSignUpAction = (user) => async (dispatch) =>{
    dispatch({
        type: USER_SIGNUP_REQUEST
    });
    try{
        const {data} = await axios.post('/api/signup', user);
        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
        toast.success("Register succesfully !")
    }catch(error){
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error)
    }
}

export const userSignInAction = (user) => async (dispatch) =>{
    dispatch({
        type: USER_SIGNIN_REQUEST
    });
    try{
        const {data} = await axios.post('/api/signin', user);
        localStorage.setItem('userInfo', JSON.stringify(data))
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        toast.success("Log in succesfully !")
    }catch(error){
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error)
    }
}

export const userProfileAction = () => async (dispatch) =>{
    dispatch({
        type: USER_LOAD_REQUEST
    });
    try{
        const {data} = await axios.get('/api/me');
        dispatch({
            type: USER_LOAD_SUCCESS,
            payload: data
        });
    }catch(error){
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

export const userLogoutAction = () => async (dispatch) =>{
    dispatch({
        type: USER_LOGOUT_REQUEST
    });
    try{
        localStorage.removeItem('userInfo');
        const {data} = await axios.get('/api/logout')
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
        toast.success("Logout succesfully !")
    }catch(error){
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error)
    }
}