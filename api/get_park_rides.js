'use strict';
const mysql = require('mysql2');
const fs = require('fs');

module.exports.handler = (event, context, callback) => {
  const options = JSON.parse(fs.readFileSync('config/config.json', 'utf8'));
  const conx = mysql.createConnection(options);

  var response = {};
  var data = [];
  console.log(event.pathParameters);
  const id = decodeURIComponent(event.pathParameters.id)
  const query = `SELECT * FROM ride_inspections  WHERE park_id = "${id}"`;
  conx.query(
    query,
    function(err, results, fields) {
      if (err) throw err;
      results.forEach(function(row) {
        data.push(row)
      });
      response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({data}),
      };
      callback(null, response);
    }
  );
  conx.end();
};
