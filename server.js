require ('./models/db');

const express = require ('express');
const bodyparser = require ('body-parser')

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}))
app.use(bodyparser.json());

require('./config/routes')(app)

app.listen(8000, () => {
    console.log('Express server start at port : 8000')
})

