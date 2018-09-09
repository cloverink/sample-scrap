const phantom = require('phantom');

(async function () {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function (requestData) {
    console.info('Requesting', requestData.url);
  });

  const url = 'https://shopee.co.th/api/v2/search_items/?by=pop&limit=50&match_id=48&newest=50&order=desc&page_type=search'
  const status = await page.open(url);
  const content = await page.property('content');
  console.log(content);

  await instance.exit();
})();