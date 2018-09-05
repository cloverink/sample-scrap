const mysql = require('promise-mysql')

const { log, clear } = console
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env

const exec = async () => {

  log('>> DB TRUNCATE .... [START]')

  const connection = await mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASS,
    database: MYSQL_DB
  })
  await connection.query('truncate categories');

  await connection.end();

  log('>> DB TRUNCATE .... [DONE]')
}

clear()
exec()