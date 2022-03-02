function Cart(props) {
    const{quantity = 0, handleBasketShow = Function.prototype} = props;

    return (
        <div className='#00897b teal darken-1 white-text cart' onClick={handleBasketShow}>
            <i className='material-icons'>add_shopping_cart</i>
            {quantity ? <span className='cart-quantity'>{quantity}</span> : null}
        </div>
    )
}

export{Cart}