const request = require("request-promise")
const cheerio = require("cheerio")
const mysql = require('promise-mysql')

const { log, clear } = console
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env



const save = async (query) => {

  log('saving...')

  const connection = await mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASS,
    database: MYSQL_DB
  })

  
  for (q of query) {
    await connection.query(q);
  }

  await connection.end();
}

const run = async () => {

  log('fetch...')

  const options = {
    uri: 'https://www.lazada.co.th',
    json: true,
    transform: body => cheerio.load(body)
  }

  const $ = await request(options)
  const datacat = $("li[data-cate]")  
  let query = []

  datacat.each((k, cat) => {
    const catid = $(cat).attr('data-cate')
    const href = $(cat).find('> a').attr('href').trim()
    const name = $(cat).find('> a > span').text().trim()
    query.push(`insert into categories(level, href, name) values('${catid}','${href}','${name}')`)
    // const subcat = $(datacat).find(`[data-spm="${catid}"]`)
    // if (subcat.length === 0) return

    // const subcats = subcat.find('a[href]')
    // subcats.each((kk, scat) => {
    //   const scatid = `${catid}_${kk + 1}`
    //   const shref = $(scat).attr('href').trim()
    //   const sname = $(cat).find('> span').text().trim()
    //   query.push(`insert into categories(level, href, name) values('${scatid}','${shref}','${sname}')`)
    // })
  });


  
  await save(query)
  
}

clear()
run();
