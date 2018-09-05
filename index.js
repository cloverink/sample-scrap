const request = require("request-promise")
const cheerio = require("cheerio")
const mysql = require('promise-mysql')

const {
  fetchCategory,
  fetchProduct
} = require('./services')

const { log, clear } = console
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env

const logi = msg => log('\x1b[36m%s\x1b[0m', msg)
const logg = msg => log('\x1b[32m%s\x1b[0m', msg)

const run = async () => {

  // logi('01 - fetch - category')
  // await fetchCategory.exec()

  logi('02 - fetch - page')
  await fetchProduct.exec()
  
  
}




clear()
run();
