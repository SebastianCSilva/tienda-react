import {
    ADD_ITEM,
    GET_TOTAL,
    GET_ITEM_TOTAL,
    GET_ITEMS,
    UPDATE_ITEM,
    REMOVE_ITEM,
    EMPTY_CART,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_FAIL,
    GET_TOTAL_SUCCESS,
    GET_TOTAL_FAIL,
    GET_ITEM_TOTAL_SUCCESS,
    GET_ITEM_TOTAL_FAIL,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAIL,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAIL,
    REMOVE_ITEM_SUCCESS,
    REMOVE_ITEM_FAIL,
    EMPTY_CART_SUCCESS,
    EMPTY_CART_FAIL,
    SYNCH_CART_SUCCESS,
    SYNCH_CART_FAIL
} from '../actions/types';

const initialState = {
    items: null,
    amount: 0.00,
    compare_amount: 0.00,
    total_items: 0
};

export default function Cart(state = initialState, action){
    const { type, payload } = action;

    switch(type){
        case ADD_ITEM_SUCCESS:
            return {
                ...state,
                items: payload.cart
            };
        case ADD_ITEM_FAIL:
            return {
                ...state,
                items: null
            };
        default:
            return state;
    }
}