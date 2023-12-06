const mongoose = require('mongoose')
const Schema = mongoose.Schema

const foodstuffsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  expiration_date: {
    type: Date,
    required: true
  },
  label: {
    type: String,
  },
  amount: {
    type: String
  }
}, { timestamps: true })

module.exports = mongoose.model('Foodstuffs', foodstuffsSchema)