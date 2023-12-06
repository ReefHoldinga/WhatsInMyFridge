require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const foodstuffRoutes = require('./routes/foodstuffs')
const userRoutes = require('./routes/users')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/foodstuffs', foodstuffRoutes)
app.use('/api/users', userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(4000, () => {
      console.log('Listening on port 4000')
    })
  })
  .catch((error) => {console.log(error)})
