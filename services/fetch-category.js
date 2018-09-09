const request = require("request-promise")
const {get} = require('lodash/fp')

const { SITE_TARGET } = process.env

module.exports.exec = async () => {
  logg('>> fetch category .... [START]')

  const options = {
    method: 'GET',
    url: 'https://shopee.co.th/api/v1/category_list/',
    json: true
  }
  
  const cats = await request(options)
  
  for(cat of cats) {
    const { catid, display_name } = get('main')(cat)
    const href = `${SITE_TARGET}/${display_name}-cat.${catid}`
    logy(`  > category .... ${catid} ${display_name}`)

    const _cats = await global.dbConnection.query(`select * from categories where catid=${catid}`)
    if(_cats.length === 0) {
      await global.dbConnection.query(`insert into categories(catid, href, name) values(${catid}, '${href}', '${display_name}')`)
    }

  }
  
  logg('>> fetch category .... [DONE]')
}
