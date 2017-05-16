/**
* Admin Service Factory
* @desc configure the DB connection
* @param
* @return export the pool module
*/

var pg = require('pg');
var pool;

var config = {
  //user: process.env.PGUSER || '', //env var: PGUSER
  database: process.env.PGDATABASE || 'achieveDB', //env var: PGDATABASE //--> be descriptive of what it's holding
  host: process.env.PGHOST || 'localhost',
  password: process.env.PGPASSWORD || '', //env var: PGPASSWORD
  port: process.env.PGPORT || 5432, //env var: PGPORT
  max: 50, // max number of clients in the pool
  idleTimeoutMillis: 30000, // 1.5s // how long a client is allowed to remain idle before being closed
};

if (!pool) {
  pool = new pg.Pool(config);
}

module.exports = pool;
