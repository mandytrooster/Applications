var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const {Client} = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
//test

router.post('/', function(req, res) {
  var score = req.body.score;
  var name = req.body.name;
  console.log('Score = ' + Score + 'Name ' + name);
  client.query(
    'INSERT INTO SCORES (name, score) VALUES ($1, $2);',
    [name, score],
    (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(res.rows[0]);
      }
    },
  );
  res.send('Got a POST request');
});

module.exports = router;
