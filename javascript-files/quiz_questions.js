//initialize objects to store question details
var question1 = {
    number: 1,
    question: "What is CSS stands for",
    option_a: "Styling sheets",
    option_b: "Computer styling Sheets",
    option_c: "Cascading style sheet",
    answer: "a",
    image_url: "../assets/honey_lines.png"
}

var question2 = {
  number: 2,
  question: "What does HTML stands for?",
  option_a: "Hyper text Markup Language",
  option_b: "hypert text making language",
  option_c: "High level language",
  answer: "a",
  image_url: "../assets/flowerpot.png",
};
var question3 = {
  number: 3,
  question: "Who is the father of Computer",
  option_a: "Mark zucker berg",
  option_b: "Charles babage",
  option_c: "Bill Gates",
  answer: "b",
  image_url: "../assets/football.png",
};
var question4 = {
    number: 4,
    question: "www stands for",
    option_a: "INTERNET",
    option_b: "world world world",
    option_c: "World Wide Web",
    answer: "c",
    image_url: "../assets/windows_and_leaves.png"
}
var question5 = {
    number: 5,
    question: "The capital of Pakistan is?",
    option_a: "Lahore",
    option_b: "Karachi",
    option_c: "Islamabad",
    answer: "c",
    image_url: "../assets/clothes_on_lines.png"
}

//define variables for array of user answers, current question number and total score
let user_answers = []
let qnumber = 1;
let score = 0;


//function called on click of submit button in questions.html page
function submitResponse(event) {
    event.preventDefault()

    var val = "";

    //get the radio button that is selected on the questions page (user answer)
    radios = document.getElementsByClassName("option_select")
    for (var i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) { 
            val = radios[i].value;

            //deselect the radio button so it doesn't appear selected for the next question
            radios[i].checked = false
            break; 
        }
    }
    storeResponse(val)
    changeQuestion(qnumber+1)
    qnumber = qnumber + 1;
    if (qnumber==6){
        computeResult()
        return
    }
    return
}


//store user answer in the array
function storeResponse(val){
    user_answers.push(val)
    return
}

//compare user answers with the correct answers defined
function computeResult(){
    if (user_answers[0] == question1.answer){
        score += 1
    }
    if (user_answers[1] == question2.answer){
        score += 1
    }
    if (user_answers[2] == question3.answer){
        score += 1
    }
    if (user_answers[3] == question4.answer){
        score += 1
    }
    if (user_answers[4] == question5.answer){
        score += 1
    }

    //get username from session storage and call function to store user score with the username
    //key field will be username+"score"
    let userNameScore = sessionStorage.getItem("username")+"score"
    storeScoreDetails(score, userNameScore)

    //store user score in session storage
    sessionStorage.setItem("score", score)
    outputScore()
    return
}

//redirect to results page
function outputScore(){
    window.location.href = "result_page.html"
    return
}

//display score on results page
function changeScore(event){
    event.preventDefault()
    let scoreN = 0
    
    if (!sessionStorage.getItem("score")){
        scoreN = 0
    }
    else{
        scoreN = sessionStorage.getItem("score")
    }

    let compliment = getCompliment(scoreN)
    console.log(compliment)
    document.getElementById("result").innerHTML = scoreN+ "/5"
    document.getElementById("comment").innerHTML = compliment
    return
}


//function changes the question, options and background image on the page
function changeQuestion(number) {
    if (number==1){
        document.getElementById("question_heading").innerHTML = "Question " + number
        document.getElementById("question_text").innerHTML = question1.question
        document.getElementById("option_a_label").innerHTML = question1.option_a
        document.getElementById("option_b_label").innerHTML = question1.option_b
        document.getElementById("option_c_label").innerHTML = question1.option_c
        document.getElementById("html_").style.backgroundImage = "url("+question1.image_url+")"
    }
    else if (number==2){
        document.getElementById("question_heading").innerHTML = "Question " + number
        document.getElementById("question_text").innerHTML = question2.question
        document.getElementById("option_a_label").innerHTML = question2.option_a
        document.getElementById("option_b_label").innerHTML = question2.option_b
        document.getElementById("option_c_label").innerHTML = question2.option_c
        document.getElementById("html_").style.backgroundImage = "url("+question2.image_url+")"
    }
    else if (number==3){
        document.getElementById("question_heading").innerHTML = "Question " + number
        document.getElementById("question_text").innerHTML = question3.question
        document.getElementById("option_a_label").innerHTML = question3.option_a
        document.getElementById("option_b_label").innerHTML = question3.option_b
        document.getElementById("option_c_label").innerHTML = question3.option_c
        document.getElementById("html_").style.backgroundImage = "url("+question3.image_url+")"
    }
    else if (number==4){
        document.getElementById("question_heading").innerHTML = "Question " + number
        document.getElementById("question_text").innerHTML = question4.question
        document.getElementById("option_a_label").innerHTML = question4.option_a
        document.getElementById("option_b_label").innerHTML = question4.option_b
        document.getElementById("option_c_label").innerHTML = question4.option_c
        document.getElementById("html_").style.backgroundImage = "url("+question4.image_url+")"
    }
    else if (number==5){
        document.getElementById("question_heading").innerHTML = "Question " + number
        document.getElementById("question_text").innerHTML = question5.question
        document.getElementById("option_a_label").innerHTML = question5.option_a
        document.getElementById("option_b_label").innerHTML = question5.option_b
        document.getElementById("option_c_label").innerHTML = question5.option_c
        document.getElementById("html_").style.backgroundImage = "url("+question5.image_url+")"
    }
    else{
        return
    }
    return
}


//store user score details in local storage
function storeScoreDetails(score, userNameScore){

    //get the date for "day quiz was taken"
    let timeElapsed = Date.now()
    let today = new Date(timeElapsed)
    let date = today.toDateString()

    //convert the score to percentage for "grade"
    let points = (score/5)*100

    //check if user already has previous scores in local storage, then append new score to the array
    if (localStorage.getItem(userNameScore)){
        let user_details = JSON.parse(localStorage.getItem(userNameScore))
        user_details.push([date, score, points+"%"])
        localStorage.setItem(userNameScore, JSON.stringify(user_details))
    }

    //if not create a new array for the user score details
    else {
        let userdetails = [[date, score, points+"%"]]
        localStorage.setItem(userNameScore, JSON.stringify(userdetails))
    }

    return
}


//function if user is not logged in; redirect to home page(landing page)
function checkIfLoggedIn(event){
    event.preventDefault()
    if (!sessionStorage.getItem("username")){
        window.location.href = "landing_page.html"
        return
    }
    return
}

//function called on click of OK button on result_page.html
function goToDashboard(event){
    event.preventDefault()

    window.location.href = "quiz_home.html"
    return
}

//function to fill up the table of user scores on the user dashboard
function fillTable(event){
    event.preventDefault()

    //get username from session storage. Key item is username
    document.getElementById("welcome").innerHTML = sessionStorage.getItem("username") + ","
    let user_key = sessionStorage.getItem("username")

    //get user scroe details from local storage. Key item is username+"score"
    let user_details = JSON.parse(localStorage.getItem(user_key+"score"))

    for(i=0; i<user_details.length; i++){
        var table = document.getElementById("scoreTable")
        var row = table.insertRow(i+1)
        var cell1 = row.insertCell(0)
        var cell2 = row.insertCell(1)
        var cell3 = row.insertCell(2)
        var cell4 = row.insertCell(3)

        cell1.innerHTML = i+1
        cell2.innerHTML = user_details[i][0]
        cell3.innerHTML = user_details[i][1]
        cell4.innerHTML = user_details[i][2]
    }
    return
}


//function redirects to quiz page. Called on click of LET'S DO THIS! button on quiz_home.html
function goToQuestions(event){
    event.preventDefault()

    window.location.href = "question.html"
    return
}

function goToHome(event){
    event.preventDefault()

    sessionStorage.clear()
    window.location.href = "landing_page.html"
    return
}

function signUserOut(event){
    event.preventDefault()

    sessionStorage.clear()
    window.location.href = "log_in.html"
    return
}

//function to get complimet to display on results page
function getCompliment(score){
    let compliment=""
    if(score==5||score==4){
        compliment = "Nice one! You're truly a Whiz!"
    }

    else if(score==3||score==2){
        compliment = "Well done. You can do better!"
    }
    else if(score==0||score==1){
        compliment = "Oops! Do you want to try again?"
    }
    return compliment
}

