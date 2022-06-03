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
// *******************************Save Data in Firebase*********************//
//   saveData()
//   function saveData() {
//       set(ref(database, 'Questions/'), {
//           phyQuestions: [
//               {
//                   question: "In a vacuum, all electromagnetic waves have the same:",
//                   answer: "Speed",
//                   options: ["Speed", "Frequency", "Amplitude", "Wavelength"]
//               },
//               {
//                   question: "Which of the following characteristic of a wave is independent of the others?",
//                   answer: "Amplitude",
//                   options: ["Speed", "Frequency", "Amplitude", "Wavelength"]
//               },
//               {
//                   question: "Categories of wave are:",
//                   answer: "2",
//                   options: ["1", "2", "3", "4"]
//               },
//               {
//                   question: "SI unit of potential difference is:",
//                   answer: "Volt",
//                   options: ["Volt", "Ohm", "Coulomb", "Joule"]
//               },
//               {
//                   question: "Release of energy by the sun due to:",
//                   answer: "Fusion",
//                   options: ["Fission", "Burning of gases", "Fusion", "None of these"]
//               }
//           ],
//           bioQuestions: [
//               {
//                   question: "The accidental death of cell and tissue is called.",
//                   answer: "Necrosis",
//                   options: ["Apoptosis", "Regeneration", "Synapsis", "Necrosis"]
//               },
//               {
//                   question: "To which group of molecule enzyme belong?",
//                   answer: "Protein",
//                   options: ["Carbohydrates", "Protein", "Lipids", "Nucleic acids"]
//               },
//               {
//                   question: "Dark reaction takes place in:",
//                   answer: "Stroma",
//                   options: ["Thylakoids", "Cristae", "Matrix", "Stroma"]
//               },
//               {
//                   question: "Bacteria are include in kingdom:",
//                   answer: "Monera",
//                   options: ["Protista", "Animalia", "Plantae", "Monera"]
//               },
//               {
//                   question: "Change in Gene is called:",
//                   answer: "Mutation",
//                   options: ["Cell replacement", "Mutation", "Both 1) and 2)", "None of these"]
//               }
//           ],

//       });
//       alert("Data stored")
//   }
//*******************************EVENTLISTENERS*********************//
const sbjItems = document.querySelectorAll(".subject-item");
const preLoader = document.querySelector(".loader-container");
sbjItems.forEach((item) => {
  item.onclick = function getSubject(e) {
    let selectedSubject = e.target.innerText.toLowerCase();
    let title = `${selectedSubject
      .slice(0, 1)
      .toUpperCase()}${selectedSubject.slice(1)}`;
    let getSubjectName = selectedSubject.slice(0, 3);
    //*******************************Get Data from Firebase*********************//
    if (
      selectedSubject == "physics" ||
      selectedSubject == "biology" ||
      selectedSubject == "english" ||
      selectedSubject == "chemistry"
    ) {
      preLoader.style.display = "flex";
      const getData = ref(database, `${getSubjectName}`);
      onValue(getData, (snapshot) => {
        const data = snapshot.val();
        console.log(getSubjectName);
        console.log(data);
        sessionStorage.setItem("Questions", JSON.stringify(data.questions));
        sessionStorage.setItem("Time", data.time);
        sessionStorage.setItem("Title", title);
        location.href = "quiz.html";
      });
    } else {
      alert(`${selectedSubject} questions will be available soon!`);
    }
    //*******************************Get Data from Firebase*********************//
  };
});
