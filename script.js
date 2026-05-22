/* MOBILE MENU */

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

  navMenu.classList.toggle("active");

});


/* CLOSE MENU */

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

  link.addEventListener("click", () => {

    navMenu.classList.remove("active");

  });

});


/* HEADER SHADOW */

window.addEventListener("scroll", () => {

  const header = document.querySelector(".header");

  if(window.scrollY > 50){

    header.style.boxShadow =
    "0 10px 30px rgba(0,0,0,0.08)";

  }else{

    header.style.boxShadow = "none";

  }

});


/* ADD TO CART BUTTON */

const addButtons = document.querySelectorAll(".add-btn");

addButtons.forEach(button => {

  button.addEventListener("click", () => {

    button.innerHTML = "✓";

    button.style.background = "#22c55e";

    setTimeout(() => {

      button.innerHTML = "+";

      button.style.background = "#f97316";

    },1000);

  });

});


console.log("FoodHub Website Loaded Successfully 🚀");