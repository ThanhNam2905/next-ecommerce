import { createContext, useEffect, useReducer } from 'react';
import { ACTIONS } from './Actions'

export const StoreContext = createContext();

export function StoreProvider({ children }) {
    
    const initialState = {
        cart: {
            cartItems: [],
            infoOrder: {},
        }
    };
   
    const [state, dispatch] = useReducer(Reducers, initialState);
    const { cart } = state;

    useEffect(() => {
        let cartItemList = JSON.parse(localStorage.getItem('cartItems'));
        if(cartItemList) {
            return cart.cartItems = cartItemList;
            
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cart.cartItems))
    }, [cart.cartItems]);

    
function Reducers(state, action) {
    switch (action.type) {
        case ACTIONS.ADD_CART_ITEM: {
            const newItem = action.payload;

            let isNew = true;
            let cartItems = [];
            for (let i = 0; i < state.cart.cartItems.length; i++) {
                let item = state.cart.cartItems[i]
                if (item.idProduct == newItem.idProduct &&
                    item.selectedColor == newItem.selectedColor &&
                    item.selectedSize == newItem.selectedSize) {
                    item.quantity += newItem.quantity
                    cartItems = [...state.cart.cartItems];
                    isNew = false;
                    break;
                }
            }

            if (isNew) {
                cartItems = [...state.cart.cartItems, newItem];
            }
            return { ...state, cart: { ...state.cart, cartItems } };
        }

        case ACTIONS.REMOVE_ITEM_CART: {
            const itemId = action.payload;
            const cartItems = state.cart.cartItems.filter((item) => item.itemId !== itemId);
            return { ...state, cart: { ...state.cart, cartItems } };
        }

        case ACTIONS.INCREASE_QTY_ITEM_CART: {
            const itemId = action.payload;
            let cartItems = [];
            for(let i = 0; i < state.cart.cartItems.length; i++) {
                let item = state.cart.cartItems[i];
                if(item.itemId === itemId) {
                    item.quantity--;
                    cartItems = [...state.cart.cartItems];
                }
            }
            return { ...state, cart: { ...state.cart, cartItems } };
        }

        case ACTIONS.DECREASE_QTY_ITEM_CART: {
            const itemId = action.payload;
            let cartItems = [];
            for(let i = 0; i < state.cart.cartItems.length; i++) {
                let item = state.cart.cartItems[i];
                // if(item.quantity > item.countOfStock) {
                //     message.warning({
                //         content: 'Số lượng sản phẩm trong của hàng không đủ cho bạn',
                //         className: 'customize__antd--message-success'
                //     })
                //     cartItems = [...state.cart.cartItems];
                //     return;
                // }
                if(item.itemId === itemId) {
                    item.quantity++;
                    cartItems = [...state.cart.cartItems];
                }
            }
            // state.cart.cartItems.forEach(item => {
            //     if(item.quantity > item.countOfStock) {
            //         message.warning({
            //             content: 'Số lượng sản phẩm trong của hàng không đủ cho bạn',
            //             className: 'customize__antd--message-success'
            //         })
            //         cartItems = [...state.cart.cartItems];
            //         return;
            //     }
            //     if(item.itemId === itemId) {
            //         item.quantity++;
            //         cartItems = [...state.cart.cartItems];
            //     }
            // })
            return { ...state, cart: { ...state.cart, cartItems } };
        }

        case ACTIONS.UPDATE_QUANTITY_ITEM_CART: {
            const { cartItems } = action.payload;
            return { ...state, cart: { ...state.cart, cartItems } };
        }

        case ACTIONS.RESET_CART: {
            return {
                ...state, cart: {
                    cartItems: [],
                    shippingAddress: { location: {} },
                    paymentMethod: '',
                }
            };
        }

        case ACTIONS.SAVE_INFO_ORDER: {
            return {
                ...state,
                cart: {
                    ...state.cart,
                    infoOrder: {
                        ...state.cart.infoOrder,
                        ...action.payload
                    }
                }
            };
        }
        case ACTIONS.CLEAR_CART_ITEMS: {
            return {
                ...state, cart: {
                    ...state.cart,
                    cartItems: []
                }
            };
        }

        default:
            return state;
    }
}

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    )
}