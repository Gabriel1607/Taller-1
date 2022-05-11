
import { db, auth } from "./functions/app";
import { login, createUser, addUserToDatabase } from "./functions/auth";
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
var slideIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("slide");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1}
  x[slideIndex-1].style.display = "block";
  setTimeout(carousel, 2000); // Change image every 2 seconds
}

registerForm.addEventListener("submit", async e => {
  e.preventDefault();

  const email = registerForm.email.value;
  const password = loginForm.password.value;

  login(auth, email, password);
})