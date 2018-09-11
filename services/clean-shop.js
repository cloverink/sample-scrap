const request = require("request-promise")
const {get} = require('lodash/fp')


const checkShop = async() => {
  
  const shops = await global.dbConnection.query(`select * from shops where flag = 1 limit 1`)
  const cnt = await global.dbConnection.query('select count(*) cnt from shops where flag = 1')
  if (shops.length === 0) return

  const shopid = shops[0].shopid
  const sql = `select c.catid, c.name, c.href from products p left join categories c on p.catid = c.catid where p.shopid = ${shopid} limit 1`
  const cats = await await global.dbConnection.query(sql)

  const {catid, name, href} = cats[0]
  logy(` > shop: ${shopid} -- catid: ${catid} -- remain ${cnt[0].cnt}`)

  await global.dbConnection.query(`update shops set catid=${catid}, catname='${name}', cathref='${href}', flag=2 where shopid = ${shopid}`)
  await checkShop()
  
  // const sql = "select ss.shopid, c.catid, c.name, c.href from (select s.shopid, p.catid from(select * from shops where flag = 1 limit 1) s left join products p on p.shopid = s.shopid limit 1) ss left join categories c on ss.catid = c.catid"
  // const cats = await global.dbConnection.query(sql)
  // const {shopid, catid, name, href} = cats[0]

  // logy(` > shop: ${shopid} -- catid: ${catid}`)

  // await global.dbConnection.query(`update shops set catid=${catid}, catname='${name}', cathref='${href}', flag=2 where shopid = ${shopid}`)
  // await checkShop()

}


module.exports.exec = async () => {
  logg('>> pre shop .... [START]')

  await checkShop();

  logg('>> pre shop .... [DONE]')
}
