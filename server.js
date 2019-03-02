const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

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

// Routes
app.get("/scrape", (req, res) => {
	axios.get("").then(response => {
		const $ = cheerio.load(response.data);

		// <Insert Site-Specific Scraping Program Here>

		db.Article.create(result)
		.then(dbArticle => console.log(dbArticle))
		.catch(err => console.log(err));
	});

	res.send("Scrape complete");
});

// Get All Articles
app.get("/articles/", (req, res) => {
	db.Article.find({})
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
		.then(dbNote => {
			return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
		})
		.then(dbArticle => res.json(dbArticle))
		.catcfh(err => res.json(err));
});

// Database Connection
mongoose.connect("mongodb://localhost/web_scraper", { useNewUrlParser: true});

// Routes

// Server Start
app.listen(PORT, () => console.log("App running on port " + PORT + "."));