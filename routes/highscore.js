var express = require('express');
var router = express.Router();
const {Client} = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
var input;
var userinfo;
client.connect();

router.get('/', function(req, res, next) {
  client.query('SELECT * FROM SCORES;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    console.log("pure input= " + JSON.stringify(res.rows));
    input = res.rows;
  });
  console.log('JSON object to handlebars: ' + input);
  res.render('highscoreList', {objects: input});
});

router.get('/scores/:id', function(req, res, next) {
  client.query('SELECT * FROM SCORES WHERE ID = ($1);',
  [req.params.id],
  (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      userinfo = res.rows;
      console.log("id success!")
    }
  });
  res.render('userscore.hbs', {objects: userinfo});
});

module.exports = router;
