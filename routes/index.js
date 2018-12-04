var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//setting up connection and end functions
//this database connection is 'root'...
//has access to all databases on RDS
function getConnection() {
    return mysql.createConnection({

        host: 'ecomsite-rds.clpcnl2zsquk.us-east-1.rds.amazonaws.com',
        user: 'ecomsiteabdullah',
        password: 'setsuna00',
    });
}

function connectionEnd() {
    connection.end();
}

//setting up connection variable
var connection = getConnection();


/* GET home page. */
router.get('/', function(req, res, next) {
  var query = `select * from ecomsite.products`
  connection.query(query, (err, results, fields) => {
    if (err) {
      return console.log(err.message);
    } else {
      console.log('successfully fetched all products');
      console.log(JSON.stringify(results, undefined, 3));
      var productChunks = [];
      var chunkSize = 3;
      for (var i = 0; i < results.length; i += chunkSize) {
        productChunks.push(results.slice(i, i + chunkSize));
      }
      res.render('shop/index', {
        title: 'shopping cart',
        products: productChunks
      });
    }
  });
});

router.get('/add-product', function(req, res, next){
  res.render('shop/form');
});

router.post('/add-product', function(req, res, next){
  var query = `insert into ecomsite.products (
    title, description, imagePath, price) values (?,?,?,?)`;

  const productTitle = req.body.formTitle;
  const productDescription = req.body.formDescription;
  const productImagePath = req.body.formImagePath;
  const productPrice = req.body.formPrice;

  connection.query(query, [productTitle, productDescription, productImagePath, productPrice], (err, results, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('Product added successfully');
      console.log(results);
      res.redirect('/');
    }
  });
});

module.exports = router;
