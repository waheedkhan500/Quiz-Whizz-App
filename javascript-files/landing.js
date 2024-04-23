//function called on click of SIGN UP button in landing_page.html
function goToSignup(event){  
    event.preventDefault()
    window.location.href = "sign_up.html"
    return
}


/* preventDefault() tells the user agent that if the event does not get explicitly handled,
its default action should not be taken as it normally would be. */


//function called on click of LOG IN button in landing_page.html
function goToLogin(event){
    event.preventDefault()
    window.location.href = "log_in.html"
    return
}
