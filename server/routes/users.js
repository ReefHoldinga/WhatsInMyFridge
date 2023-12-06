const express = require('express')
const {
  login,
  register,
  deleteUser
} = require('../controllers/userController')
const router = express.Router()

// login
router.get('/login', login)

// register
router.post('/register', register)

// delete
router.delete('/delete', deleteUser)

module.exports = router