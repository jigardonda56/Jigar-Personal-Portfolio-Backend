const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')

connectToMongo();

const app = express()
const port = 5000
//order of app.use metters
app.use(cors())

app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(bodyParser.json({limit: "50mb"}));

app.use(express.json())

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/details', require('./routes/details'))

app.listen(port, () => {
  console.log(`jigar portfolio backend listening at http://jigar-donda.onrender.com:${port}`)
})
