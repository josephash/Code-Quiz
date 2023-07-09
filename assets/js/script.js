$(document).ready(function () {
	$("#quiz").hide();
	let countDownEnd;
	let correct = 0;
	let wrong = 0;
	$("#start").click(function () {
		$(this).hide();
		$("#quiz").show();
		countDownEnd = new Date().getTime() + (1000 * 60);
		let timer = setInterval(function () {
			var now = new Date().getTime();
			var dif = countDownEnd - now;
			var minutes = Math.floor(dif / (1000 * 60));
			dif -= minutes * (1000 * 60);
			var seconds = Math.floor(dif / 1000);
			$("#timer").html(minutes + ":" + seconds);
			$("#correct").html("Correct: " + correct.toString());
			$("#wrong").html(" Wrong: " + wrong.toString());
			$("#score").html("Score: " + (correct - wrong).toString());
			if (dif < 0 || countDownEnd < now) {
				$("#timer").html("0:00");
				clearInterval(timer);
			}
		}, 10);
	});
	$(".wrong").click(function () {
		countDownEnd -= 1000 * 10;
		wrong++;
	});
	$(".right").click(function () {
		correct++;
	});
});