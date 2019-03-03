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
	$("#comment-form-id-" + thisId).css("display", "block");
	$("#close-modal-button-id-" +thisId).css("display", "block");
	$(".comment-modal-content-" + thisId).empty();

	$.ajax({
			method: "GET",
			url: "/articles/" + thisId
		}).then(data => {
			console.log(data)
			for (let i = 0; i < data.comments.length; i++) {
				$(".comment-modal-content-" + thisId).append("<h6 class='commenter-name-index-" + [i] + "'></h6><p class='comment-date-index-" + [i] + "'></p><p class='comment-body-index-" + [i] + "'></p>");
				$(".commenter-name-index-" + [i]).append(data.comments[i].name);
				$(".comment-date-index-" + [i]).append("<em>" + moment(data.comments[i].date).format("MMMM Do YYYY LT") + "</em>");
				$(".comment-body-index-" + [i]).append(data.comments[i].body);
				$(".comment-modal-content-" + thisId).append("<button data-id='" + thisId + "' data-comment-id='" + data.comments[i]._id + "' class='delete-comment btn btn-sm btn-warning'>Delete Comment</button>");
			}
		});

	$("#modal-container-" + thisId).css("display", "block");

	$(".close-modal-button").on("click", function(event) {
		event.preventDefault();

		$(".comment-modal-content-" + thisId).empty();
		$(".close-modal-button").css("display", "none");
		$(".comment-form").css("display", "none");
	});
});

// Post Comment
$(document).on("click", ".post-comment", function(event) {
	event.preventDefault();

	const thisId = $(this).attr("data-id");
	console.log(thisId);

	$(".comment-modal-content-" + thisId).empty();

	$.ajax({
		method: "POST",
		url: "/articles/" + thisId,
		data: {
			name: $(".name-input-" + thisId).val().trim(),
			body: $(".body-input-" + thisId).val().trim()
		}
	}).then(data => {
		console.log(data)
	}).then($.ajax({
		method: "GET",
		url: "/articles/" + thisId
	}).then(data => {
		console.log(data)
		for (let i = 0; i < data.comments.length; i++) {
			$(".comment-modal-content-" + thisId).append("<h6 class='commenter-name-index-" + [i] + "'></h6><p class='comment-date-index-" + [i] + "'></p><p class='comment-body-index-" + [i] + "'></p>");
			$(".commenter-name-index-" + [i]).append(data.comments[i].name);
			$(".comment-date-index-" + [i]).append("<em>" + moment(data.comments[i].date).format("MMMM Do YYYY LT") + "</em>");
			$(".comment-body-index-" + [i]).append(data.comments[i].body);
			$(".comment-modal-content-" + thisId).append("<button data-id='" + thisId + "' data-comment-id='" + data.comments[i]._id + "' class='delete-comment btn btn-warning'>Delete Comment</button>");
		}
	}));

	$(".close-modal-button").on("click", function(event) {
		event.preventDefault();

		$(".comment-modal-content-" + thisId).empty();
	});

	$(".name-input-" + thisId).val("");
	$(".body-input-" + thisId).val("");
});

// Delete Comment
$(document).on("click", ".delete-comment", function(event) {
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