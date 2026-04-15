

// globale Variablen 
let root;
let iconOpenEye;
let iconClosedEye;
let test;
let projectCards;

const urlGitHubProfileData = "https://api.github.com/users/naviGateauR"
const urlGitHubRepositories = "https://api.github.com/users/naviGateauR/repos"


// DOM aufbauen:
document.addEventListener("DOMContentLoaded", init);
// document.addEventListener("DOMContentLoaded", buildProfileData);

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
    const filterButtons = document.querySelector(".filter-buttons");
if (filterButtons) {
    filterButtons.addEventListener("click", handleClick);
} else {
    console.log("no filter buttons on this page!");
}

    projectCards = document.querySelectorAll(".project-card");
    // projectCards.forEach((card) => console.log(card));

    loadGitlabGithubData(urlGitHubProfileData);
    loadGitlabGithubData(urlGitHubRepositories);

    
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


async function loadGitlabGithubData(URL){
    try{
        // TODO 1: Use fetch() with one API endpoint
        const response = await fetch(URL);
        
        // TODO 2: Convert the response to JSON
        const data = await response.json();
    
        // TODO 3: Inspect the data using console.log()
        console.log("here comes the data")
        console.log(data);

        // TODO 4: use properties 
        if(URL === urlGitHubProfileData){
            const gitHubName = document.querySelector("#github-name");
            const gitHubAvatar = document.querySelector("#github-avatar");
            const gitHubBio = document.querySelector("#github-bio");
            const gitHubEmployer = document.querySelector("#github-employer");
            const gitHubCreationDate = document.querySelector("#github-creation-date");
            const gitHubNumberOfPublicRepositories = document.querySelector("#github-amount-public-repos");
            const gitHubNumberOfFollowers = document.querySelector("#github-amount-followers");
            const gitHubNumberOfFolling = document.querySelector("#github-amount-following");
            const gitHubProfileURL = document.querySelector("#github-profile-url");
            
            gitHubName.innerHTML = `${data.name}`;
            gitHubAvatar.src = `${data.avatar_url}`;
            gitHubBio.innerHTML = `${data.bio}`
            gitHubEmployer.innerHTML = `Studying at ${data.company}`
            gitHubCreationDate.innerHTML = `Since ${data.created_at}`
            gitHubNumberOfPublicRepositories.innerHTML = `Public repositories: ${data.public_repos}`
            gitHubNumberOfFollowers.innerHTML = `Followers: ${data.followers}`
            gitHubNumberOfFolling.innerHTML = `Following : ${data.followers}`

            
            gitHubProfileURL.href = `${data.url}`;
            gitHubProfileURL.innerHTML = `${data.name}`;
            
            
        }
        if(URL === urlGitHubRepositories){
                // console.log("jajaja")
            }


        // return data;

    }
    catch(error){
        console.log("oops, an error occured! have a look: ", error)
    }
}

// async function buildProfileData(){
//     const bla = await loadGitlabGithubData(urlGitHubProfileData);
//     console.log("check this out")
//     console.log(bla)
// }