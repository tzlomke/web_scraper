// $(document).on("click", ".viewComments", () => {
// 	var thisId = $(this).attr("data-id");
// });

$(".post-comment").on("click", (event) => {
	event.preventDefault();
	var thisId = $(this).attr("data-id");
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
});