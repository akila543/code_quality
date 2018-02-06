const inventory = require('express').Router()
    , request = require('superagent')
    , con = require('./../db/connections/mysql.connect.js');

inventory.get('/inventoryPlans', (req, res) => {
  var resObj = {
    pcId : [],
    productCategoryId : [],
    projectionDate : [],
    shortFallQty : []
  }
  con.query('SELECT * FROM inventory_view', (err, result, fields) => {
    if (err) {
      console.log('error in fetching inventory data - > ',err);
    } else {
      result.map((item,i) => {
        resObj.pcId.push(item.pc_id);
        resObj.productCategoryId.push(item.product_category_id);
        resObj.projectionDate.push(item.projection_date);
        resObj.shortFallQty.push(item.shortfall_quantity);
      });
      res.json(resObj);
    }
  });
});

inventory.get('/shortFallQty', (req, res) => {
  con.query('SELECT pc_id, shortfall_quantity FROM inventory_view WHERE product_category_id = "'+req.query.pdId+'"AND projection_date = "'+req.query.projDate+'"', (err, result, fields) => {
    if (err) {
      console.log('err from fetching shortFallQty - > ',err);
    } else {
      console.log('resss - > ', result);
      if (result.length==0) {
        var resp = [];
        var respObj = {
          pc_id: 'No Data Found for your Selection',
          shortfall_quantity: 'No Data Found for your Selection'
        };
        resp.push(respObj);
        res.json(resp);
      } else {
        res.json(result);
      }
    }
  });
});

module.exports = inventory;
