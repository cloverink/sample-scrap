const phantom = require('phantom');

(async function () {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function (requestData) {
    console.info('Requesting', requestData.url);
  });

  const url = 'https://shopee.co.th/shop/11253342'
  const status = await page.open(url);
  const content = await page.property('content');
  // console.log(content);

  page.onLoadFinished = function (status) {
    page.render('screenshot.png');
    phantom.exit();
  };

  // await instance.exit();
})();