const express = require('express')
const {
  getFoodstuffs,
  addFoodstuff,
  sortByLabel,
  showOnlyOne,
  deleteItem,
  updateItem
} = require('../controllers/foodstuffsController')

const router = express.Router()

// GET all items
router.get('/', getFoodstuffs)

// post item
router.post('/add', addFoodstuff)

// Sort items by label
router.get('/sortLabel', sortByLabel)

//Show only specific label
router.get('/showOneLabel', showOnlyOne)

// Delete item
router.delete('/delete/:id', deleteItem)

// Update item
router.patch('/update/:id', updateItem)


module.exports = router