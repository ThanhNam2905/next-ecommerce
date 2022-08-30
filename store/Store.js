import { createContext, useReducer } from 'react';
import { ACTIONS } from './Actions'

export const StoreContext = createContext();

const initialState = {
    cart: { cartItems: [] },
};

function Reducers(state, action) {
    switch(action.type) {
        case ACTIONS.ADD_CART: {
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find((item) => item.slug === newItem.slug);  // sản phẩm đã tồn tại

            const cartItems = existItem ? state.cart.cartItems.map((item) => 
                item.name === existItem.name ? newItem : item) 
            : [...state.cart.cartItems, newItem];
            return { ...state, cart: { ...state.cart, cartItems } }
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