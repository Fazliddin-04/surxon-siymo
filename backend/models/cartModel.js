const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  products: {
    type: Array,
    required: [true, 'Please select products'],
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: [true, 'Please enter discount'],
  },
  discountType: {
    type: String,
    required: [true, 'Please enter discount type'],
  },
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Cart', cartSchema)