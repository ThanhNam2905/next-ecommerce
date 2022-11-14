import { createContext, useReducer } from 'react';
import { ACTIONS } from './Actions'
import Cookies from 'js-cookie'

export const StoreContext = createContext();

const initialState = {
    cart: Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : { cartItems: [], infoOrder: {} },
};

function Reducers(state, action) {
    switch(action.type) {
        case ACTIONS.ADD_CART_ITEM: {
            const newItem = action.payload;
            // TH1: khac id product.
            // TH2: cung id product, cung color, khac size.
            // TH3: cung id product, khac color, cung size.
            // TH4: cung id product, khac size, khac color.
            // TH5: cung id product, cung color, cung size.
            let cartItems = state.cart.cartItems;
            let fcart = {}
            console.log(state.cart.cartItems)    
            cartItems.push(newItem);
            fcart.cartItems = cartItems
            // const existItem = state.cart.cartItems.find((item) => item.idProduct === newItem.idProduct);


            
            // const cartItems = existItem ? state.cart.cartItems.map((item) => {
            //     if( item.idProduct === newItem.idProduct &&
            //         item.selectedColor === newItem.selectedColor &&
            //         item.selectedSize !== newItem.selectedSize) {
            //             alert(`TH2: cung id product, cung color, khac size.`)
            //             return [ ...state.cart.cartItems, ...newItem];
            //     }
            //     else if(item.idProduct === newItem.idProduct &&
            //             item.selectedColor !== newItem.selectedColor &&
            //             item.selectedSize === newItem.selectedSize) {
            //             alert(`TH3: cung id product, khac color, cung size.`)
            //             return [ ...state.cart.cartItems, ...newItem];
            //     }
            //     else if(item.idProduct === newItem.idProduct &&
            //         item.selectedColor !== newItem.selectedColor &&
            //         item.selectedSize !== newItem.selectedSize) {
            //             alert(`TH4: cung id product, khac size, khac color.`)
            //             return [ ...state.cart.cartItems, ...newItem];
            //         }
            //     else if(item.idProduct === newItem.idProduct &&
            //             item.selectedColor === newItem.selectedColor &&
            //             item.selectedSize === newItem.selectedSize) {
            //             alert('TH5: cung id product, cung color, cung size.');
            //             return {...existItem, quantity: newItem.quantity + existItem.quantity};
                        
            //     }
               
                
            // }) : [...state.cart.cartItems, {...newItem}]; // TH1: khac id product.
            
            // Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
            return { ...state, cart : fcart };
            
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

        case ACTIONS.SAVE_INFO_ORDER: {
            return {
                ...state, 
                cart : {
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

export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(Reducers, initialState);
    const value = { state, dispatch};

    return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}