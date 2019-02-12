const express = require('express')
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID

const app = express();

var url = process.env.MONGODB_URI || "mongodb+srv://rvan3:vanraymond@nba-ml-xmtqa.mongodb.net/nba?retryWrites=true";

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    var db = client.db("nba");
    db.collection("predictions").find({},{projection:{ _id: 0 }}).limit(1).sort({$natural:-1}).toArray(function(err, result) {
      if (err) throw err;
      res.render('index', { data: result[0] });
    });
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
console.log('Listening')
});