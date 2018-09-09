const request = require("request-promise")
const cheerio = require("cheerio")
const mysql = require('promise-mysql')

const {
  dbConnection,
  fetchCategory,
  fetchProduct,
  preShop,
  fetchShop
} = require('./services')

const { log, clear } = console

global.clear = clear
global.log = log
global.logg = msg => log('\x1b[32m%s\x1b[0m', msg)
global.logy = msg => log('\x1b[33m%s\x1b[0m', msg)
global.logyy = msg => log('\x1b[30m\x1b[43m%s\x1b[0m', msg)
global.logm = msg => log('\x1b[35m%s\x1b[0m', msg)
global.logi = msg => log('\x1b[36m%s\x1b[0m', msg)
global.logn = msg => process.stdout.write(msg)

const run = async () => {

  logi('00 - init - db')
  await dbConnection.init()

  try {
    // logi('01 - fetch - category')
    // await fetchCategory.exec()
  
    // logi('02 - fetch - page')
    // await fetchProduct.exec()

    // logi('03 - prepare shop')
    // await preShop.exec()

    logi('04 - fetch shop')
    await fetchShop.exec()

  } catch(e) {
    console.error(e)
  }

  
  
  logi('99 - disconnect - db')
  await global.dbConnection.end();
}




clear()
run();
