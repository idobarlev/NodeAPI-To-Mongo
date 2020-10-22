// import mongoose
const mongoose = require('mongoose');

// load env variables
const dotenv = require('dotenv');
dotenv.config()
 
//db connection
mongoose.connect(
  process.env.MONGO_URI,
  { useUnifiedTopology: true, useNewUrlParser: true }
)
.then(() => console.log('DB Connected'))
 
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});

// Main app
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const port = 3030
const postsRouter = require('./routes/post')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use('/posts',postsRouter)

app.listen(port, () => console.log(`listening on port ${port}..`))