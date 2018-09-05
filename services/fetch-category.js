const request = require("request-promise")
const cheerio = require("cheerio")
const mysql = require('promise-mysql')

const { log, clear } = console
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env

module.exports.exec = async () => {

  log('>> fetch category .... [START]')

  const options = {
    uri: 'https://www.lazada.co.th',
    json: true,
    transform: body => cheerio.load(body)
  }

  const $ = await request(options)
  const datacat = $("li[data-cate]")

  const connection = await mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASS,
    database: MYSQL_DB
  })

  for (cat of datacat.toArray()) {
      const catid = $(cat).attr('data-cate')
      const href = $(cat).find('> a').attr('href').trim()
      const name = $(cat).find('> a > span').text().trim()
      log('-->>', catid, href)
      const sql = `insert into categories(level, href, name) values('${catid}','${href}','${name}')`
      await connection.query(sql);
  }

  await connection.end();
   log('>> fetch category .... [DONE]')
}

