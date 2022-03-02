import React, {useState, useEffect, useContext} from 'react';
import {API_URL, API_KEY} from '../config';
import {ShopContext} from "../Context";


import {Preloader} from './Preloader';
import {GoodsList} from "./GoodsList";
import {Cart} from "./Cart";
import {BasketList} from "./BasketList";
import {Alert} from "./Alert";

function saveLS () {
    const item = localStorage.getItem('goods');
    return item ? JSON.parse(item) : [];
} //localStorage

function Shop () {
    const {goods, setGoods, loading, isBasketShow, alertName } = useContext(ShopContext);
    const [order, setOrder] = useState(saveLS());

    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                Authorization: API_KEY,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setGoods(data.featured)
            });
    }, []);

    useEffect(() => {
        localStorage.setItem('goods', JSON.stringify(order))
    }, [order]);

    return(
    <div className='container content'>
        <Cart quantity={order.length}/>
        {
            loading ?
                <Preloader/>
                :
                <GoodsList goods={goods}/>}
        {
            isBasketShow && <BasketList order={order}/>
        }
        {
            alertName && <Alert />
        }
    </div>)
}

export {Shop}