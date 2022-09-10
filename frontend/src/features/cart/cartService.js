import axios from 'axios'

const API_URL = '/api/carts/'

// create cart
const createCart = async (cartData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, cartData, config)

  return response.data
}

// Get user carts
const getCarts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL, config)

  return response.data
}

// Get user cart
const getCart = async (cartId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL + cartId, config)

  return response.data
}

// Delete cart
const deleteCart = async (cartId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(API_URL + cartId, config)

  return response.data
}

const cartService = {
  createCart, getCarts, getCart, deleteCart
}

export default cartService