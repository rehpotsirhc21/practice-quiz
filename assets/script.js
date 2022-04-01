
// variables for butons
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");

//click listerners
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click",() => {
    setNextQuestion()
} )

//global variables 
const questionContainerElement = document.getElementById("question-container");
let shuffledQuestions, currentQuestionIndex;
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

//fucntion to start game
function startGame() {
  startButton.classList.add("hide");
  questionContainerElement.classList.remove("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  setNextQuestion();
}
//function to get next question
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

//function to grab the question with approprate answers and assign correct.
function showQuestion(question) {
  questionElement.innerHTML = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}
//reset state to remove existing buttons
function resetState() {
    clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}
//select answer
function selectAnswer(event) {
  const selectedButton = event.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) =>
    setStatusClass(button, button.dataset.correct)
  );
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide')
  } else {
      startButton.innerText = 'restart'
      startButton.classList.remove("hide")
  }
  nextButton.classList.remove('hide')

}
//set class for background based on correct/wrong
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}
//reset background to neutral color 
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
//quesiton array
const questions = [
  {
    question: "what is 2+2",
    answers: [
      {
        text: "4",
        correct: true,
      },
      {
        text: "22",
        correct: false,
      },
    ],
  },
];
