import axios from "axios";
import {
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
    GET_PRODUCTS_BY_ARRIVAL_SUCCESS,
    GET_PRODUCTS_BY_ARRIVAL_FAIL,
    GET_PRODUCTS_BY_SOLD_SUCCESS,
    GET_PRODUCTS_BY_SOLD_FAIL,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    SEARCH_PRODUCTS_SUCCESS,
    SEARCH_PRODUCTS_FAIL,
    RELATED_PRODUCTS_SUCCESS,
    RELATED_PRODUCTS_FAIL,
    FILTER_PRODUCTS_SUCCESS,
    FILTER_PRODUCTS_FAIL
} from './types';

export const get_products = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/get-products`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PRODUCTS_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_PRODUCTS_FAIL
        });
    }
}

export const get_products_by_arrival = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/get-products?sortBy=date_created&order=desc&limit=3`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_BY_ARRIVAL_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PRODUCTS_BY_ARRIVAL_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_PRODUCTS_BY_ARRIVAL_FAIL
        });
    }
}

export const get_products_by_sold = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/get-products?sortBy=sold&order=desc&limit=3`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_BY_SOLD_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PRODUCTS_BY_SOLD_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_PRODUCTS_BY_SOLD_FAIL
        });
    }
}

export const get_product = (productId) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/product/${productId}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCT_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_PRODUCT_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_PRODUCT_FAIL
        });
    }
}
