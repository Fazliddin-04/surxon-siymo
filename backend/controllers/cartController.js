const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Cart = require('../models/cartModel')
const e = require('express')

// @desc    Get user carts
// @route   /api/carts/
// @access  PRIVATE
const getCarts = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const carts = await Cart.find({ user: req.user.id })

  res.status(200).json(carts)
})

// @desc    Get user cart
// @route   /api/carts/:id
// @access  PRIVATE
const getCart = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const cart = await Cart.findById(req.params.id)

  if (!cart) {
    res.status(404)
    throw new Error('Cart not found')
  }

  if (cart.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  res.status(200).json(cart)
})

// @desc    Create new cart
// @route   POST /api/carts/
// @access  PRIVATE
const createCart = asyncHandler(async (req, res) => {
  const { products, discount, description, price, discountType } = req.body

  if (!products || !price || !discount || !discountType) {
    res.status(400)
    throw new Error('Please fill out all fields of products')
  }

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const cart = await Cart.create({
    user: req.user.id,
    products, discount, description, price, discountType
  })

  res.status(201).json(cart)
})

// @desc    Delete cart
// @route   DELETE /api/carts/:id
// @access  PRIVATE
const deleteCart = asyncHandler(async (req, res) => {
  // Delete user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const cart = await Cart.findById(req.params.id)

  if (!cart) {
    res.status(404)
    throw new Error('Cart not found')
  }

  if (cart.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  await cart.remove()

  res.status(200).json({ success: true })
})

module.exports = {
  getCarts, getCart, createCart, deleteCart
}