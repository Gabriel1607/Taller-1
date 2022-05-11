
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

  const name = registerForm.uname.value;
  const email = registerForm.email.value;
  const password = registerForm.psw.value;

  const userInfo = {
      name,
      email,
      password,
      isAdmin: false,
  };

  const newUser = await createUser(auth, userInfo);
  await addUserToDatabase(db, newUser.uid, userInfo);

  alert(`Bienvenido, ${name}`);
  // window.location.href = "/products.html";
});
loginForm.addEventListener("submit", e => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.psw.value;
  //console.log(`${email}${password}`)
  login(auth, email, password);
});