// View Comments
$(document).on("click", ".view-comments", function(event) {
	event.preventDefault();

	const thisId = $(this).attr("data-id");
	console.log(thisId);

	$.ajax({
			method: "GET",
			url: "/articles/" + thisId
		}).then(data => {
			console.log(data)
			for (let i = 0; i < data.comments.length; i++) {
				$(".commenter-name").append(data.comments[i].name);
				$(".comment-date").append("<em>" + moment(data.comments[i].date).format("MMMM Do YYYY LT") + "</em>");
				$(".comment-body").append(data.comments[i].body);
				$(".comment-modal-content").append("<button data-id='" + data.comments[i]._id + "' class='delete-note'>Delete Note</button>");
			}
		});

	$(".comment-modal").css("display", "block");
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

	$(".name-input").val("");
	$(".body-input").val("");
});

// Delete Comment
$(document).on("click", ".delete-comment", function(event) {
	event.preventDefault();
	const thisId = $(this).attr("data-id");

	$.ajax({
		method: "DELETE",
		url: "/articles/" + thisId
	}).then(

	)
})