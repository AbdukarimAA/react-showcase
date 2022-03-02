import {useContext} from "react";
import {ShopContext} from "../Context";
import {BasketItem} from "./BasketItem";

function BasketList(props) {
    const {order = [],
        handleBasketShow = Function.prototype,
    } = useContext(ShopContext);

    const totalPrice = order.reduce((sum, index) => {
        return sum + index.price * index.quantity;
    }, 0);

    return (
        <ul className="collection basket-list">
        <li className="collection-item active">Корзина</li>
            {
                order.length ? order.map((item) => (
                    <BasketItem key={item.id}
                                {...item}/>
                )) : <li className="collection-item">Корзина пуста</li>
            }
        <li className="collection-item active">Общая стоимость: {totalPrice} rub</li>
            <li className="collection-item"> <button className="btn btn-small">Оформить</button> </li>

            <i className='material-icons basket-close' onClick={handleBasketShow}>close</i>
        </ul>
    );
}

export {BasketList}