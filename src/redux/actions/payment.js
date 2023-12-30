import axios from "axios";
import { setAlert } from  './alert';
import { get_item_total } from './cart';
import {
    GET_PAYMENT_TOTAL_SUCCESS,
    GET_PAYMENT_TOTAL_FAIL,
    LOAD_BT_TOKEN_SUCCESS,
    LOAD_BT_TOKEN_FAIL,
    PAYMENT_SUCCESS,
    PAYMENT_FAIL,
    RESET_PAYMENT_INFO,
    SET_PAYMENT_LOADING,
    REMOVE_PAYMENT_LOADING
} from './types';

export const get_payment_total = (shipping_id) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }

    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/payment/get-payment-total?shipping_id=${shipping_id}`, config)
        
        if (res.status === 200 && !res.data.error){
            dispatch({
                type: GET_PAYMENT_TOTAL_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PAYMENT_TOTAL_FAIL
            });
        }
    } catch(err){
        dispatch({
            type: GET_PAYMENT_TOTAL_FAIL
        });
    }
}

export const get_client_token = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }

    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/payment/get-token`, config);

        if (res.status === 200){
            dispatch({
                type: LOAD_BT_TOKEN_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: LOAD_BT_TOKEN_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: LOAD_BT_TOKEN_FAIL
        });
    }
}