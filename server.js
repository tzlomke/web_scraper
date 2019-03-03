const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

// Scraping Tools
const axios = require("axios");
const cheerio = require("cheerio");

// Database Models
const db = require("./models");

const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
	"handlebars",
	exphbs({
		defaultLayout: "main"
	})
);
app.set("view engine", "handlebars");

// Database Connection
mongoose.connect("mongodb://localhost/web_scraper", { useNewUrlParser: true});

// Routes
app.get("/scrape", (req, res) => {
	axios.get("https://www.nytimes.com/trending").then(response => {
		const $ = cheerio.load(response.data);


		$("article.css-8atqhb").each((i, element) => {
			let result = {}

			let title = $(element).find("h2").text();
			let link = $(element).find("a").attr("href");
			let summary = $(element).find("p").text();
		})
		// $("article.css-16cbw64").each((i, element) => {
		// 	let result = {};

		// 	let image = $(element).find("img.css-8atqhb").attr("src");
		// 	let title = $(element).find("h2").text();
		// 	let link = $(element).find("a.css-1tr2g77").attr("href");
			
		// 	result.image = image;
		// 	result.title = title;
		// 	result.link = link;

		// 	db.Article.create(result)
		// 		.then(dbArticle => console.log(dbArticle))
		// 		.catch(err => console.log(err));
		// });

		// $("li.css-1iski2w").each((i, element) => {
		// 	let result = {};

		// 	let image = $(element).find("img").attr("src");
		// 	let title = $(element).find("h1").text();
		// 	let link = $(element).children("a").attr("href");

		// 	result.image = image;
		// 	result.title = title;
		// 	result.link = link;

		// 	db.Article.create(result)
		// 		.then(dbArticle => console.log(dbArticle))
		// 		.catch(err => console.log(err));
		// });

		res.send("Scrape complete");
	});
});

// Routes
// Get All Articles
app.get("/articles/", (req, res) => {
	db.Article.find({})
		.populate("comments")
		.then(dbArticle => res.json(dbArticle))
		.catch(err => res.json(err));
});

// Get Article by ID
app.get("/articles/:id", (req, res) => {
	db.Article.findOne({ _id: req.params.id })
		.populate("comments")
		.then(dbArticle => res.json(dbArticle))
		.catch(err => res.json(err));
});

// Post Comments to Article
app.post("/articles/:id", (req, res) => {
	db.Comment.create(req.body)
		.then(dbComment => {
			return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { comment: dbComment._id } }, { new: true });
		})
		.then(dbArticle => res.json(dbArticle))
		.catcfh(err => res.json(err));
});

// Index Page
app.get("/", function(req, res) {
	db.Article.find({}).limit(10)
		.populate("comments")
		.then(dbArticle => {
			let articles = dbArticle;
			console.log(articles);
			res.render("index", { articles: articles })
		});
});

// Server Start
app.listen(PORT, () => console.log("App running on port " + PORT + "."));