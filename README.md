# recipe-scraper
a scraper for retrieving recipes from the interwebs  

[![CircleCI](https://circleci.com/gh/Wi150nZ/recipe-scraper.svg?style=shield)](https://circleci.com/gh/Wi150nZ/recipe-scraper)

## architectural design of the scraper
The overall design of the scraper aims to be as modular as possible, allowing for ease of adding more websites to scrape from and for debugging. Each unique domain will have its own middleware that will contain the logic for performing the scraping, which comes from the route passing the html data.

## supported domains
- `https://spendwithpennies.com`
- `https://tasteofhome.com`

## todo
- reduce overhead from opening and closing chromium
  - ideally we should have one instance of chromium and only closing chromium when the application closes
- unit testing
- machine learning???
