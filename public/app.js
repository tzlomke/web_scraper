// Scrape New Articles
$(document).on("click", "#scrape", function(event) {
	event.preventDefault();

	$.ajax({
		method: "GET",
		url: "/scrape"
	}).then(() => {
		window.location.href = "/"
	});
});

// View Comments
$(document).on("click", ".view-comments", function(event) {
	event.preventDefault();

	const thisId = $(this).attr("data-id");
	console.log(thisId);
	$(".comment-modal-content-" + thisId).empty();

	$.ajax({
			method: "GET",
			url: "/articles/" + thisId
		}).then(data => {
			console.log(data)
			for (let i = 0; i < data.comments.length; i++) {
				$(".comment-modal-content-" + thisId).append("<h6 class='commenter-name'>Name: </h6><p class='comment-date'></p><p class='comment-body'></p>");
				$(".commenter-name").append(data.comments[i].name);
				$(".comment-date").append("<em>" + moment(data.comments[i].date).format("MMMM Do YYYY LT") + "</em>");
				$(".comment-body").append(data.comments[i].body);
				$(".comment-modal-content-" + thisId).append("<button data-id='" + thisId + "' data-comment-id='" + data.comments[i]._id + "' class='delete-note btn btn-warning'>Delete Comment</button>");
			}
		});

	$("#modal-container-" + thisId).css("display", "block");

	$(".close-modal-button").on("click", function(event) {
		event.preventDefault();

		$("#modal-container-" + thisId).css("display", "none");
	});
});

// Post Comment
$(document).on("click", ".post-comment", function(event) {
	event.preventDefault();

	const thisId = $(this).attr("data-id");
	console.log(thisId);

	$.ajax({
		method: "POST",
		url: "/articles/" + thisId,
		data: {
			name: $(".name-input-" + thisId).val(),
			body: $(".body-input-" + thisId).val()
		}
	}).then(data => {
		console.log(data)
	});

	$(".name-input-" + thisId).val("");
	$(".body-input-" + thisId).val("");
});

// Delete Comment
$(document).on("click", ".delete-note", function(event) {
	event.preventDefault();
	const thisId = $(this).attr("data-id");
	const commentId = $(this).attr("data-comment-id");

	$.ajax({
		method: "PUT",
		url: "/articles/" + thisId,
		data: {
			commentId: commentId
		}
	}).then(
		window.location.href = "/"
	);
});