/*******************************Referances*********************************/
const titleBox = document.getElementById("title");
const timeBox = document.getElementById("time-box");
const questionNumber = document.getElementById("question-num");
const questionUl = document.getElementById("question");
const options = document.querySelectorAll(".option");
const optionsText = document.querySelectorAll(".opt-text");
const nextBtn = document.getElementById("next-btn");
const questions = JSON.parse(sessionStorage.getItem("Questions"));
const totalQuestions = questions.length;
let questionNum = 0;
let sqNum = 0;
let totalsq = 0;
let skippedNum = 0;
let score = 0;
/*******************************EVENT LISTENERS*********************************/
nextBtn.addEventListener("click", () => nextQuestion());
/*******************************FUNCTIONS*********************************/
function showQuestionNumber() {
  questionNumber.innerHTML = `${questionNum + 1} / ${totalQuestions}`;
  sessionStorage.setItem("totalQuestions", totalQuestions);
}
//Countdown Timer
let totalMins = sessionStorage.getItem("Time");
let time = totalMins * 60;
let countDown = setInterval(() => {
  displayTime(time);
  time--;
  sessionStorage.setItem("time", time);
}, 1000);

function displayTime(time) {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  if (min < 10) {
    timeBox.innerHTML = `0${min}:${sec}`;
  }
  if (sec < 10) {
    timeBox.innerHTML = `${min}:0${sec}`;
    sessionStorage.setItem("time", `${min}:0${sec}`);
  }
  if (time == 0) {
    timeBox.innerHTML = "TIME OUT";
    timeBox.style.color = "red";
    location.href = "result.html";
    clearInterval(countDown);
  }
}

function showQuestion(e) {
  titleBox.innerHTML = sessionStorage.getItem("Title");
  questionUl.innerHTML = questions[e].question;
  for (let i = 0; i < options.length; i++) {
    optionsText[i].innerHTML = questions[e].options[i];
  }
}

function nextQuestion() {
  if (questionNum < questions.length - 1) {
    questionNum++;
    showQuestionNumber();
    removeActiveStatus();
    checkActive = false;
    showQuestion(questionNum);
    if (questionNum == questions.length - 1) {
      nextBtn.innerHTML = "Submit";
    }
  } else if (questionNum == questions.length - 1) {
    location.href = "result.html";
  }
}

let checkActive = false;

function addActiveStatus(e) {
  if (checkActive == false) {
    let selectedOpt = e.querySelector(".opt-text").innerHTML.toLowerCase();
    if (selectedOpt == questions[questionNum].answer.toLowerCase()) {
      correctOpt(e);
    } else {
      wrongOpt(e);
    }
    checkActive = true;
  }
}

function removeActiveStatus() {
  options.forEach((element) => {
    if (element.classList.contains("true-active")) {
      let trueActiveopt = document.querySelector(".true-active");
      trueActiveopt.classList.remove("true-active");
      let trueMark = document.getElementById("correct-mark");
      if (trueMark != null) {
        trueMark.remove();
      }
    } else if (element.classList.contains("false-active")) {
      let falseActiveopt = document.querySelector(".false-active");
      let falseMark = document.getElementById("wrong-mark");
      falseActiveopt.classList.remove("false-active");
      falseMark.remove();
    }
  });
}

function correctOpt(e) {
  let correctMark = document.createElement("ion-icon");
  correctMark.setAttribute("name", "checkmark-circle-outline");
  correctMark.id = "correct-mark";
  e.appendChild(correctMark);
  e.classList.add("true-active");
  score++;
  //Add score to local storage
  sessionStorage.setItem("userScore", score);
}

function wrongOpt(e) {
  optionsText.forEach((element) => {
    if (element.innerHTML == questions[questionNum].answer) {
      let correctOpt = element.parentElement;
      correctOpt.classList.add("true-active");
    }
  });
  let wrongMark = document.createElement("ion-icon");
  wrongMark.setAttribute("name", "close-circle-outline");
  wrongMark.id = "wrong-mark";
  e.appendChild(wrongMark);
  e.classList.add("false-active");
}
