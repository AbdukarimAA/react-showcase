import {useContext} from "react";
import{ShopContext} from "../Context";

function Cart(props) {
    const{order, handleBasketShow = Function.prototype} = useContext(ShopContext);

    const quantity = order.length;

    return (
        <div className='#00897b teal darken-1 white-text cart' onClick={handleBasketShow}>
            <i className='material-icons'>add_shopping_cart</i>
            {quantity ? <span className='cart-quantity'>{quantity}</span> : null}
        </div>
    )
}

export{Cart}