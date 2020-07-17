let burger = document.getElementById('burger');
let nav = document.getElementsByClassName('links')[0];

let burgerLine1 = document.getElementById('line1');
let burgerLine2 = document.getElementById('line2');
let burgerLine3 = document.getElementById('line3');

burger.addEventListener('click', muoviNav);
burger.addEventListener('click', animaBurger);


function muoviNav(){
  nav.style.transitionDuration = "750ms";
  nav.classList.toggle('links-trans');  
  
  setTimeout( ()=>{
    nav.style.transitionDuration = "0ms";
  }, 750);

}

function animaBurger(){
  burgerLine1.style.transitionDuration= "500ms";
  burgerLine2.style.transitionDuration= "500ms";
  burgerLine3.style.transitionDuration= "500ms";
  burgerLine1.classList.toggle('secondary-line1');
  burgerLine2.classList.toggle('secondary-line2');
  burgerLine3.classList.toggle('secondary-line3');

  setTimeout( ()=>{
    burgerLine1.style.transitionDuration = "0ms";
    burgerLine2.style.transitionDuration = "0ms";
    burgerLine3.style.transitionDuration = "0ms";
  }, 500);

}

