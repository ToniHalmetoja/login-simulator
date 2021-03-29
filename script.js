const navMenu = document.getElementById("menu");
const inputForm = document.getElementById("inputForm");
const regForm = document.getElementById("regForm");
const logInOut = document.getElementById("login");

var loginStatus = document.getElementById("loginStatus");
var secretContent = document.getElementById("secretContent");

var formUser;
var formPass;
var loginButton;
var logoutButton;
var regButton;
var newUser;
var newPass;
var regBut;
var cancelBut;

var users = [{
        un: "Janne",
        pw: "test"
    },
    {
        un: "Toni",
        pw: "utter"
    },
    {
        un: "1337hax",
        pw: "swordfish"
    },
    {
        un: "AzureDiamond",
        pw: "hunter2"
    }
]

if (JSON.parse(localStorage.getItem("users") == null)) {
    localStorage.setItem("users", JSON.stringify(users));
} else {
    users = JSON.parse(localStorage.getItem("users"));
}

if (localStorage.getItem("user") != null) {
    showLoggedIn();
} else {
    showNotLoggedIn();
}

function showLoggedIn() {
    logoutButton = document.createElement("button");
    logoutButton.innerHTML = "Log out";
    inputForm.append(logoutButton);
    logoutButton.addEventListener("click", logOut);
    loginStatus.innerHTML = "You are logged in, " + localStorage.getItem("user") + "! Enjoy these pictures of otters!";
    secretContent.innerHTML = '<img src=\'otter.jpg\' height=\'600\' width=\'600\'><img src=\'otter2.jpg\' height=\'600\' width=\'600\'><img src=\'otter3.jpg\' height=\'600\' width=\'600\'>';
}

function showRegister() {
    clearLogin();
    secretContent.innerHTML = "";
    newUser = document.createElement("input");
    newPass = document.createElement("input");
    regBut = document.createElement("button");
    cancelBut = document.createElement("button");
    newUser.placeholder = "New username";
    newPass.placeholder = "New password";
    newPass.type = "password";
    newUser.type = "text";
    cancelBut.innerHTML = "Cancel";
    regBut.innerHTML = "Register!"
    loginStatus.innerHTML = "Enter a new username and password!";
    regForm.append(newUser);
    regForm.append(newPass);
    regForm.append(regBut);
    regForm.append(cancelBut);
    regBut.addEventListener("click", register);
    cancelBut.addEventListener("click", cancel);
}

function showNotLoggedIn() {
    formUser = document.createElement("input");
    formUser.placeholder = "Username";
    formUser.type = "text";
    formUser.autoComplete = "off";
    inputForm.append(formUser);

    formPass = document.createElement("input");
    formPass.placeholder = "Password";
    formPass.type = "password";
    formPass.autoComplete = "off";
    inputForm.append(formPass);

    loginButton = document.createElement("button");
    loginButton.innerHTML = "Log in";
    inputForm.append(loginButton);
    loginButton.addEventListener("click", checkLogin);

    regButton = document.createElement("button");
    regButton.innerHTML = "Register";
    inputForm.append(regButton);
    regButton.addEventListener("click", showRegister);

    loginStatus.innerHTML = "Please log in, unknown user!";
    secretContent.innerHTML = "";

}

function logOut() {
    clearLogout();
    showNotLoggedIn();
    loginStatus.innerHTML = "You've been logged out!";
    localStorage.removeItem("user");
}

function cancel() {
    newUser.remove();
    newPass.remove();
    regBut.remove();
    cancelBut.remove();
    showNotLoggedIn();
}

function checkLogin() {
    let attemptUser = formUser.value;
    let attemptPass = formPass.value;
    let valid = 0;
    if (attemptUser != false && attemptPass != false) {
        for (i in users) {
            if (users[i].un == attemptUser && users[i].pw == attemptPass) {
                valid = 1;
                localStorage.setItem("user", users[i].un);
                clearLogin();
                showLoggedIn();
            }
        }
        if (valid == 0) {
            loginStatus.innerHTML = "Incorrect username or password!";
        }
    } else {
        loginStatus.innerHTML = "Please fill in both username and password!";
    }
}

function clearLogin() {
    formUser.remove();
    formPass.remove();
    loginButton.remove();
    regButton.remove();
}

function clearLogout() {
    logoutButton.remove();
}

function register() {
    let newUserT = newUser.value;
    let newPassT = newPass.value;
    for (i in users) {

        if (newUserT == false || newPassT == false) {
            loginStatus.innerHTML = "Fields cannot be empty! Enter a new username and password to register.";
            break;
        } else {

            if (newUserT == users[i].un) {
                loginStatus.innerHTML = "Username already exists! Choose a different one.";
                break;
            } else {

                let answer = confirm("Register new account with username '" + newUserT + "' and password '" + newPassT + "'?");
                if (answer == true) {
                    users.push({
                        un: newUserT,
                        pw: newPassT,
                    });
                    localStorage.setItem("users", JSON.stringify(users));
                    cancel();
                    loginStatus.innerHTML = "You have registered. Please log in with your new username and password.";
                    break;
                }
            }
        }
    }
}