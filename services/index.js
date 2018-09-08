const dbConnection = require('./db-connection')
const fetchCategory = require('./fetch-category')
const fetchProduct = require('./fetch-product')

module.exports = {
  dbConnection,
  fetchCategory,
  fetchProduct
}