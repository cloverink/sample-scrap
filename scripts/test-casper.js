var casper = require('casper').create();
casper.start('https://shopee.co.th/api/v2/search_items/?by=pop&limit=50&match_id=48&newest=50&order=desc&page_type=search');

casper.then(function () {
  casper.echo(casper.getPageContent());
});

console.log(123)
casper.run();