const startCard = document.querySelector("#start-card");
const questionCard = document.querySelector("#question-container");
const scoreCard = document.querySelector("#score-card");
const leaderboardCard = document.querySelector("#leaderboard-card");
const resultDiv = document.querySelector("#result-pick");
const resultText = document.querySelector("#result-text");
const timeDisplay = document.querySelector("#time");
const score = document.querySelector("#score");
const submitButton = document.querySelector("#publish-button");
const inputElement = document.querySelector("#name");
const leaderboardLink = document.querySelector("#leaderboard-link");


  leaderboardLink.addEventListener("click", showLeaderboard);
  leaderboardLink.addEventListener("click", showLeaderboard);
  document.querySelector("#start-button").addEventListener("click", startQuiz);
  document.querySelector("#quiz-options").addEventListener("click", checkAnswer);
  submitButton.addEventListener("click", storeScore);

  var intervalID;
  var time;
  var currentQuestion;


  function hideCards() {
    startCard.setAttribute("hidden", true);
    questionCard.setAttribute("hidden", true);
    scoreCard.setAttribute("hidden", true);
    leaderboardCard.setAttribute("hidden", true);
  }

  
 
  function hideResultText() {
    resultDiv.style.display = "none";
  }
  
 
  
  function startQuiz() {
    hideCards();
    questionCard.removeAttribute("hidden");
    currentQuestion = 0;
    displayQuestion();
    time = questions.length * 10;
    intervalID = setInterval(countdown, 1000);
    displayTime();
  }

  function displayQuestion() {
    let question = questions[currentQuestion];
    let options = question.options;
    let h2QuestionElement = document.querySelector("#question-text");
    h2QuestionElement.textContent = question.questionText;
    for (let i = 0; i < options.length; i++) {
      let option = options[i];
      let optionButton = document.querySelector("#option" + i);
      optionButton.textContent = option;
    }
  }

  function storeScore(event) {
    event.preventDefault();
    if (!inputElement.value) {
      alert("You must enter initials.");
      return;
    }
    let leaderboardItem = {
      initials: inputElement.value,
      score: time,
    };
    updateStoredLeaderboard(leaderboardItem);
    hideCards();
    leaderboardLink.removeAttribute("hidden");
    renderLeaderboard();
  }
  
  
  function countdown() {
    time--;
    displayTime();
    if (time < 1) {
      endQuiz();
    }
  }
  
 
  function displayTime() {
    timeDisplay.textContent = time;
  }
  

 
  
  
  
  function optionIsCorrect(optionButton) {
    return optionButton.textContent === questions[currentQuestion].answer;
  }
  
 
  function checkAnswer(eventObject) {
    let optionButton = eventObject.target;
    resultDiv.style.display = "block";
    if (optionIsCorrect(optionButton)) {
      resultText.textContent = "Correct!";
      setTimeout(hideResultText, 1000);
    } else {
      resultText.textContent = "Wrong!";
      setTimeout(hideResultText, 1000);
      if (time >= 10) {
        time = time - 10;
        displayTime();
      } else {
        time = 0;
        displayTime();
        endQuiz();
      }
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }
  

  function endQuiz() {
  clearInterval(intervalID);
  hideCards();
  scoreCard.removeAttribute("hidden");
  score.textContent = time;
}
  
  


  
  
  
  function updateStoredLeaderboard(leaderboardItem) {
    let leaderboardArray = getLeaderboard();
    leaderboardArray.push(leaderboardItem);
    localStorage.setItem("leaderboardArray", JSON.stringify(leaderboardArray));
  }
  
  

  function getLeaderboard() {
    let storedLeaderboard = localStorage.getItem("leaderboardArray");
    if (storedLeaderboard !== null) {
      let leaderboardArray = JSON.parse(storedLeaderboard);
      return leaderboardArray;
    } else {
      leaderboardArray = [];
    }
    return leaderboardArray;
  }
  

  function renderLeaderboard() {
    let sortedLeaderboardArray = sortLeaderboard();
    const highscoreList = document.querySelector("#highscore-list");
    highscoreList.innerHTML = "";
    for (let i = 0; i < sortedLeaderboardArray.length; i++) {
      let leaderboardEntry = sortedLeaderboardArray[i];
      let newListItem = document.createElement("li");
      newListItem.textContent =
        leaderboardEntry.initials + " - " + leaderboardEntry.score;
      highscoreList.append(newListItem);
    }
  }
  

  function sortLeaderboard() {
    let leaderboardArray = getLeaderboard();
    if (!leaderboardArray) {
      return;
    }
  
    leaderboardArray.sort(function (a, b) {
      return b.score - a.score;
    });
    return leaderboardArray;
  }
  
  
  function clearHighscores() {
    localStorage.clear();
    renderLeaderboard();
  }
  
  function returnToStart() {
    hideCards();
    beginQuiz.removeAttribute("hidden");
  }
  

  function showLeaderboard() {
    hideCards();
    leaderboard.removeAttribute("hidden");
    clearInterval(intervalID);
    time = undefined;
    displayTime();
    renderLeaderboard();
  }

  const questions = [
    {
      questionText: "What are the identifiers called that cannot be used as variables or function names?",
      options: ["Reserved Words", "Constants", "Concrete Terms", "Favorites"],
      answer: "Reserved Words",
    },
    {
      questionText: "This is what you call the guide that defines coding conventions for all projects __",
      options: [
        "Developer's reference", "Coding dictionary", "Main textbook", "Style guide",],
      answer: "Style guide",
    },
    {
      questionText: "In JavaScript, what is used in conjunction with HTML to “react” to certain elements?",
      options: ["RegExp", "Events", "Condition", "Boolean",],
      answer: "Events",
    },
    {
      questionText: "What is the element used - and hidden - in code that explains things and makes the content more readable?",
      options: ["Quotations", "Notes", "Comments", "Comparisons",],
      answer: "Comments",
    },
    {
      questionText: "What is the element called that is used to describe the set of variables, objects, and functions you explicitly have access to?",
      options: ["Range", "Restriction", "Output Level", "Scope",],
      answer: "Scope",
    },
  ];