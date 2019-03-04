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
	$("#comment-form-id-" + thisId).css("display", "block");
	$("#close-modal-button-id-" +thisId).css("display", "block");
	$(".comment-modal-content-" + thisId).empty();

	$.ajax({
			method: "GET",
			url: "/articles/" + thisId
		}).then(data => {
			console.log(data)
			for (let i = 0; i < data.comments.length; i++) {
				$(".comment-modal-content-" + thisId).append(
					"<div class='comment-container'>" +
					"<div class='row'><div class='col-9 name-column-index-" + [i] + "'></div><div class='col-3 date-column-index-" + [i] + "'></div></div>" +
					"<div class='row'><div class='col-9 comment-body-index-" + [i] + "'></div><div class='col-3 delete-comment-index-" + [i] + "'></div></div>" +
					"</div>"
				);
				
				$(".comment-container").css("border-bottom", "1px solid #DBDBDB");
				$(".comment-container").css("padding", "2px");
				$(".name-column-index-" + [i]).append("<h6 class='commenter-name-index-" + [i] + "'>" + data.comments[i].name + "</h6>");
				$(".date-column-index-" + [i]).append("<p><em>" + moment(data.comments[i].date).format("MMMM Do YYYY LT") + "</em></p>");
				$(".comment-body-index-" + [i]).append("<p>" + data.comments[i].body + "</p>")
				$(".delete-comment-index-" + [i]).append("<button data-id='" + thisId + "' data-comment-id='" + data.comments[i]._id + "' class='delete-comment btn btn-sm btn-danger'>Delete</button>");
			}
		});

	$("#modal-container-" + thisId).css("display", "block");

	$("#close-modal-button-id-" + thisId).on("click", function(event) {
		event.preventDefault();

		$(".comment-modal-content-" + thisId).empty();
		$("#close-modal-button-id-" + thisId).css("display", "none");
		$("#comment-form-id-" + thisId).css("display", "none");
	});
});

// Post Comment
$(document).on("click", ".post-comment", function(event) {
	event.preventDefault();

	const thisId = $(this).attr("data-id");
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
			$(".comment-modal-content-" + thisId).append(
				"<div class='comment-container'>" +
				"<div class='row'><div class='col-9 name-column-index-" + [i] + "'></div><div class='col-3 date-column-index-" + [i] + "'></div></div>" +
				"<div class='row'><div class='col-9 comment-body-index-" + [i] + "'></div><div class='col-3 delete-comment-index-" + [i] + "'></div></div>" +
				"</div>"
			);
			
			$(".comment-container").css("border-bottom", "1px solid #DBDBDB");
			$(".comment-container").css("padding", "2px");
			$(".name-column-index-" + [i]).append("<h6 class='commenter-name-index-" + [i] + "'>" + data.comments[i].name + "</h6>");
			$(".date-column-index-" + [i]).append("<p><em>" + moment(data.comments[i].date).format("MMMM Do YYYY LT") + "</em></p>");
			$(".comment-body-index-" + [i]).append("<p>" + data.comments[i].body + "</p>")
			$(".delete-comment-index-" + [i]).append("<button data-id='" + thisId + "' data-comment-id='" + data.comments[i]._id + "' class='delete-comment btn btn-sm btn-danger'>Delete</button>");
		}
	}));

	$("#close-modal-button-id-" + thisId).on("click", function(event) {
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