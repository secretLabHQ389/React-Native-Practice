import Order from '../../models/order'
export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

export const fetchOrders = () => {
  return async dispatch => {
    try {
      const response = await fetch('https://native-tutorial-8fb22-default-rtdb.asia-southeast1.firebasedatabase.app/orders/u1.json')

      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      const resData = await response.json()
      console.log('GET res data: ', resData)
      const loadedOrders = []

      for (const key in  resData) {
        loadedOrders.push(new Order(
          key, 
          resData[key].cartItems,
          resData[key].totalAmount,
          new Date(resData[key].date)
        ))
      }

      dispatch({ type: SET_ORDERS, orders: loadedOrders})

    } catch (err) {
      throw err
    }
  }
}

export const addOrder = (cartItems, totalAmount) => {
  const dateNow = new Date()
  console.log('createProduct action called')
  return async dispatch => {
    const response = await fetch('https://native-tutorial-8fb22-default-rtdb.asia-southeast1.firebasedatabase.app/orders/u1.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: dateNow.toISOString()
      })
    })

    if (!response.ok) {
      throw new Error('Something went wrong!')
    }

    const resData = await response.json()

    console.log('POST res data: ', resData)

    dispatch({ 
      type: ADD_ORDER, 
      orderData: {
        id: resData.name, 
        items: cartItems, 
        amount: totalAmount,
        date: date
      }
    })
  }
}