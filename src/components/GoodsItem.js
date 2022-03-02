function GoodsItem(props) {
    const {
        id,
        name,
        description,
        price,
        full_background,
        addGoodsToCart = Function.prototype
    } = props;

    return <div className="card">
        <div className="card-image">
            <img src={full_background} alt={name} />
        </div>
        <div className="card-content">
            <span className="card-title">{name}</span>

            <p>
                {description}
            </p>
        </div>
        <div className="card-action">
            <button
                className="btn" onClick={()=>
                addGoodsToCart({
                id, name, price,})}>
                Purchase
            </button>
            <span className='right'>{price} rub</span>
        </div>
    </div>


}

export {GoodsItem}