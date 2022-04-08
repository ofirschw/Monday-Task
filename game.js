///////////////////////////////////////Initialize The Const and Let////////////////////////////////////////////////////////////
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const scoreDiv = document.getElementById("scoreContainer");
//const inputname =document.getElementById("fname").src = "index.html"
//const heyDiv = document.getElementById("HeyContainer");

const questionTime = 10;
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let count = 0;
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let questions = [];
///////////////////////////////////////Initialize The Const and Let////////////////////////////////////////////////////////////
////////////////////////////////////////////////Reading API////////////////////////////////////
fetch(
    'https://opentdb.com/api.php?amount=100'
)
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };
            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );
            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });
            return formattedQuestion;
        });
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });
////////////////////////////////////////////////Reading API////////////////////////////////////

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;
startGame = () => { //Initialize the game
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

startSound = function(id, loop) { //To Play the game Sound
	soundHandle = document.getElementById(id);
	if(loop)
		soundHandle.setAttribute('loop', loop);
	soundHandle.play();
}

getNewQuestion = () => { //Move for next Question
    startSound('background', true);
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
};

choices.forEach((choice) => { //Check the answer
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
               clearInterval(TIMER);
               count = 0;
               soundHandle.pause();
               soundHandle.currentTime = 0;
        if (classToApply === 'correct') {
            startSound('rightsound', false); //For correct answer
            incrementScore(CORRECT_BONUS);
        }
        if (classToApply === 'incorrect') {
            startSound('wrongsound', false); //For incorrect answer
        }


        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 3500);
    });
});

incrementScore = (num) => { //Sum the score
    score += num;
    scoreText.innerText = score;
};

function renderCounter(){ //To present the timer
    startSound('background', false);
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        if(questionCounter < MAX_QUESTIONS){
             clearInterval(TIMER);
             count = 0;
             soundHandle.pause();
             soundHandle.currentTime = 0;
             startSound('wrongsound', false);
            getNewQuestion();
        }
        else {
            clearInterval(TIMER);
            return window.location.assign('end.html');
        }
    }
}

//heyDiv.style.display = "block";
//  heyDiv.innerHTML += "<p>"+ inputname +"%</p>" ;
function myFunction() {
    var inputTest = document.getElementById('fname').value;
    localStorage.setItem( 'objectToPass', inputTest );
    window.location.assign('game.html');
}


 var x = "Good Luck " + localStorage.getItem("objectToPass") +"!";
document.getElementById("p1").innerHTML = x;

//----------------------------------------------------------------------

