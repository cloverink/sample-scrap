const puppeteer = require('puppeteer');
const cheerio = require("cheerio")

const { SITE_TARGET, AGENT } = process.env

const robot = async() => {
  const browser = await puppeteer.launch({
    userDataDir: __dirname + '/test-profile-dir',
    headless: true
  });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', request => {
    const isAboutType = ['image', 'xhr'].includes(request.resourceType())
    const isAboutLink = request.url().includes('facebook') || request.url().includes('google')
    if (isAboutType || isAboutLink) {
      request.abort();
    } else {
      request.continue();
    }
  });

  page.on('load', o => {
    logy('page loaded')
  });

  await page.goto(SITE_TARGET, {
    "waitUntil": "networkidle0"
  });

  const bodyHandle = await page.$('body');
  const html = await page.evaluate(body => body.innerHTML, bodyHandle);
  await bodyHandle.dispose();

  const $ = cheerio.load(html)

  const cats = $(".home-category-list__category-grid")
  for(let i=0; i < cats.length; i++) {
    const cat = cats[i]
    const href = SITE_TARGET + decodeURIComponent($(cat).attr('href'))
    const sql = `insert into categories(href) values('${href}')`
    await global.dbConnection.query(sql)
  }
  await browser.close();
}


module.exports.exec = async () => {
  logg('>> fetch category .... [START]')

  await robot()

  logg('>> fetch category .... [DONE]')
}

