import { ADD_TO_CART, REMOVE_TO_CART } from '../actions/cart'
import { ADD_ORDER } from '../actions/orders'
import { DELETE_PRODUCT } from '../actions/products'
import CartItem from '../../models/cart-item'

const initialState = {
  items: {},
  totalAmount: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product
      const prodPrice = addedProduct.price
      const prodTitle = addedProduct.title
      let updatedOrNewCartItem
      if (state.items[addedProduct.id]) {
        //already have item in cart, change quantity
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id] + prodPrice
        )
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem},
          totalAmount: state.totalAmount + prodPrice
        }
      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice)
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem},
          totalAmount: state.totalAmount + prodPrice
        }
      };
    case REMOVE_TO_CART:
      const selectedCartItem = state.items[action.productId]
      const currentQuantity = selectedCartItem.quantity
      let updatedCartItems
      if (currentQuantity > 1) {
        //need to reduce it, not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1, 
          selectedCartItem.productPrice, 
          selectedCartItem.productTitle, 
          selectedCartItem.sum - selectedCartItem.productPrice
        )
        updatedCartItems = {...state.items, [action.productId]: updatedCartItem}
      } else {
        updatedCartItems = { ...state.items }
        delete updatedCartItems[action.productId]
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice
      }
    case ADD_ORDER:
      return initialState
    case DELETE_PRODUCT:
      if (!state.items[action.productId]) {
        return state
      }
      const updatedItems = {...state.items}
      const itemTotal = state.items[action.productId].sum
      delete updatedItems[action.productId]
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal
      }
  }
  return state
}