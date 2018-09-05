const request = require("request-promise")
const cheerio = require("cheerio")

const test = async() => {
  
  const options = {
    uri: 'http://cloverink.com',
    json: true,
    transform: body => cheerio.load(body)
  }

  const $ = await request(options)
  console.log($(".name").text())

}


test();