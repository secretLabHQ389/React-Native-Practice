import Product from "../../models/product"

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export const fetchProducts = () => {
  // return dispatch => {
  //   dispatch({type: SET_PRODUCTS, products: []})
  // }

  console.log('fetchProduct action called')
  return async dispatch => {
    try {
      const response = await fetch('https://native-tutorial-8fb22-default-rtdb.asia-southeast1.firebasedatabase.app/products.json')

      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      const resData = await response.json()
      console.log('GET res data: ', resData)
      const loadedProducts = []

      for (const key in  resData) {
        loadedProducts.push(new Product(new Product(
          key, 
          'u1', 
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
        )))
      }

      dispatch({type: SET_PRODUCTS, products: loadedProducts})

    } catch (err) {
      console.log('error- ', err)
    }
  }
}

export const deleteProduct = productId => {
  return async dispatch => {
    const response = await fetch(`https://native-tutorial-8fb22-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json`, {
      method: 'DELETE', //only update in changed areas
    })
    if (!response.ok) {
      throw new Error('Something went wrong!')
    }
    dispatch({
      type: DELETE_PRODUCT, productId: productId
    })
  }
}

export const createProduct = (title, description, imageUrl, price) => {
  console.log('createProduct action called')
  return async dispatch => {
    const response = await fetch('https://native-tutorial-8fb22-default-rtdb.asia-southeast1.firebasedatabase.app/products.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price
      })
    })

    const resData = await response.json()

    console.log('POST res data: ', resData)

    dispatch({ type: CREATE_PRODUCT, productData: {
      id: resData.id,
      title,
      description,
      imageUrl,
      price
    }})
  }
}

export const updateProduct = (id, title, description, imageUrl) => {
  return async dispatch => { 
    await fetch(`https://native-tutorial-8fb22-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json`, {
      method: 'PATCH', //only update in changed areas
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl
      })
    })

    if (!response.ok) {
      throw new Error('Something went wrong!')
    }

    dispatch({
      type: UPDATE_PRODUCT, 
      pid: id,
      productData: {
        title,
        description,
        imageUrl
      }
    })
  }
}