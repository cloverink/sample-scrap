const mysql = require('promise-mysql');

// const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env

const test = async() => {

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: ''
  })

  const sql = "select * from questions limit 1";
  const x = await connection.query(sql);
  
  console.log(x)
  
  await connection.end();
}


test();