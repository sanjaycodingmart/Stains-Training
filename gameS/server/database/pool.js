const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'chat',
  password: 'indianIdeal',
  port: 5432,
});

    pool.connect(err => {
      if(err){console.log('error in the node database connection...:',err)}
      else{console.log('node connected to the database....')}
    })

module.exports = pool;