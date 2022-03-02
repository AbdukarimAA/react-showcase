export function reducer(state, {type, payload}) {
    switch(type){
        case 'SET_GOODS': return {
            ...state,
            goods: payload || [],
            loading: false,
        }

        case 'CLOSE_ALERT': return {
            ...state,
            alertName: '',
        }

        case 'ADD_GOODS_TO_CART':{
            const itemIndex = state.order.findIndex(element => element.id === payload.id)

            let newOrder = null;

            if(itemIndex < 0) {
                const newItem = {
                    ...payload,
                    quantity: 1,
                };
                newOrder = [...state.order, newItem]
            }else {
                newOrder = state.order.map((orderItem, index) => {
                    if(index === itemIndex) {
                        return{
                            ...orderItem,
                            quantity: orderItem.quantity + 1
                        }
                    }else {
                        return orderItem;
                    }
                })
            }

            return {
                ...state,
                order: newOrder,
                alertName: payload.name,
            }
        }

        case 'REMOVE_FROM_BASKET': return{
            ...state,
            order: state.order.filter((el)=> el.id !== payload.id),
        }

        case 'HANDLE_PLUS': return {
            ...state,
            order: state.order.map((el) =>{
                if(el.id === payload.id){
                    const newQuantity = el.quantity + 1;
                    return {
                        ...el,
                        quantity: newQuantity,
                    }
                }else {
                    return el;
                }
            }),
        }

        case 'HANDLE_MINUS': return {
            ...state,
            order: state.order.map((el) =>{
                if(el.id === payload.id){
                    const newQuantity = el.quantity - 1;
                    return {
                        ...el,
                        quantity: newQuantity > 0 ? newQuantity : 0
                    };
                } else {
                    return el;
                }
            }),
        }

        case 'TOGGLE_BASKET': return {
            ...state,
            isBasketShow: !state.isBasketShow,
        }

        default: return state;
    }

}