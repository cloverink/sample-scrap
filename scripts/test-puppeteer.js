const puppeteer = require('puppeteer');
const cheerio = require("cheerio")

const run = async () => {
  const browser = await puppeteer.launch({
    userDataDir: __dirname + '/test-profile-dir'
  });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', request => {
    const isAboutType = ['image', 'xhr'].includes(request.resourceType())
    const isAboutLink = request.url().includes('facebook') 
      || request.url().includes('//dis.as')
      || request.url().includes('//sslwidget')
      || request.url().includes('google')
      || request.url().includes('getCsrfToken')

    if (isAboutType || isAboutLink) {
      request.abort();
    } else {
      request.continue();
    }
  });

  page.on('load', o => {
    console.log('page loaded')
  });

  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
  await page.goto('https://www.lazada.co.th/shop-mobiles/', { "waitUntil": "networkidle0" });

  const bodyHandle = await page.$('body');
  const html = await page.evaluate(body => body.innerHTML, bodyHandle);
  await bodyHandle.dispose();

  const $ = cheerio.load(html)

  const title = $("ul.ant-pagination li").eq(-2).text()
  console.log(title)

  await browser.close();
}

run()