//function called on click of LOG IN button in log_in.html
function loginUser(event){
    event.preventDefault()
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    //check if username and password fields are empty
    if(!username||!password){
        alert("Please fill all details");
        return;
    }
    
    let user_name=loginAction()
    
    //if user is registered and password is correct
    if(user_name){
        //save username of user that is logged in to session storage
        sessionStorage.setItem("username", user_name)
        window.location.href = "quiz_home.html"
    return;
    }
    else{
        alert("Log in failed. Please try again.")
    }
    return;  
}


//function checks if user is registered and password is correct
function loginAction(){
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    //check whether the username has been registered as a user in the local storage
    let userdetails = JSON.parse(localStorage.getItem(username))
    if (!userdetails){
        return false;
    }

    //check if password entered on login is the same as that saved with user details in the local storage
    if (password != userdetails[2]){
        return false;
    }

    //return the username. false is returned if user is not registered or password is false
    return (userdetails[0]);
}


//function called on click of SIGN UP button in sign_up.html
function signupUser(event){
    event.preventDefault()
    if (!validateForm(event)){
        return;
    }
    if(signupAction()){
        alert("It's great to have you! Just one more step :)")
        window.location.href = "log_in.html"
        return;
    }
    else{
        alert("Sign up failed. Please try again.")
    return;
    }
    return;
    
}


//function checks if username is available. There should be no duplication of username in localstorage
function signupAction(){
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let checkbox = document.getElementById("checkbox").checked;

    let userdetails = [username, email, password, checkbox]

    //username exists already
    if (localStorage.getItem(username)){
        return false;
    }

    localStorage.setItem(username, JSON.stringify(userdetails))
    return true;
}

//function validates if all fields are filled
function validateForm(event){
    event.preventDefault();
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let checkbox = document.getElementById("checkbox").checked;
    

if(!username||!email||!password||!checkbox){
        alert("Please fill all details and agree to our Terms and Conditions");
        return false;
    }
    else{
        return true;
    }
}