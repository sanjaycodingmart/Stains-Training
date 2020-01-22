const { Pool, Client } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'demodb',
  password: 'password1',
  port: 5432,
});

    pool.connect(err => {
      if(err){console.log('error in the node database connection...:',err)}
      else{console.log('node connected to the database....')}
    })

console.log("Docker started...")

module.exports = pool;