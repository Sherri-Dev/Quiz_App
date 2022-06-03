const nameInput = document.getElementById("user-name");
const alertBox = document.getElementById("alert-box");
const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", () => validateName(nameInput.value));
function validateName(userName) {
  let userCheck = /^[a-z][a-z]+[\d]*$|^[a-z][a-z]*[\d][\d+]$/i;
  let result = userCheck.test(userName);
  if (userName == "") {
    alertBox.innerHTML = "*Name cannot be empty!";
  } else if (userName.length < 3) {
    alertBox.innerHTML = "*Name must contain 3 characters at least!";
  } else if (userName.length >= 3 && result === false) {
    alertBox.innerHTML =
      "*Name should only contain alphanumeric characters & it should never start with a number";
  } else if (result) {
    sessionStorage.setItem("userName", userName.toUpperCase());
    location.href = "subjects.html";
  }
}
