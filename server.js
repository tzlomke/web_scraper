const express = require("express");
const logger = require("morgan");
const mongojs = require("mongojs");
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

// Custom CSS and JS Served to Handlebars
const path = require("path");
app.use(express.static(path.join(__dirname, "/public")));

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
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/web_scraper";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true}).catch(err => {console.log(err)});

// Routes

// Scrape NYT Articles
app.get("/scrape", (req, res) => {
	axios.get("https://www.nytimes.com/").then(response => {
		const $ = cheerio.load(response.data);


		$("article.css-8atqhb").each((i, element) => {
			let result = {}

			let title = $(element).find("h2").text();
			let link = $(element).find("a").attr("href");
			let summary = $(element).find("p").text();
			let image = $(element).find("img").attr("src");

			result.title = title;
			result.link = link;
			result.summary = summary;
			result.image = image;

			db.Article.create(result)
				.then(dbArticle => console.log(dbArticle[0]))
				.catch(err => console.log(err));
		});

		res.send("Scrape complete");
	});
});

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
	console.log(req.body);

	db.Comment.create(req.body)
		.then(function(dbComment) {
			return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: dbComment._id } }, { new: true});
		})
		.then(function(dbArticle) {
			res.json(dbArticle);
		})
		.catch(function(err) {
			res.json(err)
		});
});

// Delete Comments from Article
app.put("/articles/:id", (req, res) => {
	console.log(req.body);
	db.Article.updateOne(
		{
			_id: mongojs.ObjectId(req.params.id)
		},
		{
			$pull: {
				comments: req.body.commentId
			}
		},
		function(error, edited) {
			if (error) {
				console.log(error);
				res.send(error);
			} else {
				console.log(edited);
				res.send(edited)
			}
		}
	);
});

// Index Page
app.get("/", (req, res) => {
	db.Article.find({})
		.limit(20)
		.populate("comments")
		.then(dbArticle => {
			let articles = dbArticle;
			res.render("index", { articles: articles })
		});
});

// Server Start
app.listen(PORT, () => console.log("App running on port " + PORT + "."));