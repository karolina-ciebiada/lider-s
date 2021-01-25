import '../scss/main.scss';



// uncomment the lines below to enable PWA
// import {registerSW} from './pwa.js';
// registerSW();

/* place your code below */

console.log('HELLO 🚀')
const ham = document.querySelector('.ham--js');

ham.addEventListener('click', () => {
    const nav = document.querySelector('.navigation--js');
    nav.classList.toggle('navigation--open');
});
const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
  if(!menuOpen) {
    menuBtn.classList.add('open');
    menuOpen = true;
  } else {
    menuBtn.classList.remove('open');
    menuOpen = false;
  }
});


const slideshowImages = document.querySelectorAll(".intro-slideshow img");

const nextImageDelay = 5000;
let currentImageCounter = 0; // setting a variable to keep track of the current image (slide)

// slideshowImages[currentImageCounter].style.display = "block";
slideshowImages[currentImageCounter].style.opacity = 1;

setInterval(nextImage, nextImageDelay);

function nextImage() {
  // slideshowImages[currentImageCounter].style.display = "none";
  slideshowImages[currentImageCounter].style.opacity = 0;

  currentImageCounter = (currentImageCounter+1) % slideshowImages.length;

  // slideshowImages[currentImageCounter].style.display = "block";
  slideshowImages[currentImageCounter].style.opacity = 1;
}






window.addEventListener('scroll', function () {
  let stripe = document.querySelector('.stats__stripe');
  let stripeTwo = document.querySelector('.stats__stripe2');
  let stripeThree = document.querySelector('.stats__stripe3');
  let stripeFour = document.querySelector('.stats__stripe4');
  let stripeFive = document.querySelector('.stats__stripe5');
  let stripeSix = document.querySelector('.stats__stripe6');
  let windowPosition = window.scrollY > 1500;
  stripe.classList.toggle('stripe-ani', windowPosition);
  stripeTwo.classList.toggle('stripe-ani2', windowPosition);
  stripeThree.classList.toggle('stripe-ani3', windowPosition);
  stripeFour.classList.toggle('stripe-ani4', windowPosition);
  stripeFive.classList.toggle('stripe-ani5', windowPosition);
  stripeSix.classList.toggle('stripe-ani5', windowPosition);
});


