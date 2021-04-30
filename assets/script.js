//When you click the start button  --> DOM eventlisterner that listens for a click and runs a function.
//It starts the quiz -> Function that starts the quiz
//It also starts the timer  -> Create a variable that runs the timer. In the quiz function take one second off the timer using the set time out.
//Display the questions and choices on the page.
//When you answer it correct display on the bottom that you answered correctly and move on to the next question (bonus you can add like 5 seconds to the timer if you get it right)
//When you answer it wrong display on the bottom that you answered it incorrectly and move to the next question and also take time off the timer. 
//When you answer all the questions or the timer reaches 0 the game is over. 
//When the game is over It shows All done your final score is and then the score of the amount they won.
//Then you can write in your initials and the score and your initials is saved to the highscore list. -> Save it to local storage. 
//When you click on highscore shows the highscore of the people that played. -> Use Local storage with Json stringify and Json Parse to get back the object. Then probably yse dot notation to grab the data.
//On the highscore page 
//When you click submit your score and initals it will bring you to the highscore screen where you can go back to the start quiz screen or clear your highscore 
//The clear your highscore will clear the highscore from the highscore page.
//Use data attributes too.

//Gathering DOM elements on the page. 
var startBtn = document.querySelector('#startBtn');
var displayTimer = document.querySelector('#timer');
var startContainer = document.querySelector('.quizStart');
var questionsContainer = document.querySelector('#questionContainer');
var question = document.querySelector('#question');
var choices = document.querySelectorAll('.btn-text');
var gameOverContainer = document.querySelector('#quizEnd');
var formContainer = document.querySelector('#formContainer');
var gameOverHeading = document.querySelector('#quizEndHeading');
var gameOverParagraph = document.querySelector('#quizEndScore');
var gameOverInitial = document.querySelector('#initialName');
var gameOverSubmit = document.querySelector('#subBtn');
var highscoreContainer = document.querySelector('#highscoreSection');
var highscoreHeading = document.querySelector('#highscoresHeading');
var highscoreTable = document.querySelector('.highscoreList');
var highscoreReset = document.querySelector('#highscoreReset');
var highscoreClear = document.querySelector('#highscoreClear');

//Adding Eventlistener to the DOM elements 
startBtn.addEventListener('click', startQuiz);
gameOverSubmit.addEventListener('click', submitInitial);
highscoreReset.addEventListener('click', restart);

//Setting the timer
var timer = 20;

//Question counter
var questionCounter = 0;

//Higscore Counter
var highscoreCounter = 0;

//Score counter
var score = 0;

//Current question
var currQuestion = {};

//Higscore List
var highscoreList = {};

//Setting up the object with questions 
var questionBank = [
    {
        question: 'Commonly used data types DO NOT include:',
        choices: ['strings', 'booleans', 'alerts', 'numbers'],
        answer: 'alerts'
    },
    {
        question: 'Array in JavaScript can be used to store ____',
        choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        answer: 'all of the above'
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        choices: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
        answer: 'console.log'
    }
];

//this function runs when the start screen button is clicked
function startQuiz() {
    questionCounter = 0;
    score = 0;
    startContainer.classList.add('hide');
    questionsContainer.classList.remove('hide');
    timerCountdown();
    generateQuestions();
}

//This function generates the question when its the button is clicked and its called for
function generateQuestions() {
    //If statement to check if there are no more questions left in the question bank.
    if (questionBank.length === 0) {
        timer = 1;
        return gameOver();
    }

    //Generates a random number from the length of the questions array
    //var questionIndex = Math.floor(Math.random() * questionBank.length);
    //console.log(questionIndex);

    //sets the current questions empty array to the random question that was grabbed.
    //currQuestion = questionBank[questionIndex];
    currQuestion = questionBank[questionCounter];

    //Set the question innerHTML to the currQuestion variable question.
    question.innerHTML = currQuestion.question;

    //Array splice method that removes an element from the array. So it uses random number that we created to get a number that is placed first to grab the index of where you want to remove the element and then after comma you tell it how many elements you want to remove.
    questionBank.splice(questionCounter, 1);

    //Loops through 4 times and sets the innertext of each button to be the different choices in the object array. 
    for (var i = 0; i < 4; i++) {
        var choicesLister = choices[i];
        choicesLister.innerHTML = currQuestion.choices[i];
    }
}

//For loop that runs through the document query selector all of choices and adds an event listerner to each choice button that listens for a click and runs the submit answer function
for (var i = 0; i < choices.length; i++) {
    choices[i].addEventListener('click', submitAnswer);
}

//This function runs when a choice is clicked
function submitAnswer(e) {
    console.log(e);
    console.log(e.target);
    console.log(e.target.innerHTML);
    //When you click the button it grabs the event which is itself then then target within the event and then the innerHTML that is within the target and gives you a string back
    var userSubmittedAnswer = e.target.innerHTML;
    //Grabs the current question object and grabs the answer out of that object
    var answer = currQuestion.answer;

    //Conditional logic if the answers equal each other then do this. If not then do this.
    if (userSubmittedAnswer === answer) {
        console.log('correct answer');
        generateQuestions();
        score++;
    } else {
        console.log('incorrect answer');
        generateQuestions();
        timer -= 10;
    }
}

function gameOver() {
    gameOverContainer.classList.remove('hide');
    formContainer.classList.remove('hide');
    questionsContainer.classList.add('hide');
    gameOverHeading.innerHTML = "Game is over!"
    gameOverParagraph.innerHTML = "Your final score is " + score;
}

//function that sets item in the local storage as a string. /*PROBLEM IM HAVING IS THAT ITS NOT STORING MORE THEN ONE NAME AND SCORE WHEN YOU CLIKC SUBMIT*/
function submitInitial(e) {
    e.preventDefault();
    var nickname = [{
        name: gameOverInitial.value,
        score: score
    }];
    localStorage.setItem("nickName", JSON.stringify(nickname));
    highScore();


}

function highScore() {
    highscoreContainer.classList.remove('hide');
    gameOverContainer.classList.add('hide');
    formContainer.classList.add('hide');

    var highscoreGetItem = JSON.parse(localStorage.getItem("nickName"));
    //console.log(test);
    //console.log(test.length);
    //console.log(test[0]);
    //console.log(highscoreList[0].name);     

    for (var i = 0; i < highscoreGetItem.length; i++) {
        highscoreList = highscoreGetItem[highscoreCounter];
        highscoreGetItem.splice(highscoreCounter, 1);
        var highscoreName = highscoreList.name;
        var highscoreScore = highscoreList.score;
        var highscoreTitle = document.createElement('p');
        var highscorePoints = document.createElement('p');
        highscoreTitle.classList.add('#highscoreName');
        highscorePoints.classList.add('#highscoreScore');
        highscoreTitle.textContent = highscoreName;
        highscorePoints.textContent = highscoreScore;
        console.log(highscoreTitle);
        console.log(highscorePoints);
        highscoreTable.append(highscoreTitle);
        highscoreTable.append(highscorePoints);

    }
}

function restart(){
    highscoreContainer.classList.add('hide');
    startContainer.classList.remove('hide');
}

//HIGHSCORE SOLUTION could be once its set in the local storage and it gets parsed back to an object we can save the object in an empty object and save the highscores in the variable there.

//Create a game over function that runs the end screen once you run out of time or you finish the quiz

//Dont have to use randomly get the questions. They can all be the same.

//Create the html out for that game over section but hide it first and only show it when the user meets the requirement to get to the end.


//Timer variable 
function timerCountdown() {
    var gameOverCheck = gameOverContainer.classList[0];
    var timeInterval = setInterval(function () {
        timer--;
        displayTimer.textContent = 'Time left: ' + timer;
        if (timer <= 0) {
            clearInterval(timeInterval)
            console.log('It went to the countdown');
            if (gameOverCheck === 'hide') {
                gameOver();
            } else {
                console.log('Game over Screen is already active');
            }
        }
    }, 1000)
}