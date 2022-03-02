import React, {useState, useEffect} from 'react';
import {API_URL, API_KEY} from '../config';
import {Preloader} from './Preloader';
import {GoodsList} from "./GoodsList";
import {Cart} from "./Cart";
import {BasketList} from "./BasketList";
import {Alert} from "./Alert";

function saveLS () {
    const item = localStorage.getItem('goods');
    return item ? JSON.parse(item) : [];
}

function Shop () {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState(saveLS());
    const [isBasketShow, setBasketShow] = useState(false)
    const [alertName, setAlertName] = useState('');


    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                Authorization: API_KEY,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                data.featured && setGoods(data.featured);
                setLoading(false);
            });
    }, []);

    const addGoodsToCart = (item) => {
        const itemIndex = order.findIndex(element => element.id === item.id)

        if(itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            }
            setOrder([...order, newItem])
        }else {
            const newOrder = order.map((orderItem, index) => {
                if(index === itemIndex) {
                    return{
                        ...orderItem,
                        quantity: orderItem.quantity + 1
                    }
                }else {
                    return orderItem;
                }
            })
            setOrder(newOrder);
        }
        setAlertName(item.name);

    }

    const removeFromBasket = (itemId) => {
        const newOrder = order.filter(el => el.id !== itemId);
        setOrder(newOrder);
    }

    const handleBasketShow = () => {
        setBasketShow(!isBasketShow);
    }

    const handlePlus = (itemId) => {
        const newOrder = order.map((el) =>{
            if(el.id === itemId){
                const newQuantity = el.quantity + 1;
                return {
                    ...el,
                    quantity: newQuantity,
                }
            }else {
                return el;
            }
        });
        setOrder(newOrder);
    }

    const handleMinus = (itemId) => {
        const newOrder = order.map((el) =>{
            if(el.id === itemId){
                const newQuantity = el.quantity - 1;
                return {
                    ...el,
                    quantity: newQuantity > 0 ? newQuantity : 0
                };
            } else {
                return el;
            }
        });
        setOrder(newOrder);
    }

    const closeAlert = () => {
        setAlertName('');
    }

    useEffect(() => {
        localStorage.setItem('goods', JSON.stringify(order))
    }, [order]);


    return(
    <div className='container content'>
        <Cart quantity={order.length} handleBasketShow={handleBasketShow}/>
        {
            loading ?
                <Preloader/>
                :
                <GoodsList goods={goods} addGoodsToCart={addGoodsToCart}/>}
        {
            isBasketShow && <BasketList order={order} handleBasketShow={handleBasketShow} removeFromBasket={removeFromBasket} handlePlus={handlePlus} handleMinus={handleMinus} />
        }
        {
            alertName && <Alert name={alertName} closeAlert={closeAlert}/>
        }
    </div>)
}

export {Shop}