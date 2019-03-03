const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	name: {
		type: String,
		required: true
	},

	body: {
		type: String,
		required: true
	},
	
	date: {
		type: Date,
		default: Date.now
	}
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;