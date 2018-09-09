const request = require("request-promise")
const cheerio = require("cheerio")

const test = async() => {
  
  var options = {
    method: 'GET',
    url: 'https://shopee.co.th/api/v2/search_items/',
    qs: {
      by: 'pop',
      limit: '50',
      match_id: '48',
      newest: '0',
      order: 'desc',
      page_type: 'search'
    },
    headers: {
      'Cache-Control': 'no-cache',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
    }
  };
  const x = await request(options)
  console.log(x)

}


test();