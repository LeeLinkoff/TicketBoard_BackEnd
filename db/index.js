const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, 
    {useNewUrlParser: true, useUnifiedTopology: true}, 
    () => {
    console.log(`connected to MongoDB at ${process.env.MONGO_URI}`)
  })

module.exports = mongoose.connection