// Quiz questions
const questions = [
    {
        question: " What does HTML stand for?",
        options: ["Hyper Text Markup Language","Hyperlinks and Text Markup Language","Home Tool Markup Language","Hyper Transfer Markup Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which CSS selector targets an element with a specific id",
        options: [".classname","#idname","elementname","*"],
        answer: "#idname"
    },
    {
        question: "How do you declare a variable in JavaScript that cannot be reassigned?",
        options: ["var x = 5;", "let x = 5;", "const x = 5;", "variable x = 5;"],
        answer: "const x = 5;"
    },
    {
        question: "Which HTML tag is used to make a webpage responsive on mobile devices?",
        options: [
            "<responsive>",
            "<meta name='viewport'>",
            "<mobile>",
            "<scale>"
        ],
        answer: "<meta name='viewport'>"
    },
    {
        question: "What does the HTTP status code 404 mean?",
        options: [
            "Server error",
            "Page not found",
            "Access forbidden",
            "Successful request"
        ],
        answer: "Page not found"
    }
];

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const currentQuestionElement = document.getElementById('current-question');
const totalQuestionsElement = document.getElementById('total-questions');
const timeElement = document.getElementById('time');
const scoreElement = document.getElementById('score');
const totalElement = document.getElementById('total');

// Quiz variables
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

// Initialize the quiz
function initQuiz() {
    totalQuestionsElement.textContent = questions.length;
    totalElement.textContent = questions.length;
}

// Start the quiz
function startQuiz() {
    startScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    showQuestion();
    startTimer();
}

// Show current question
function showQuestion() {
    const question = questions[currentQuestionIndex];
    currentQuestionElement.textContent = currentQuestionIndex + 1;
    questionElement.textContent = question.question;
    
    optionsElement.innerHTML = '';
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(option));
        optionsElement.appendChild(button);
    });
    
    nextBtn.classList.add('hide');
}

// Select an option
function selectOption(selectedOption) {
    const question = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option-btn');
    
    // Disable all options
    options.forEach(option => {
        option.disabled = true;
    });
    
    // Mark correct/incorrect answers
    options.forEach(option => {
        if (option.textContent === question.answer) {
            option.classList.add('correct');
        } else if (option.textContent === selectedOption && selectedOption !== question.answer) {
            option.classList.add('incorrect');
        }
    });
    
    // Update score if correct
    if (selectedOption === question.answer) {
        score++;
    }
    
    // Show next button
    nextBtn.classList.remove('hide');
    clearInterval(timer);
}

// Start timer for current question
function startTimer() {
    timeLeft = 30;
    timeElement.textContent = timeLeft;
    timeElement.classList.remove('warning'); // Reset warning class
    
    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        
        // Add warning class when time is less than 10
        if (timeLeft <= 10) {
            timeElement.classList.add('warning');
        }
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            // Auto move to next question if time runs out
            if (currentQuestionIndex < questions.length - 1) {
                nextQuestion();
            } else {
                showResult();
            }
        }
    }, 1000);
}

// Go to next question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        startTimer();
        // Reset timer appearance
        timeElement.classList.remove('warning');
    } else {
        showResult();
    }
}

// Show final result
function showResult() {
    quizScreen.classList.add('hide');
    resultScreen.classList.remove('hide');
    scoreElement.textContent = score;
}

// Restart quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultScreen.classList.add('hide');
    startScreen.classList.remove('hide');
}

// Event listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Initialize the quiz when page loads
initQuiz();
