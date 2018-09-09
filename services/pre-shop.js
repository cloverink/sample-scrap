const request = require("request-promise")
const {get} = require('lodash/fp')

module.exports.exec = async () => {
  logg('>> pre shop .... [START]')

  const shops = await global.dbConnection.query(`select distinct shopid from products order by shopid`)

  for(shop of shops) {
    const _shops = await global.dbConnection.query(`select * from shops where shopid=${shop.shopid}`)
    if (_shops.length === 0) {
      const href = `https://shopee.co.th/shop/${shop.shopid}`
      await global.dbConnection.query(`insert into shops(shopid, href) values(${shop.shopid}, '${href}')`)
    }
  }


  logg('>> pre shop .... [DONE]')
}
