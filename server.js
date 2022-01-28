require('dotenv').config()
const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())
app.use(express.json())

const ticketsController = require('./controllers/tickets_controller')
app.use('/tickets', ticketsController)

const boardController = require('./controllers/boards_controller')
app.use('/boards', boardController)

app.get('*', (req,res) => {
    res.sendStatus(404)
})

app.listen(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`))