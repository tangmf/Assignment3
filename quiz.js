// code was taken from https://youtu.be/f4fB9Xg2JEY


const question = $("#question");
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = $("#progressText");
const scoreText = $("#score");
const progressBarFull = $("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'What is Covid-19?',
        choice1: 'Bacteria',
        choice2: 'Virus',
        choice3: 'Cell',
        choice4: 'Device',
        answer: 'Virus',
    },
    {
        question: 'In what year did we find out about Covid-19?',
        choice1: '2009',
        choice2: '2016',
        choice3: '2021',
        choice4: '2019',
        answer: '2019',
    },
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () =>{
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion;
}
getNewQuestion = () => {
    if(availableQuestions.Length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('/end.html');
    }

    questionCounter ++;
    progressText.innerText = Question ${questionCounter} of ${MAX_QUESTIONS};
    progressBarFull.style.width = ${(questionCounter/MAX_QUESTIONS) * 100}%;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice ' + number ];
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false;
        const selectChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        if (classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()