require('dotenv').config()
const cors = require('cors')
const morgan = require('morgan'); // log request in dev mode
const express = require('express')
const app = express()
// const mongoose = require('mongoose')
const routes = require('./routes')

const db = require('./models')

db.sequelize.sync().then(() => {
  console.log('database connection success!');
}).catch((e) => {
  console.log('database connection failed', e);
})

// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
// const db = mongoose.connection
// db.on('error', (error) => console.error(error))
// db.once('open', () => console.log('connected to database, now edited!'))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


app.use('/', routes)
app.listen(3005, () => console.log('server started!!'))