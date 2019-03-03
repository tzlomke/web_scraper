// View Comments
$(document).on("click", ".view-comments", function() {
	var thisId = $(this).attr("data-id");
	console.log(thisId);

	$.ajax({
			method: "GET",
			url: "/articles/" + thisId
		}).then(data => {
			console.log(data)
			for (let i = 0; i < data.length; i++) {
				$("#comments").append("<p><strong>" + data[i].name + "</strong></p>");
				$("#comments").append("<p><em>" + moment(data[i].date).format("YYYY-MM-DD HH:mm:ss"));
				$("#comments").append("<p>" + data[i].body + "</p>");
				$("#comments").append("<button data-id='" + data._id + "' class='delete-note'>Delete Note</button>");
			}
		})
});

// Post Comment
$(document).on("click", ".post-comment", function() {
	event.preventDefault();
	let thisId = $(this).attr("data-id");
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

	$(".title-input").val("");
	$(".body-input").val("");
})