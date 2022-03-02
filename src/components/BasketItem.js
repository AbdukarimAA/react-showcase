function BasketItem(props){
    const {id, name, price, quantity, removeFromBasket = Function.prototype, handlePlus, handleMinus } = props;

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