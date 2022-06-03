generateResult();

function generateResult() {
  const container = document.querySelector(".container");
  const correctAns = document.getElementById("correct-ans-num");
  const resultRemarks = document.getElementById("result-remarks");
  const totalScore = document.getElementById("obt-num");
  let getScore = sessionStorage.getItem("userScore");
  let getName = sessionStorage.getItem("userName");
  let totalQuestions = sessionStorage.getItem("totalQuestions");
  correctAns.innerHTML = `${getScore} out of ${totalQuestions} questions`;
  totalScore.innerHTML = getScore * 10;
  if (getScore < totalQuestions / 2) {
    const resultContainer = document.getElementById("result-container");
    resultContainer.style.background = "var(---sc-light)";
    const tryAgainBtn = document.createElement("button");
    tryAgainBtn.id = "try-again-btn";
    tryAgainBtn.classList.add("btn");
    tryAgainBtn.classList.add("btn-pr");
    tryAgainBtn.innerHTML =
      "Try Again <ion-icon name='repeat-outline'></ion-icon>";
    resultRemarks.innerHTML = `Oh ${getName} You Failed!`;
    container.appendChild(tryAgainBtn);
    tryAgainBtn.onclick = function tryAgain() {
      location.href = "quiz.html";
    };
  } else {
    resultRemarks.innerHTML = `Congratulations! ${getName}`;
    sessionStorage.clear();
  }
}
const backBtn = document.getElementById("back-btn");
backBtn.addEventListener("click", () => goBack());
function goBack() {
  location.href = "index.html";
  sessionStorage.clear();
}
