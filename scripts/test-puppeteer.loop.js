const puppeteer = require('puppeteer');
const cheerio = require("cheerio")
const {log} = console

// https://shopee.co.th/shop/11253342

const url = "https://shopee.co.th/เสื้อผ้าแฟชั่นผู้ชาย-cat.48?page=0"
const run = async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 926 });
  await page.setRequestInterception(true);
  page.on('request', request => {
    const isAboutType = ['image'].includes(request.resourceType())
    const isAboutLink = request.url().includes('facebook') || request.url().includes('google')
    if (isAboutType || isAboutLink) {
      request.abort();
    } else {
      request.continue();
    }
  });

  await page.goto(url, { 
    "waitUntil": "networkidle0"
  });

  // await page.waitForSelector('.shopee-search-item-result')

  log('xx')

  const bodyHandle = await page.$('.shopee-search-item-result');
  const html = await page.evaluate(body => body.innerHTML, bodyHandle);
  await bodyHandle.dispose();

  const $ = cheerio.load(html)
  const paging = $('.shopee-page-controller .shopee-button-solid--primary + button')

  log(paging.html())

  const next = !paging.hasClass('shopee-icon-button--right')
  await page.click('.shopee-icon-button--right')

  // await browser.close();
}

const nextPage = async (browser, url) => {
  const page = await browser.newPage();

}

console.clear()
run()