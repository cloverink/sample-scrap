const puppeteer = require('puppeteer');
const cheerio = require("cheerio")

const { SITE_TARGET, AGENT } = process.env

const robot = async (url) => {
  const browser = await puppeteer.launch({
    userDataDir: __dirname + '/test-profile-dir',
    headless: false
  });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', request => {
    const isAboutType = ['image', 'xhr', 'stylesheet'].includes(request.resourceType())
    const isAboutLink = request.url().includes('facebook') || request.url().includes('google')
    if (isAboutType || isAboutLink) {
      request.abort();
    } else {
    }
    request.continue();
  });

  page.on('load', o => { 
    clickNextPage(page)
  });

  await page.goto(url, {
    "waitUntil": "networkidle0"
  });

  // await clickNextPage(page)

  // page.click('.shopee-icon-button--right')

  // const cats = $(".home-category-list__category-grid")
  // for (let i = 0; i < cats.length; i++) {
  //   const cat = cats[i]
  //   const href = SITE_TARGET + decodeURIComponent($(cat).attr('href'))
  //   const sql = `insert into categories(href) values('${href}')`
  //   await global.dbConnection.query(sql)
  // }
  // await browser.close();
  // return next
}

const clickNextPage = async(page) => {

  log('clickNextPage')

  const html = await page.content();
  const $ = cheerio.load(html)
  const paging = $('.shopee-page-controller .shopee-button-solid--primary + button')
  const next = !paging.hasClass('shopee-icon-button--right')

  await page.click('.shopee-icon-button--right')

  await clickNextPage(page)
  

}

const checkPage = async (catid, href, page) => {
  const url = `${href}?page=${page}`
  logy(`    > fetch .... ${url} `)

  const pages = await global.dbConnection.query(`select * from pages where catid=${catid} & page=${page}`)
  
  if(pages.length > 0) {
    await checkPage(catid, href, page + 1)
  } else {
    const next = await robot(url)
    // await global.dbConnection.query(`insert into pages(catid, page, href) values('${catid}','${page}','${url}')`)
    // if(!next) return
    // await checkPage(catid, href, page + 1)
  }
  
}

const checkCategory = async() => {
  const cats = await global.dbConnection.query('select * from categories where flag = 0 limit 1')
 
  if(cats.length > 0) {
    const {catid, href} = cats[0]
    logyy(`>>  fetch CATEGORY ${catid}... [START]`)
    logy(`    > fetch .... ${href}`)
    await checkPage(catid, href, 0)
    // await global.dbConnection.query(`update categories set flag=1 where catid=${catid}`)
    // await checkCategory()
  } else {
    logyy('>>  fetch CATEGORY ... [Done]')
    return 
  }
}


module.exports.exec = async () => {
  logg('>> fetch product .... [START]')
  await checkCategory()
  logg('>> fetch product .... [DONE]')
}
