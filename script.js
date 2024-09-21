const questions = [
    {
        question: "What is the purpose of a color palette in design?",
        answers: [
            {text: "To make designs more colorful", correct: false},
            {text: "To create a consistent visual theme", correct: true},
            {text: "To make text stand out", correct: false},
            {text: "To add random colors", correct: false},
        ]
    },
    {
        question: "Which tool in Canva allows you to adjust the transparency of an image or element?",
        answers: [
            {text: "Filter tool", correct: false},
            {text: "Crop tool", correct: false},
            {text: "Shadow tool", correct: false},
            {text: "Transparency", correct: true},
        ]
    },
    {
        question: "Which term describes the arrangement of visual elements in a design?",
        answers: [
            {text: "Balance", correct: false},
            {text: "Hierarchy", correct: false},
            {text: "Composition", correct: true},
            {text: "Alignment", correct: false},
        ]
    },
    {
        question: "Which of the following is an example of contrast in design?",
        answers: [
            {text: "Pairing a large headline with smaller body text", correct: true},
            {text: " Keeping everything centered", correct: false},
            {text: "Using different shades of the same color", correct: false},
            {text: "Using the same font size throughout", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + " ." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

}


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();