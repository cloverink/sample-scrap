const puppeteer = require('puppeteer');
const cheerio = require("cheerio")

const robot = async(browser, shopid) => {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', request => {
    const isAboutType = ['image'].includes(request.resourceType())
    if (isAboutType) {
      request.abort();
    } else {
      request.continue();
    }
  });

  await page.goto(`https://shopee.co.th/shop/${shopid}`, {
    "waitUntil": "networkidle0"
  });

  await page.waitForSelector('.shop-page__info')
  const bodyHandle = await page.$('.shop-page__info');
  const html = await page.evaluate(body => body.innerHTML, bodyHandle);
  await bodyHandle.dispose();

  const $ = cheerio.load(html)
  const shop_name = $('.section-seller-overview-horizontal__portrait-name').text()
  const shop_options = $('.section-seller-overview-horizontal__seller-info-list > div')

  let options = []

  shop_options.each((k, v) => {
    const op = $(v).find('.section-seller-overview__item-text-value').first().text()
    options.push(op)
  })

  let checkRate = (options[6] || '').split(' ')
  let _rate = ''
  let _vote = ''
  if (checkRate.length === 5) {
    _rate = checkRate[0]
    _vote = checkRate.pop().replace(')', '')
  } else {
    _rate = (options[6] || '')
  }

  const name = shop_name
  const answer = options[0] || ''
  const items = options[1] || ''
  const following = options[2] || ''
  const reaction = options[3] || ''
  const regis = options[4] || ''
  const follower = options[5] || ''
  const rate = _rate
  const vote = _vote
  const deliver = options[7] || ''

  const sql = `update shops set name=${dbConnection.escape(name)}, answer='${answer}', items='${items}', following='${following}', reaction='${reaction}', regis='${regis}', follower='${follower}', rate='${rate}', vote='${vote}', deliver='${deliver}', flag=1 where shopid=${shopid}`
  await global.dbConnection.query(sql)
  await page.close()
}

const checkShop = async (browser) => {
  const _shops = await global.dbConnection.query('select * from shops where flag = 0 limit 1')
  if(_shops.length === 0) return
  const remain = await global.dbConnection.query('select count(*) cnt from shops where flag=0')
  logy(`  > shop .... ${_shops[0].shopid} from ${remain[0].cnt}`)
  await robot(browser, _shops[0].shopid)
  await checkShop(browser)
}


module.exports.exec = async () => {
  logg('>> fetch shop .... [START]')

  const browser = await puppeteer.launch({
    userDataDir: __dirname + '/test-profile-dir',
    headless: true
  });

  await checkShop(browser)
  await browser.close();

  logg('>> fetch shop .... [DONE]')
}
