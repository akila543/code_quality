const express = require('express')
    , app = express()
    , server = require('http').Server(app)
    , port = process.env.port || 4004
    , con = require('./db/connections/mysql.connect.js');

// routes
const bookingOrder = require('./routes/bookingOrder.route.js')
    , purchaseOrder = require('./routes/purchaseOrder.route.js')
    , inventory = require('./routes/inventory.route.js');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 	next();
});


app.use(express.static('./../'));

app.use('/', (req, res, next) => {
  console.log('inside routes');
  next();
}, bookingOrder, purchaseOrder, inventory);

// con.connect((err) => {
//   if (err) throw err;
//   console.log("Connected to mysql from server.js !");
//   con.end();
// });

server.listen(port, (err, res) => {
  if (err) {
    console.log('error in serving up the server - > ',err);
  } else {
    console.log('server started on',port);
  }
});
