import ADD_ORDERS from '../actions/orders'
import Order from '../../models/order'

const initialState = {
  orders: []
}

export default (state = initialState, action) => {
  switch (action.types) {
    case ADD_ORDERS:
      const newOrder = new Order(
        new Date().toString(), 
        action.orderData.items, 
        action.orderData.amount, 
        new Date()
      )
    return {
      ...state,
      orders: state.orders.concat(newOrder)
    }
  }
}