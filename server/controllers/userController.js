const User = require('../models/userModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const login = async (req, res) => {
  const {email, password} = req.body

  const user = await User.findOne({email: email})

  //User auth
  if(!user) {
    return res.status(400).json({error: 'COULD NOT FIND USER'})
  }

  passStatus = await bcrypt.compare(password, user.password)

  if(!passStatus) {
    return res.status(400).json({error: 'INCORRECT PASSWORD'})
  }
  
  return res.status(200).json('Login Successful')
}

const register = async (req, res) => {
  const {email, password} = req.body

  //add user to db
  const user = await User.findOne({email: email})

  if(!user) {
    try {
      await User.create({email, password})
    } catch (error) {
      return res.status(400).json({error: error.message})
    }
  }

  res.status(400).json('EMAIL ALREADY EXISTS')
}

const deleteUser = async (req, res) => {
  const {email, password} = req.body

  //delete user from db
  const user = await User.findOne({email: email})

  if(user) {
    try {
      await User.deleteOne({email, password})
      return res.status(200).json('USER DELETED')
    } catch (error) {
      return res.status(400).json({error: error.message})
    }
  }

  res.status(400).json('USER DOES NOT EXIST')
}

module.exports = {
  login,
  register,
  deleteUser
}