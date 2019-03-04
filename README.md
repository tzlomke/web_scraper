# web_scraper
This web scraper is a full-stack application created in order to scrape and discuss articles from the New York Times.

The application is built on a Node.js/Express platform and uses Mongoose to power its NoSQL database. Cheerio.js and Axios work in conjunction to scrape articles from the https://nytimes.com and store the articles to the database. Users can freely comment and dicuss each article. Each comment is stored in the database and is tied to the article being discussed. Any comment can be deleted.

Future iterations of this web scraper will incorporate user authentication so that names are automatically saved upon commenting and only comments created by the authenticated user can be deleted.

## Deployed Application
https://shielded-ocean-62808.herokuapp.com/

## Motivation for Development
The New York Times web scraper project was an opportunity to familiarize myself with NoSQL databases in general, MongoDB specifically, and Mongoose as an ORM.

### Technologies and Dependencies
- axios
- cheerio
- express
- express-handlebars
- mongojs
- mongoose
- morgan
- path

### Author
Taylor Zlomke | https://github.com/tzlomke/