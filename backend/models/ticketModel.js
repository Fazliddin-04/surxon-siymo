const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  product: {
    type: String,
    required: [true, 'Please select a product'],
    enum: ['shirt', 'trousers', 'shoes']
  },
  description: {
    type: String,
    required: [true, 'Please enter a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter price of the product'],
  },
  vendorcode: {
    type: String,
    required: [true, 'Please enter vendor code of the product'],
  },
  barcode: {
    type: String,
    required: [true, 'Please enter barcode of the product'],
  },
  size: {
    type: String,
    required: [true, 'Please select size of the product'],
    enum: ['L', 'XL', 'XXL']
  },
  // amount: {
  //   type: Number,
  //   required: [true, 'Please enter amount of the product'],
  // },
  status: {
    type: String,
    required: true,
    enum: ['new', 'in stock', 'out of stock'],
    default: 'new'
  }
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Ticket', ticketSchema)