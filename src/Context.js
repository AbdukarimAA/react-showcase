import{createContext, useReducer} from "react";
import {reducer} from "./Reducer";

export const ShopContext = createContext();
const initialState = {
    goods: [],
    loading: true,
    order: [],
    isBasketShow: false,
    alertName: '',
}

export const ContextProvider = ({children}) => {

    const[value, dispatch] = useReducer(reducer, initialState);

    value.closeAlert = () => {
        dispatch({type: 'CLOSE_ALERT'})
    };

    value.addGoodsToCart = (item) => {
        dispatch({type: 'ADD_GOODS_TO_CART', payload: item})
    };

    value.handleBasketShow = () => {dispatch({type: 'TOGGLE_BASKET'})}

    value.handlePlus = (itemId) => {
        dispatch({type: 'HANDLE_PLUS', payload: {id: itemId}})
    }

    value.handleMinus = (itemId) => {
        dispatch({type: 'HANDLE_MINUS', payload: {id: itemId}})
    }

    value.removeFromBasket = (itemId) => {
        dispatch({type: 'REMOVE_FROM_BASKET', payload:{id: itemId}})
    };

    value.setGoods = (data) => {
        dispatch({type:'SET_GOODS', payload: data})
    }

    return <ShopContext.Provider value={value}>
        {children}
    </ShopContext.Provider>
}