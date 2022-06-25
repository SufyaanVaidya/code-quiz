const startButton = document.getElementById("start-btn")

const questionContainer = document.getElementById("container")
const questionEl = document.getElementById("question")
const ansButtonEl = document.getElementById("choices")

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener("click", startGame)
startButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})

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
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (ansButtonEl.firstChild) {
        ansButtonEl.removeChild
        (ansButtonEl.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(ansButtonEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")

    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")

    }
}
function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}
const questions = [
    {
        question: "What are the identifiers called that cannot be used as variables or function names?",
        answers: [
            {text: "Reserved Words", correct: true  },
            {text: "Constants", correct: false  },
            {text: "Concrete Terms", correct: false  },
            {text: "Favorites", correct: false  }
        ]
    },
    {
        question: "This is what you call the guide that defines coding conventions for all projects.",
        answers: [
            {text: "Developer's reference", correct: false  },
            {text: "Coding dictionary", correct: false  },
            {text: "Main textbook", correct: false  },
            {text: "Style guide", correct: true  }
        ]
    },
    {
        question: "In JavaScript, what is used in conjunction with HTML to “react” to certain elements?",
        answers: [
            {text: "RegExp", correct: false  },
            {text: "Events", correct: true  },
            {text: "Condition", correct: false  },
            {text: "Boolean", correct: false  }
        ]
    },
    {
        question: "What is the element used - and hidden - in code that explains things and makes the content more readable?",
        answers: [
            {text: "Quotations", correct: false  },
            {text: "Notes", correct: false  },
            {text: "Comments", correct: true  },
            {text: "Comparisons", correct: false  }
        ]
    },
    {
        question: "What is the element called that is used to describe the set of variables, objects, and functions you explicitly have access to?",
        answers: [
            {text: "Range", correct: false  },
            {text: "Restriction", correct: false  },
            {text: "Output Level", correct: false  },
            {text: "Scope", correct: true  }
        ]
    }
]