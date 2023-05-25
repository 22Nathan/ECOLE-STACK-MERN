
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(3000, () => { console.log('Server started on port 3000') })
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })

module.exports = mongoose.connection

const produitsRouter = require('./routes/produits')
const personnesRouter = require('./routes/personnes')
app.use('/produits' , produitsRouter)
app.use('/personnes', personnesRouter)

app.use(express.static(path.join(__dirname, '../Front/ligueSportive', 'dist')))
app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '../Front/ligueSportive', 'dist', 'index.html')) })