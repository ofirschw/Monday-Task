///////////////////////////////////////Initialize The Const and Let////////////////////////////////////////////////////////////
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const scoreDiv = document.getElementById("scoreContainer");
const scoreperDiv = document.getElementById("finalScore");
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const MAX_QUESTIONS = 3;
///////////////////////////////////////Initialize The Const and Let////////////////////////////////////////////////////////////

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});


    scoreDiv.style.display = "block";
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(10 * mostRecentScore/MAX_QUESTIONS);
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 40) ? "img/5.png" :
              (scorePerCent >= 30) ? "img/4.png" :
              (scorePerCent >= 20) ? "img/3.png" :
              (scorePerCent >= 10) ? "img/2.png" :
              "img/1.png";
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreperDiv.innerHTML += "<p>"+ scorePerCent +"%</p>" ;

