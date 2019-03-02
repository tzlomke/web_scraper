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

mongoose.connect("mongodb://localhost/web_scraper", { useNewUrlParser: true});

// Routes

// Server Start
app.listen(PORT, () => console.log("App running on port " + PORT + "."));