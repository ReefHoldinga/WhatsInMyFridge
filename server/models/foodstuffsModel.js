const mongoose = require('mongoose')
const Schema = mongoose.Schema

const foodstuffsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  expires: {
    type: Date,
    required: true
  },
  section: {
    type: String,
  },
  amount: {
    type: String
  }
}, { timestamps: true })

module.exports = mongoose.model('Foodstuffs', foodstuffsSchema)