const request = require("request-promise")
const {get} = require('lodash/fp')

const AGENT = process.env.AGENT
const PAGE_SIZE = +process.env.PAGE_SIZE

const checkProduct = async(catid, index) => {
  const page = index/PAGE_SIZE
  logm(`    > product .... page ${page} ${index}`)
  if(index >= 10000) return

  const options = {
    method: 'GET',
    url: 'https://shopee.co.th/api/v2/search_items/',
    qs: {
      by: 'pop',
      limit: PAGE_SIZE,
      match_id: catid,
      newest: index,
      order: 'desc',
      page_type: 'search'
    },
    headers: {
      'user-agent': AGENT
    },
    json: true
  }

  const products = await request(options)
  const items = get('items')(products)
  if(items.length === 0) return

  for(item of items) {
    const { name, shopid, itemid } = item

    const _products = await global.dbConnection.query(`select * from products where pid=${itemid}`)
    if (_products.length === 0) {
      await global.dbConnection.query(`insert into products(pid, catid, shopid, page, name) values(${itemid}, ${catid}, ${shopid}, ${page}, ${dbConnection.escape(name)})`)
    }
  }
  await checkProduct(catid, index + PAGE_SIZE)
}

const checkCategory = async() => {
  const cats = await global.dbConnection.query('select * from categories where flag = 0 limit 1')
 
  if(cats.length > 0) {
    const {catid, href} = cats[0]
    logy(`  > category .... ${catid} ${href}`)
    await checkProduct(catid, 0)
    await global.dbConnection.query(`update categories set flag=1 where catid=${catid}`)
    await checkCategory()
  } else {
    return 
  }
}


module.exports.exec = async () => {
  logg('>> fetch product .... [START]')
  await checkCategory()
  logg('>> fetch product .... [DONE]')
}
