const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainer = document.getElementById("container")
const questionEl = document.getElementById("question")
const ansButtonEl = document.getElementById("choices")

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener("click", startGame)

function startGame() {
console.log("started")
startButton.classList.add("hide")
shuffledQuestions = questions.sort(() => Math.random() - .5)
currentQuestionIndex = 0
questionContainer.classList.remove("hide")
setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
      const button = document.createElement('button')
      button.innerText = answer.text
      button.classList.add('btn')
      if (answer.correct) {
        button.dataset.correct = answer.correct
      }
      button.addEventListener('click', selectAnswer)
      ansButtonEl.appendChild(button)
    })
  
}

function resetState() {
    nextButton.classList.add("hide")
    while (ansButtonEl.firstChild) {
        ansButtonEl.removeChild
        (ansButtonEl.firstChild)
    }
}