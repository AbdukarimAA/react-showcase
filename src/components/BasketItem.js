import {useContext} from "react";
import {ShopContext} from "../Context";

function BasketItem(props){
    const {id, name, price, quantity} = props;
    const {removeFromBasket, handleMinus, handlePlus} = useContext(ShopContext);

    return(
        <li className="collection-item">
            {name} <button onClick={() => handleMinus(id)}>-</button> {quantity} <button onClick={() => handlePlus(id)}>+</button> = {price*quantity} rub
            <span className="secondary-content"
                  onClick={() => removeFromBasket(id)}>
                <i className="material-icons basket-delete">
                    close
                </i>
            </span>
        </li>
    )
}

export{BasketItem}