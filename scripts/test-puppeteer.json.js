const puppeteer = require('puppeteer');
const cheerio = require("cheerio")
const fs = require('fs')

const {log} = console

const run = async () => {
  const browser = await puppeteer.launch({
    userDataDir: __dirname + '/test-profile-dir',
    headless: false
  });

  const shops = ['10758', '11253342']

  for(shop of shops) {
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

    await page.goto(`https://shopee.co.th/shop/${shop}`);

    await page.waitForSelector('.shop-page__info')
    const bodyHandle = await page.$('.shop-page__info');
    const html = await page.evaluate(body => body.innerHTML, bodyHandle);
    await bodyHandle.dispose();

    const $ = cheerio.load(html)
    const shop_name = $('.section-seller-overview-horizontal__portrait-name').text()

    log(shop, shop_name)

    await page.close()
  }

  await browser.close();
}

run()