



const signinBtn = document.querySelector('#signin');
const signupBtn = document.querySelector('#signup');
const facebookBtn = document.querySelector('#facebook');
const googleBtn = document.querySelector('#google');
const twitterBtn = document.querySelector('#twitter');
const githubBtn = document.querySelector('#github');
const numberForm = document.querySelector('#telephoneForm');
const numberbtn = document.querySelector('#number');
const anonymousBtn = document.querySelector('#anonymous');
const signoutBtn = document.querySelector("#logout")

let currentView = "signin"


//user details
let userIDContainer = document.createElement("div");
let useremailContainer = document.createElement("div");
let usernameContainer = document.createElement("div");
let userContainer = document.querySelector("#user");

userContainer.appendChild(useremailContainer);
userContainer.appendChild(userIDContainer);
userContainer.appendChild(usernameContainer)
//email & pass create
signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    if(password && email){
        signupBtn.disabled = true;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            userIDContainer.innerHTML = "UserID: " +  user.uid;
            useremailContainer.innerHTML = "Email: " + email
            console.log(user)
            alert("successfully logged in")
            signupBtn.removeAttribute('disabled');
            currentView = "loggedin";
            render();
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            console.log(errorCode)
            var errorMessage = error.message;
            alert(errorMessage)
            // ..
            signupBtn.removeAttribute('disabled');
        });

    }
    else{
        alert("Both email and password is required")
    }
})


//signin
signinBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    if(password && email){
        signinBtn.disabled = true;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user)
            alert("successfully logged in")
            userIDContainer.innerHTML = "UserID: " +  user.uid;
            useremailContainer.innerHTML = "Email: " + email
            signinBtn.removeAttribute("disabled")
            currentView = "loggedin";
            render();
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            console.log(errorCode)
            var errorMessage = error.message;
            alert(errorMessage)
            signinBtn.removeAttribute('disabled');
        });
    }
    else{
        alert("Both email and password is required")
    }

} )

//phone auth
numberForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const telephone = document.querySelector('#telephone').value;
    if(telephone === ""){
        alert("Telephone Number is required");
        return 0
    }
    else{
        numberbtn.setAttribute("disabled", true)
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('number', {
            'size': 'invisible',
            'callback': (response) => {
              onSignInSubmit();
            }
          });
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(telephone, appVerifier)
            .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            const code = prompt("Enter code ");
                confirmationResult.confirm(code).then((result) => {
                // User signed in successfully.
                    const user = result.user;
                    console.log(user)
                    userIDContainer.innerHTML = "UserID: " +  user.uid;
                    useremailContainer.innerHTML = "Telephone: " + telephone
                    alert("successfully logged in")
                    currentView = "loggedin";
                    render();
                // ...
                numberbtn.setAttribute("disabled", false)
                }).catch((error) => {
                    console.log(error)
                    alert(error.message)
                    numberbtn.setAttribute("disabled", false)
                });
            window.confirmationResult = confirmationResult;
            // ...
            }).catch((error) => {
                alert(error.code)
               console.log(error);
               grecaptcha.reset(window.recaptchaWidgetId);
               numberbtn.setAttribute("disabled", false)
            });
    

    }
   
})


facebookBtn.addEventListener("click", () => {
    facebookBtn.disabled = true;
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    var token = credential.accessToken;
    console.log(token)
    // The signed-in user info.
    var user = result.user;
    userIDContainer.innerHTML = "UserID: " +  user.uid;
    useremailContainer.innerHTML = "Email: " + user.email;
    usernameContainer.innerHTML = "Username:" + user.displayName
    console.log(user);
    currentView = "loggedin";
    render();
    alert("successfully logged in")

   facebookBtn.removeAttribute('disabled');
    // ...
  }).catch((error) => {
    // Handle Errors here.
    alert(error.message)
    console.log(error)
    facebookBtn.removeAttribute('disabled');
  });
   
})

googleBtn.addEventListener("click", () => {
    googleBtn.disabled = true;
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    var token = credential.accessToken;
    console.log(token)

    currentView = "loggedin";
    render();
    // The signed-in user info.
    var user = result.user;
    console.log(user);
    userIDContainer.innerHTML = "UserID: " +  user.uid;
    useremailContainer.innerHTML = "Email: " + user.email;
    usernameContainer.innerHTML = "Username:" + user.displayName
    alert("successfully logged in")
   googleBtn.removeAttribute('disabled');
    // ...
  }).catch((error) => {
    // Handle Errors here.
    alert(error.message)
    console.log(error)
    googleBtn.removeAttribute('disabled');
  });
   
   
})


twitterBtn.addEventListener("click", () => {
    twitterBtn.disabled = true;
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    var token = credential.accessToken;
    console.log(token)
    // The signed-in user info.
    var user = result.user;
    console.log(user);
    userIDContainer.innerHTML = "UserID: " +  user.uid;
    useremailContainer.innerHTML = "Email: " + user.email;
    usernameContainer.innerHTML = "Username:" + user.displayName
    currentView = "loggedin"
    render();
    alert("successfully logged in")
   twitterBtn.removeAttribute('disabled');
    // ...
  }).catch((error) => {
    // Handle Errors here.
    alert(error.message)
    console.log(error)
    twitterBtn.removeAttribute('disabled');
  });
   
})

githubBtn.addEventListener("click", () => {
    githubBtn.disabled = true;
    var provider =  new firebase.auth.GithubAuthProvider();
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    var token = credential.accessToken;
    console.log(token)
    // The signed-in user info.
    var user = result.user;
    userIDContainer.innerHTML = "UserID: " +  user.uid;
    useremailContainer.innerHTML = "Email: " + user.email;
    usernameContainer.innerHTML = "Username:" + user.displayName
    console.log(user);
    alert("successfully logged in")
    currentView = "loggedin";
    render();
   githubBtn.removeAttribute('disabled');
    // ...
  }).catch((error) => {
    // Handle Errors here.
    alert(error.message)
    console.log(error)
    githubBtn.removeAttribute('disabled');
  });
   
})

anonymousBtn.addEventListener("click", () => {         
     anonymousBtn.disabled = true;
    firebase.auth().signInAnonymously()
    .then((res) => {
      console.log(res)
      userIDContainer.innerHTML = "UserID: " +  user.uid;
      alert("successfully logged in")
      currentView = "loggedin";
      render();
      anonymousBtn.removeAttribute('disabled');
    })
    .catch((error) => {
        anonymousBtn.removeAttribute('disabled');
        alert(error.message)
        console.log(error)
      // ...
    });
  
})


signoutBtn.addEventListener("click", () => {
    firebase.auth().signOut().then(() => {
        currentView = "signin";
        alert("You are logged out")
        render();
    })
})

const render = () => {
    const signinpage = document.querySelector(".signin__page");
     const dashboard = document.querySelector(".admin__page");
    console.log("rendering")
     if(currentView === "signin"){
           signinpage.style.display = "block";
            dashboard.style.display = 
            "none";
     }
     else if(currentView === "loggedin"){
        signinpage.style.display = "none";
        dashboard.style.display = "block";
     }
     else{
        signinpage.style.display = "none";
        dashboard.style.display = 
        "none";
     }

    
}

render()
