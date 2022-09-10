const express = require('express')
const router = express.Router()
const { getCarts, getCart, createCart, deleteCart } = require('../controllers/cartController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getCarts).post(protect, createCart)

router.route('/:id').get(protect, getCart).delete(protect, deleteCart)

module.exports = router