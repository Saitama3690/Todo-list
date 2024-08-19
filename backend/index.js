const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');

//connecting db mongoose query
connectToMongo();

//runnable output sake code
const app = express()
const port = 5000;

//allowing to fetch  data from backend
app.use(cors())

//to use request in thunderBolt terminal
app.use(express.json());

//available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/todo', require('./routes/todo'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})