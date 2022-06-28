// These are all of my querySelectors that target the html
const startTest = document.querySelector("#quiz");
const questionBox = document.querySelector("#question-container");
const scoreBox = document.querySelector("#yourscores");
const quizLeaderboard = document.querySelector("#lobbyleaderboard");
const quizResults = document.querySelector("#resultchoices");
const answerOptions = document.querySelector("#resultanswers");
const timeDisplay = document.querySelector("#time");
const score = document.querySelector("#score");
const publishButton = document.querySelector("#publish-button");
const inputElement = document.querySelector("#name");
const leaderboardTitle = document.querySelector("#leaderboardlink");
const backButton = document.querySelector("#back-button");
const clearButton = document.querySelector("#clear-button");

// these are my eventlisteners that will allow the page to function when objects are clicked
  leaderboardTitle.addEventListener("click", showLeaderboard);
  leaderboardTitle.addEventListener("click", showLeaderboard);
  document.querySelector("#beginbutton").addEventListener("click", startQuiz);
  document.querySelector("#quiz-options").addEventListener("click", checkAnswer);
  publishButton.addEventListener("click", storeScore);
  backButton.addEventListener("click", returnToStart);
  clearButton.addEventListener("click", clearHighscores);

  // these are my variables that are created
  var intervalID;
  var time;
  var currentQuestion;

// this function is hiding all the card/screens so they dont display at once
  function hideCards() {
    startTest.setAttribute("hidden", true);
    questionBox.setAttribute("hidden", true);
    scoreBox.setAttribute("hidden", true);
    quizLeaderboard.setAttribute("hidden", true);
  }

  
 // this function will hide your results/ the final message till you finish the quiz
  function hideanswerOptions() {
    quizResults.style.display = "none";
  }
  
 
  // this function will begin the quiz when the begin quiz is clicked
  function startQuiz() {
    // this will hide all the cards when the quiz is started
    hideCards();
    // this is unhiding the questions/answers
    questionBox.removeAttribute("hidden");
    // this is stating the current question we are working on is 0
    currentQuestion = 0;
    // this is calling on the function that will display a question from the questions array
    displayQuestion();
    // this is setting the time based on how many questions are gonna be asked
    time = questions.length * 8;
    // this is making the timer countdown by 1000ms or every 1 second
    intervalID = setInterval(countdown, 1000);
    // this is calling on the function to display the time when the quiz starts
    displayTime();
  }
// this function is displaying the first question in the array
  function displayQuestion() {
    // creating values that target the question and places its value to the currentquestion
    let question = questions[currentQuestion];
    // this is creating a value that target the arrray that contains the answers
    let options = question.options;
    // this is creating a value that selects 11a target from the html to apply specific code to
    let h2QuestionElement = document.querySelector("#question-text");
    // this is changing the text inside this targeted value to the question text state in js
    h2QuestionElement.textContent = question.questionText;
    // this for loop is selecting the answers from the questions array
    for (let i = 0; i < options.length; i++) {
      let option = options[i];
      let optionButton = document.querySelector("#option" + i);
      optionButton.textContent = option;
    }
  }
// this function is adding a score to the event
  function storeScore(event) {
    // this is stopping the page from loading events default effects/values
    event.preventDefault();
    //this is saying that if the user doesn't enter their name prompt them saying the must
    if (!inputElement.value) {
      alert("You must enter initials.");
      return;
    }
    // this is creating a list with the name inputed and the score to show after the quiz
    let leaderboardItem = {
      // this is saying to put the users input value in the initials spot
      initials: inputElement.value,
      score: time,
    };
    // this is updating the list with the new list item if the test is taken again
    updateStoredLeaderboard(leaderboardItem);
    // this is calling on the function that hides cards
    hideCards();
    // this is removing the hidden attribute from the leaderboard
    quizLeaderboard.removeAttribute("hidden");
    renderLeaderboard();
  }
  
  // this function is telling the quiz end when the time counted down to 0
  function countdown() {
    time--;
    displayTime();
    if (time < 1) {
      endQuiz();
    }
  }
  
 // this function is placing the time value into the proper text area
  function displayTime() {
    timeDisplay.textContent = time;
  }
  

 
  
  
  // this is saying that to determine if its correct it must equal the preset input in the option array
  function optionIsCorrect(optionButton) {
    return optionButton.textContent === questions[currentQuestion].answer;
  }
  
 // this function is being used to check and see if the answer is right or wrong
  function checkAnswer(eventObject) {
    let optionButton = eventObject.target;
    // this is making the results appear together
    quizResults.style.display = "block";
    // this is saying that if the correct option is chosen then say correct and continue counting down
    if (optionIsCorrect(optionButton)) {
      answerOptions.textContent = "Correct!";
      setTimeout(hideanswerOptions, 1000);
    } else {
      // this is saying that if the input doesnt match the correct answer then respond wrong
      answerOptions.textContent = "Wrong!";
      setTimeout(hideanswerOptions, 1000);
      // this is saying that if time is greater than or equal to 10 then subtract 10 from the time if the answer is wrong
      if (time >= 10) {
        time = time - 10;
        displayTime();
        //this is saying that if the time reaches 0 then to end the quiz
      } else {
        time = 0;
        displayTime();
        endQuiz();
      }
    }
// this is going through the questions array until there are no more if so then end the quiz
    currentQuestion++;
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }
  
// this function is stopping the countdown, hiding all the other screens and showing your score which is your time left
  function endQuiz() {
  clearInterval(intervalID);
  hideCards();
  scoreBox.removeAttribute("hidden");
  score.textContent = time;
}
  
  // this function is generating the leaderboard list
function renderLeaderboard() {
  let sortedLeaderboardArray = sortLeaderboard();
  const highscoreList = document.querySelector("#highscore-list");
  //this is turning the list into an empty string
  highscoreList.innerHTML = "";
  for (let i = 0; i < sortedLeaderboardArray.length; i++) {
    let leaderboardEntry = sortedLeaderboardArray[i];
    let newListItem = document.createElement("li");
    // this is adding the inputted information that was converted to string to the list and adding them to the end of the list
    newListItem.textContent =
      leaderboardEntry.initials + " - " + leaderboardEntry.score;
    highscoreList.append(newListItem);
  }
}

  
  
  // this function will take any user input string and adding it to an array
  function updateStoredLeaderboard(leaderboardItem) {
    let leaderboardArray = getLeaderboard();
    leaderboardArray.push(leaderboardItem);
    // this is adding an array to the local storage
    localStorage.setItem("leaderboardArray", JSON.stringify(leaderboardArray));
  }
  
  
// this function is retreiving the array from local storage and making it a returned array
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
  
  
//this function is saying that it will return nothing if the leaderboard array is empty
  function sortLeaderboard() {
    let leaderboardArray = getLeaderboard();
    if (!leaderboardArray) {
      return;
    }
  // this is sorting the scores in order
    leaderboardArray.sort(function (a, b) {
      return b.score - a.score;
    });
    return leaderboardArray;
  }
  
  // this is adding a function that clears the leaderboard array when the button is clicked
  function clearHighscores() {
    localStorage.clear();
    renderLeaderboard();
  }
  // this takes you back to the first screen/card when you click go back
  function returnToStart() {
    hideCards();
    startTest.removeAttribute("hidden");
  }
  
// this function is to display the highscores list at any time when the option is selected
  function showLeaderboard() {
    hideCards();
    leaderboard.removeAttribute("hidden");
    clearInterval(intervalID);
    time = undefined;
    displayTime();
    renderLeaderboard();
  }
// these are my questions
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