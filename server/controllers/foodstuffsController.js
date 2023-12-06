const Foodstuffs = require('../models/foodstuffsModel')
const mongoose = require('mongoose')

// get all items
const getFoodstuffs = async (req, res) => {
  const items = await Foodstuffs.find({}).sort({createdAt: -1})
  res.status(200).json(items)
}

// post a food item
const addFoodstuff = async (req, res) => {
  const {title, expiration_date, label, amount} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }

  if(!expiration_date) {
    emptyFields.push('expiration_date')
  }

  
  if(emptyFields.length > 0) {
    return res.status(400).json( {error: 'Please fill in all required fields', emptyFields})
  }

  // add to db
  try {
    const item = await Foodstuffs.create({title, expiration_date, label, amount})
    res.status(200).json(item)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

//sort by label
const sortByLabel = async (req, res) => {
  const items = await Foodstuffs.find().sort({label : 1})
  res.status(200).json(items)
}

//show only specific label
const showOnlyOne = async (req, res) => {
  const { label } = req.body
  const items = await Foodstuffs.find({label: label})
  res.status(200).json(items)
}

//delete item
const deleteItem = async (req, res) => {

  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such item'})
  }

  const item = await Foodstuffs.findOneAndDelete({_id: id})

  if (!item) {
    return res.status(404).json({error: 'No such item'})
  }

  res.status(200).json(item)
}

//update item
const updateItem = async (req, res) => {

  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such item'})
  }

  const item = await Foodstuffs.findOneAndUpdate({
    ...req.body
  })

  if (!item) {
    return res.status(404).json({error: 'No such item'})
  }

  res.status(200).json(item)

}

module.exports = {
  getFoodstuffs,
  addFoodstuff,
  sortByLabel,
  showOnlyOne,
  deleteItem,
  updateItem
}