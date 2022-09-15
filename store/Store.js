import { createContext, useReducer } from 'react';
import { ACTIONS } from './Actions'
import Cookies from 'js-cookie'

export const StoreContext = createContext();

const initialState = {
    cart: Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : { cartItems: [] },
};

function Reducers(state, action) {
    switch(action.type) {
        case ACTIONS.ADD_CART: {
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find((item) => item.slug === newItem.slug);  // sản phẩm đã tồn tại

            const cartItems = existItem
                ? state.cart.cartItems.map((item) =>
                    item.name === existItem.name ? newItem : item
                )
                : [...state.cart.cartItems, newItem];
            Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems}));
            return { ...state, cart: { ...state.cart, cartItems } }
        }

        case ACTIONS.REMOVE_CART: {
            const cartItems = state.cart.cartItems.filter((item) => item.slug !== action.payload.slug);
            Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems}));
            return { ...state, cart: { ...state.cart, cartItems}};
        }

        case ACTIONS.RESET_CART: {
            return {
                ...state, cart: {
                    cartItems: [],
                    shippingAddress: { location: {}},
                    paymentMethod: '',
                }
            };
        }

        default:
            return state;
    }
}

export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(Reducers, initialState);
    const value = { state, dispatch};

    return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}