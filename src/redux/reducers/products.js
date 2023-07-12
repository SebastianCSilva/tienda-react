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
} from '../actions/types';

const initialState = {
    products: null,
    products_arrival: null,
    products_sold: null,
    product: null,
    search_products: null,
    related_products: null,
    filtered_products: null
};

export default function Products(state = initialState, action) {
    const { type, payload } = action;

    switch(type){

        default:
            return state
    }
}