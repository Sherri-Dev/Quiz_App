//*******************************Firebase Database Setup*********************//
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyADpfhY0_ZbpVHWFM6dFyoZlz3Hp6obqf0",
  authDomain: "quizzles10.firebaseapp.com",
  projectId: "quizzles10",
  storageBucket: "quizzles10.appspot.com",
  messagingSenderId: "689350684744",
  appId: "1:689350684744:web:4c6ee6dee18bc04694e87d",
  measurementId: "G-CTML3EG4T4",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/********************************** REFERENCES ***************************************/
const timeInput = document.getElementById("time-input");
const timeBox = document.getElementById("time-box");
const questionInput = document.getElementById("question-input");
const ansInput = document.getElementById("ans");
const opts = document.querySelectorAll(".opt");
const saveBtn = document.getElementById("save-btn");
const delAllBtn = document.getElementById("del-all-btn");
const questionsBox = document.getElementById("questions-box");
const subjectName = document.getElementById("sbj-h");
const subjectSelector = document.getElementById("subject_selector");
const alertBox1 = document.getElementById("alert-box1");
let selectedSubject = "";
let selectedArray = [];
/********************************** GET DATA FROM FIREBASE ***************************************/
subjectSelector.addEventListener("change", () => {
  timeInput.removeAttribute("readonly");
  selectedSubject = subjectSelector.value.toLowerCase();
  const getData = ref(database, `${selectedSubject}`);
  onValue(getData, (snapshot) => {
    subjectName.innerHTML = `${subjectSelector.value} Questions`;
    if (snapshot.exists()) {
      const data = snapshot.val();
      myData(data);
    } else {
      clearData();
    }
  });
});
function myData(data) {
  let question = "";
  data.questions.forEach((item, index) => {
    question += `<div class="question">Q${index + 1}. ${item.question}</div>
    <div class="option">1) ${item.options[0]}</div>
    <div class="option">2) ${item.options[1]}</div>
    <div class="option">3) ${item.options[2]}</div>
    <div class="option">4) ${item.options[3]}</div>
    <div class="ans">${
      item.answer
    }</div>    <ion-icon name="trash-bin-outline" class= "del-btn"></ion-icon></div>`;
  });
  questionsBox.innerHTML = question;
  delAllBtn.style.display = "inline-block";
  let time = `<div>Test time =  ${data.time} Minutes</div>`;
  timeBox.innerHTML = time;
  timeBox.style.display = "inline-block";
  questionsBox.innerHTML = question;
  delAllBtn.style.display = "inline-block";
  selectedArray = data.questions;
  localStorage.setItem(
    `${selectedSubject}Questions`,
    JSON.stringify(selectedArray)
  );
  // Add Delete Event Listener
  const delBtns = questionsBox.querySelectorAll(".del-btn");
  delBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => deleteQst(index));
  });
}
function clearData() {
  questionsBox.innerHTML = `<h3 style = "text-align:center; font-weight: 400">No questions added yet!</h3>`;
  delAllBtn.style.display = "none";
  timeBox.style.display = "none";
}
// *******************************Save Data in Firebase*********************//
saveBtn.onclick = function saveData() {
  if (
    selectedSubject &&
      questionInput.value &&
      ansInput.value &&
      opts[0].value &&
      opts[1].value &&
      opts[2].value &&
      opts[3].value 

  ) {
    selectedArray.push({
      question: questionInput.value,
      answer: ansInput.value,
      options: [opts[0].value, opts[1].value, opts[2].value, opts[3].value],
    });
    sendData();
    timeInput.setAttribute("readonly", "true");
    displayAlert("Question Saved Successfully!", "success");
    questionInput.value = "";
    ansInput.value = "";
    opts[0].value = "";
    opts[1].value = "";
    opts[2].value = "";
    opts[3].value = "";
  } else {
    displayAlert("Something went wrong!", "danger");
  }
};
function sendData() {
  set(ref(database, `${selectedSubject}/`), {
    questions: selectedArray,
    time: timeInput.value.slice(0),
  });
}
function deleteQst(index) {
  selectedArray.splice(index, 1);
  sendData();
}
function displayAlert(text, color) {
  alertBox1.innerHTML = text;
  alertBox1.classList.add(`${color}-color`);
  setTimeout(() => {
    alertBox1.innerHTML = "";
    alertBox1.classList.remove(`${color}-color`);
  }, 1000);
}
delAllBtn.onclick = function deleteData() {
  remove(ref(database, `${selectedSubject}/questions/`));
};

// saveData();
// function saveData() {
//   set(ref(database, "Questions/"), {
//     phyQuestions: [
//       {
//         question: "In a vacuum, all electromagnetic waves have the same:",
//         answer: "Speed",
//         options: ["Speed", "Frequency", "Amplitude", "Wavelength"],
//       },
//       {
//         question:
//           "Which of the following characteristic of a wave is independent of the others?",
//         answer: "Amplitude",
//         options: ["Speed", "Frequency", "Amplitude", "Wavelength"],
//       },
//       {
//         question: "Categories of wave are:",
//         answer: "2",
//         options: ["1", "2", "3", "4"],
//       },
//       {
//         question: "SI unit of potential difference is:",
//         answer: "Volt",
//         options: ["Volt", "Ohm", "Coulomb", "Joule"],
//       },
//       {
//         question: "Release of energy by the sun due to:",
//         answer: "Fusion",
//         options: ["Fission", "Burning of gases", "Fusion", "None of these"],
//       },
//     ],
//     bioQuestions: [
//       {
//         question: "The accidental death of cell and tissue is called.",
//         answer: "Necrosis",
//         options: ["Apoptosis", "Regeneration", "Synapsis", "Necrosis"],
//       },
//       {
//         question: "To which group of molecule enzyme belong?",
//         answer: "Protein",
//         options: ["Carbohydrates", "Protein", "Lipids", "Nucleic acids"],
//       },
//       {
//         question: "Dark reaction takes place in:",
//         answer: "Stroma",
//         options: ["Thylakoids", "Cristae", "Matrix", "Stroma"],
//       },
//       {
//         question: "Bacteria are include in kingdom:",
//         answer: "Monera",
//         options: ["Protista", "Animalia", "Plantae", "Monera"],
//       },
//       {
//         question: "Change in Gene is called:",
//         answer: "Mutation",
//         options: [
//           "Cell replacement",
//           "Mutation",
//           "Both 1) and 2)",
//           "None of these",
//         ],
//       },
//     ],
//   });
//   alert("Data stored");
// }
