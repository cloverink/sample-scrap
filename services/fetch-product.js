const request = require("request-promise")
const cheerio = require("cheerio")
const mysql = require('promise-mysql')
const url = require('url');

const { log, clear } = console
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env


const fetch = async() => {

  const connection = await mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASS,
    database: MYSQL_DB
  })
  const cat = await connection.query("select * from categories where flag = 0 limit 1");
  await connection.end();

  const { catid, level, href, name, flag } = cat[0]
  log('>>>>', level, href, name)

  const url = href.includes('http:') ? href : `https:${href}`

  const options = {
    uri: url,
    json: true,
    transform: body => cheerio.load(body)
  }
  
    const $ = await request(options)
    const dd = $("title").text()
    const maxpage = +$('.ant-pagination li').eq(-2).attr('title')

    log(`MAXPAGE === ${maxpage}`)

}

const exec = async () => {

  log('>> fetch product .... [START]')

  const connection = await mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASS,
    database: MYSQL_DB
  })

  const cnt = await connection.query("select count(*) cnt from categories where flag = 0");
  await connection.end();

  if (cnt[0]['cnt'] === 0) {
    log('>> fetch product .... [DONE]')
    return 
  }

  await fetch()
  // await exec()
}

module.exports.exec = exec