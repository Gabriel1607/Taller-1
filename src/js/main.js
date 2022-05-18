
import { async } from "@firebase/util";
import { doc } from "firebase/firestore";
import { db, auth } from "./functions/app";
import { login, createUser, addUserToDatabase, onAuthStateChanged, signOut } from "./functions/auth";
import { getUser } from "./functions/getUser";
const user = auth.currentUser;
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const signoutBtn = document.getElementById("signoutBtn");
const greetTxt = document.getElementById("currentUserGreet");
const loggedHide = document.getElementsByClassName("container__LoggedForm")
const notloggedHide = document.getElementsByClassName("container__noLoggedForm")
var slideIndex = 0;
carousel();

function carousel() {
 // console.log(loggedHide);
  //console.log(auth.currentUser);
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
signoutBtn.addEventListener("click", async e =>{
  e.preventDefault();
  signOut(auth).then(() => {
    location.href = "../../index.html"
  }).catch((err) => {
console.log(err);
  });
  
});
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

  // window.location.href = "/products.html";
  onAuthStateChanged(auth,async (user) => {
    if (user) {
  
      const uid = user.uid;
      let user2 = [];
      const firebaseUser = await getUser(uid);
      user2 = firebaseUser;
     if(user2.isAdmin){
       location.href = "../../form.html"
     }else{
      location.href = "../../index.html"
     }
    
      
    } 
  });
});
loginForm.addEventListener("submit", e => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.psw.value;
  //console.log(`${email}${password}`)
  login(auth, email, password);

onAuthStateChanged(auth,async (user) => {
  if (user) {

    const uid = user.uid;
    let user2 = [];
    const firebaseUser = await getUser(uid);
    user2 = firebaseUser;
   if(user2.isAdmin){
     location.href = "../../form.html"
   }else{
    location.href = "../../index.html"
   }
  
    
  } 
});
});
onAuthStateChanged(auth,async (user) => {
  if (user) {
    const uid = user.uid;
    let user2 = [];
    const firebaseUser = await getUser(uid);
    user2 = firebaseUser;
for (let index = 0; index < loggedHide.length; index++) {
  loggedHide[index].style.display="block";
}
greetTxt.innerHTML =`Bienvenid@, ${user2.name}`
for (let index = 0; index < notloggedHide.length; index++) {
  notloggedHide[index].style.display="none";
}
    
  } 
});