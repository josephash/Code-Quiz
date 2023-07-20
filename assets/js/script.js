$(document).ready(function () {
	$("#quiz").hide();
	$("#end").hide();
	let countDownEnd;
	let correct = 0;
	let wrong = 0;
	let answer = null;
	let questions = [
		{
			question: "What is the capital of the United States?",
			correct: "Washington D.C.",
			wrong1: "New York",
			wrong2: "Los Angeles",
			wrong3: "Chicago"
		},
		{
			question: "What is the speed of light?",
			correct: "299,792,458 m/s",
			wrong1: "14,033 m/s",
			wrong2: "3,056,033 m/s",
			wrong3: "192,168,001,255 m/s"
		},
		{
			question: "How old is the universe?",
			correct: "13.8 billion years old",
			wrong1: "4.5 billion years old",
			wrong2: "790 million years old",
			wrong3: "1.3 trillion years old"
		}
	];
	let question = 0;
	correctDisplay = null;

	function randomList() {
		let olist = ["A", "B", "C", "D"];
		let rlist = [];
		for (let i = 0; i < 4; i++) {
			let rnum = Math.floor(Math.random() * olist.length);
			rlist.push(olist[rnum]);
			if (rnum > -1) {
				olist.splice(rnum, 1);
			}
		}
		return rlist;
	}
	function setupQuestion(questions, index) {
		let rlist = randomList();
		qDisplay = [null, null, null, null];
		qDisplay[rlist[0]] = questions[index].correct;
		qDisplay[rlist[1]] = questions[index].wrong1;
		qDisplay[rlist[2]] = questions[index].wrong2;
		qDisplay[rlist[3]] = questions[index].wrong3;
		correctDisplay = rlist[0];
		$("#question").html(questions[index].question);
		$("#text-A").html(qDisplay.A);
		$("#text-B").html(qDisplay.B);
		$("#text-C").html(qDisplay.C);
		$("#text-D").html(qDisplay.D);
		$("#correct").html("Correct: " + correct.toString());
		$("#wrong").html(" Wrong: " + wrong.toString());
		$("#score").html("Score: " + (correct - wrong).toString());
	}
	function grade(answer) {
		if (answer === null) {
			return;
		}
		if (answer === correctDisplay) {
			correct++;
		} else {
			wrong++;
		}
		answer = null;
		question++;
		if (question < questions.length) {
			setupQuestion(questions, question);
		} else {
			$("#quiz").hide();
			$("#end").show();
			$("#endtime").html("Time: " + $("#timer").html());
			$("#endcorrect").html("Correct: " + correct.toString());
			$("#endwrong").html("Wrong: " + wrong.toString());
			$("#endscore").html("Score: " + (correct - wrong).toString());
			if ($("#timer").html() == "0:00") {
				$("#endheader").html("Time's Up!");
			} else {
				$("#endheader").html("Finished!");
			}
		}
		return;
	}

	$("#start").click(function () {
		$(this).hide();
		$("#quiz").show();
		setupQuestion(questions, 0);
		let totalseconds = 5;
		let startminutes = Math.floor(totalseconds / 60).toString();
		let startseconds = (totalseconds % 60).toString();
		if (startseconds.length === 1) {
			startseconds = "0" + startseconds;
		}
		$("#timer").html(startminutes + ":" + startseconds);
		countDownEnd = new Date().getTime() + (1000 * totalseconds);
		let timer = setInterval(function () {
			var now = new Date().getTime();
			var dif = Math.round((countDownEnd - now) / 1000);
			var minutes = Math.floor(dif / 60);
			var seconds = Math.floor(dif % 60);
			seconds = seconds.toString();
			minutes = minutes.toString();
			if (seconds.length === 1) {
				seconds = "0" + seconds;
			}
			var time = minutes + ":" + seconds;
			$("#timer").html(time);
			if (time === "0:00" || dif < 0) {
				$("#quiz").hide();
				$("#end").show();
				$("#endtime").html("Time: " + time);
				$("#endcorrect").html("Correct: " + correct.toString());
				$("#endwrong").html("Wrong: " + wrong.toString());
				$("#endscore").html("Score: " + (correct - wrong).toString());
				if ($("#timer").html() == "0:00") {
					$("#endheader").html("Time's Up!");
				} else {
					$("#endheader").html("Finished!");
				}
				clearInterval(timer);
			}
		}, 1000);
	});
	$("#A").click(function () {
		grade("A");
	});
	$("#B").click(function () {
		grade("B");
	});
	$("#C").click(function () {
		grade("C");
	});
	$("#D").click(function () {
		grade("D");
	});
	$("#save").click(function () {
		$("#save").html("Saved!");
		$("#save").attr("disabled", true);
	});
});