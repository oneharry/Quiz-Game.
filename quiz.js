const questions = [
    {
        question: "Which city was the Covid-19 identified",
        options: ["Fuzhou","Wuhan","Quanzhou","Tianjin"],
        correct: 1
    },
    {
        question: "Which of these is NOT true about Covid-19",
        options: ["It's an infectious viral disease","It can infect both young and old",
        "Primarily spreads through droplets from infected persons","5G network is a primary cause of Covid-19"],
        correct: 3
    },
    {
        question: "Which is a serious symptom(s) of Covid-19",
        options: ["Difficulty in Breathing","Headache and Stomachache","Weakness","Nausea"],
        correct: 0
    },   
    {
        question: "These are preventive measures against Covid-19 except",
        options: ["Take enough alcohol","Wash hands regularly","Observe Social distance","Avoid touching your face"],
        correct: 0
    },
    {
        question: "Which agency is responsible for the control of Covid-19 in Nigeria?",
        options: ["National Centre for Disease Control", "Nigeria Centre for Disease Control","National Control for Disease Centre","National Control for Disease Centre"],
        correct: 1
    }
]

//Getting the target html elements and declaring and initializing variables
let totalquestionnumber = questions.length;
let options = document.querySelector(".options").children;
let question = document.querySelector(".question")
let option1 = document.querySelector(".one")
let option2 = document.querySelector(".two")
let option3 = document.querySelector(".three")
let option4 = document.querySelector(".four")
let currentpage = document.querySelector(".spancount");
let totalpage = document.querySelector(".spantotal");
let counter = 0;
let index;
let nextBtn = document.querySelector("#btn")
let indexArray = [];
let theEnd = document.querySelector(".the-end");
let playbtn = document.querySelector(".play")
let playScore = 0;
let questioncount = document.querySelector(".counter")
let scoreboard = document.querySelector(".scoreboard");
let myarr = [];


//Next button listens to event when clicked
nextBtn.addEventListener("click", getNextQuestion)

//assign total number of questions to the qestion tracker html
totalpage.innerHTML = questions.length;

//loading the questions and options.
//counter is incremented everytime
function load() {
    currentpage.innerHTML=counter +1;
    question.innerHTML = questions[index].question;
    option1.innerHTML = questions[index].options[0];
    option2.innerHTML = questions[index].options[1]
    option3.innerHTML = questions[index].options[2]
    option4.innerHTML = questions[index].options[3]
    counter++;
    
}


//checking for the option clicked 
//effecting color change
//checkAnswe function called on each div in html
function checkAnswer (item) {
    if (item.id == questions[index].correct) {
        //add correct classname when the correct answer is chosen
        //each question has four marks
        item.classList.add("correct")
        playScore += 1;
    
    } else {
         // add wrong classname to 
         item.classList.add("wrong")
         
         
    }
    // disable other options once one is selected
    // only one selection must be made
    disableOptions()

    
}

function disableOptions (){
    for(let i = 0; i < options.length; i++) {
        //adds classname disable to the options
        options[i].classList.add("disable")
        //making sure the correct answer is given the classname correct
        if(options[i].id == questions[index].correct){
            options[i].classList.add("correct");
        }
        
    }
}

//allows selection in a new question
function enableOptions (){
    for(let i = 0; i < options.length; i++) {
        //removes all classnames
        options[i].classList.remove("disable");
        options[i].classList.remove("correct");
        options[i].classList.remove("wrong");

        
    }
}


//accesses the next question
function getNextQuestion() {
    for(let i = 0; i < options.length; i++) {
        //selection must be made on current question before selecting next
        if(!options[0].classList.contains("disable")) {
            // alert("answer");
        } else {
            //get a random question
            //enable options for selection
            getRandomQuestion()
            enableOptions()
        }
    }
   
}


// access questions randomly
function getRandomQuestion () {
    //randomly gets question numbers from the array
    let randomNumber = Math.floor(Math.random()*totalquestionnumber)
    //determinant is just a "tool" to ensure one question is not repeated
    let determinant = 0;
    //checks if max number of question has been attempted
    //end Quiz
    if (counter == totalquestionnumber) {

        quizEnd();
    } else {
        if(indexArray.length > 0) {
            for(let i =0; i < indexArray.length; i++) {
                //stops the run if question at the index has been asked
                if (indexArray.includes(randomNumber)) {
                    determinant = 1;
                    break;
                }
    
            }
            //reruns the function
            if (determinant == 1) {
                getRandomQuestion()


            } else {
                index = randomNumber;
                load()
            
            }
            
        }
        if (indexArray.length ==0) {
            index = randomNumber;
            load()
        
        }
        indexArray.push(randomNumber)
        
    }
       
}


//display the score after the last question
// add  classname to the div,  displays the scoreboard
function quizEnd() {
    theEnd.classList.add("endshow");
    scoreboard.innerHTML = playScore;
}

//playAgain button, restart the game when clicked
playbtn.addEventListener("click", function(){
    window.location.reload();
})

//displays the question upon window load
window.onload=function(){
    getRandomQuestion()
}










































