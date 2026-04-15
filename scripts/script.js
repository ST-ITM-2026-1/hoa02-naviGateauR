

// globale Variablen 
let root;
let iconOpenEye;
let iconClosedEye;
let test;
let projectCards;


// DOM aufbauen:
document.addEventListener("DOMContentLoaded", init);

function init() {
    // we now have access to the DOM tree!
    // set up your initial document event handlers here.
    const themeToggle = document.querySelector("#theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", switchTheme);
    } else {
        console.log("Theme Toggle button not found!");
    }

    root = document.querySelector(":root");
    iconOpenEye = document.querySelector(".icon-eye-light");
    iconClosedEye = document.querySelector(".icon-eye-dark");

    const savedColorScheme = localStorage.getItem("color-scheme");
    if (savedColorScheme === "dark") {
        root.setAttribute("color-scheme", "dark");
        closeEye();
    } else {
        openEye();
    }

    test = document.querySelector(".test");
    const filterButtons = document.querySelector(".filter-buttons")
    filterButtons.addEventListener("click", handleClick);

    projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card) => console.log(card));

}

function handleClick(event) {
    if (event.target.hasAttribute("value")) {
        console.log(`button clicked: ${event.target.innerHTML}`);
        test.textContent = `Filter: ${event.target.innerHTML}`;
        filterProjects(event.target.innerHTML);
    }
}

function filterProjects(category) {
    // Falls category !== bla -> display:none
    projectCards.forEach((card) => {
        const projectCategoryTypes = card.querySelectorAll(".project-category-type");
        const categories = Array.from(projectCategoryTypes).map(elem => elem.textContent.trim());
        console.log(categories);

        if (categories.includes(category)){
                card.classList.remove("hidden");
                console.log("reached until here, filtering for:" + category)
            } else {

                card.classList.add("hidden");
            }
        }

    )
}

function switchTheme() {
    console.log("switchTheme called")
    if (root.getAttribute("color-scheme") !== "dark") {
        root.setAttribute("color-scheme", "dark");
        localStorage.setItem("color-scheme", "dark");
        closeEye();
    } else {
        root.setAttribute("color-scheme", "light");
        localStorage.setItem("color-scheme", "light");
        openEye();
    }
}

function openEye() {
    iconOpenEye.style.display = 'flex';
    iconClosedEye.style.display = 'none';
}

function closeEye() {
    iconOpenEye.style.display = 'none';
    iconClosedEye.style.display = 'flex';
}
