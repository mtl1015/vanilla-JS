const loginForm = document.getElementById("login-form");
const loginInput = loginForm.querySelector("input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASS = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event)
{
    event.preventDefault();
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    loginForm.classList.add(HIDDEN_CLASS);
    paintGreetings(username);
}

function paintGreetings(username)
{
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASS);
}

const localStorageUsername = localStorage.getItem(USERNAME_KEY);
if(localStorageUsername === null)
{
    loginForm.classList.remove(HIDDEN_CLASS);
    loginForm.addEventListener("submit",onLoginSubmit);
}
else
{
    paintGreetings(localStorageUsername);

}
localStorage.removeItem(USERNAME_KEY);
