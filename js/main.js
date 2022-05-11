
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCZ8xZdD4OnnD3oOY8Wm0jEmtyW4dUHnnI",
  authDomain: "tallershop-web.firebaseapp.com",
  projectId: "tallershop-web",
  storageBucket: "tallershop-web.appspot.com",
  messagingSenderId: "452610476628",
  appId: "1:452610476628:web:13ad7b2d935460c9da7bc1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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