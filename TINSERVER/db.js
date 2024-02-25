const mysql = require('mysql2');


const dbConfig = {
  host: "localhost",
  user: "root",
  password: "polasaka31",
  database: "projekt"
};


const pool = mysql.createPool(dbConfig);

const query = (sql, params) => new Promise((resolve, reject) => {
  pool.query(sql, params, (error, results) => {
    if (error) {
      reject(error);
      return;
    }
    resolve(results);
  });
});

module.exports = { query };
