const puppeteer = require('puppeteer');
const cheerio = require("cheerio")
const {log} = console

// https://shopee.co.th/shop/11253342

const url = "https://shopee.co.th/api/v2/search_items/?by=pop&limit=50&match_id=48&newest=50&order=desc&page_type=search"
const run = async () => {
  const browser = await puppeteer.launch({
    userDataDir: __dirname + '/test-profile-dir',
    headless: false
  });
  const page = await browser.newPage();
  await page.setRequestInterception(true);

  await page.goto(url, { 
    "waitUntil": "networkidle0"
  });

  const json = await page.content()
  log(json)

  // await browser.close();
}

const nextPage = async (browser, url) => {
  const page = await browser.newPage();

}

console.clear()
run()