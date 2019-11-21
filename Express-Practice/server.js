
/*var express    =    require('express');
var app        =    express();

require('./router/main')(app);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server     =    app.listen(3000,function(){
console.log("Express is running on port 3000");
});*/


// var express        =         require("express");
// var bodyParser     =         require("body-parser");
// var app            =         express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// require('./router/main')(app);
// app.set('views',__dirname + '/views');
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

/*app.get('/',function(req,res){
  res.sendfile("index.html");
});*/
// app.post('/login',function(req,res){
//   var user_name=req.body.user;
//   var password=req.body.password;
//   console.log(" talukdar User name = "+user_name+", password is "+password);
//   res.end("done");
// });

var express = require('express');
var md5 = require('md5')
var app = express();
var db = require("./database.js")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view options", {layout: false});
app.use(express.static(__dirname + '/views'));

// Root endpoint
app.get("/", (req, res, next) => {
  res.json({"message":"Ok"})
});


app.get("/api/users", (req, res, next) => {
  var sql = "select * from user"
  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});

app.get("/api/user/:id", (req, res, next) => {
  var sql = "select * from user where id = ?"
  var params = [req.params.id]
  db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":row
      })
    });
});

// app.delete("/api/user/:id", (req, res, next) => {
//   db.run(
//       'DELETE FROM user WHERE id = ?',
//       req.params.id,
//       function (err, result) {
//           if (err){
//               res.status(400).json({"error": res.message})
//               return;
//           }
//           res.json({"message":"deleted", changes: this.changes})
//   });
// })
app.post("/api/trades/", (req, res, next) => {
  var errors=[]
  if (!req.body.password){
      errors.push("No password specified");
  }
  if (!req.body.email){
      errors.push("No email specified");
  }
  if (errors.length){
      res.status(400).json({"error":errors.join(",")});
      return;
  }
  var data = {
    id: req.body.id,
    type: req.body.type,
    user : {req.body.id,req.body.name },
    symbol: req.body.symbol
  }
  var sql ='INSERT INTO user (id, type, user,symbol) VALUES (?,?,?)'
  var params =[data.id, data.type, data.user, data.symbol]
  db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
      res.json({
          "message": "success",
          "data": data,
          "id" : this.lastID
      })
  });
})
// Default response for any other request
app.use(function(req, res){
  res.status(404);
});

app.listen(3000,function(){
  console.log("Started on PORT 3000");
})