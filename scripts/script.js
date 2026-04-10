

// globale Variablen 
let root;
let iconOpenEye;
let iconClosedEye;

// DOM aufbauen:
document.addEventListener("DOMContentLoaded", init);

function init(){
    // we now have access to the DOM tree!
    // set up your initial document event handlers here.
    const themeToggle = document.querySelector("#theme-toggle");
      if (themeToggle) {
        themeToggle.addEventListener("click", switchTheme);
    } else {
        console.log("Theme Toggle button not found!");
    }

    root = document.querySelector(":root");
    iconOpenEye = document.querySelector(".icon-eye-dark");
    iconClosedEye = document.querySelector(".icon-eye-light");

    const savedColorScheme = localStorage.getItem("color-scheme"); 
    if(savedColorScheme === "dark"){
        root.setAttribute("color-scheme", "dark");
        openEye();
    } else {
        closeEye();
    }
    
};

function switchTheme(){
    console.log("switchTheme called")
    if(root.getAttribute("color-scheme") !== "dark"){
        root.setAttribute("color-scheme", "dark");
        localStorage.setItem("color-scheme", "dark");
        openEye();
    } else {
        root.setAttribute("color-scheme", "light");
        localStorage.setItem("color-scheme", "light");
        closeEye();
    }
}

function openEye(){
    iconOpenEye.style.display = 'flex';
    iconClosedEye.style.display = 'none';
}

function closeEye(){
    iconOpenEye.style.display = 'none';
    iconClosedEye.style.display = 'flex';
}