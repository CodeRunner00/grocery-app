require('dotenv').config()
const cors = require('cors');

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const listRouter = require('./routes/lists')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database, now edited!'))
app.use(express.json())
app.use(cors())


app.use('/lists', listRouter)
app.listen(3005, () => console.log('server started!!'))