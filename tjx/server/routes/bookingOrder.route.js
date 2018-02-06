const bo = require('express').Router()
    , request = require('superagent')
    , con = require('./../db/connections/mysql.connect.js');

bo.get('/getBookingOrder', (req, res) => {
  con.query('SELECT * FROM bo_data', (err, result, fields) => {
    if (err) {
      console.log('error from fetching bo data from sql - > ',err);
    } else {
      result.map((item) => {
        var cDate = item.po_creation_date
          , pDate = item.po_pickup_date
          , dDate = item.po_delivery_date;
        cDate.setHours(cDate.getHours()+5);
        cDate.setMinutes(cDate.getMinutes()+30);
        pDate.setHours(pDate.getHours()+5);
        pDate.setMinutes(pDate.getMinutes()+30);
        dDate.setHours(dDate.getHours()+5);
        dDate.setMinutes(dDate.getMinutes()+30);
        item.po_creation_date = cDate.toLocaleDateString();
        item.po_pickup_date = pDate.toLocaleDateString();
        item.po_delivery_date = dDate.toLocaleDateString();
      });
      res.json(result)
    }
  });
});

bo.post('/postBookingOrder', (req, res) => {
  var boData = req.query.boData;
  con.query('UPDATE bo_data SET carrier_id = "'+boData.carrier_id+'", bo_status = "'+boData.bo_status+'", destination = "'+boData.destination+'" WHERE bo_id = "'+boData.bo_id+'"', (err, result, fields) => {
    if (err) {
      console.log('error in updating bo data - > ',err);
    } else {
      console.log('response from bo data - > ',result);
    }
  });
});

module.exports = bo;
