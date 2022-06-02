// Profile info will show here
const overview = document.querySelector(".overview");
const username = "arianamoschopoulou";
const displayReposList = document.querySelector(".repo-list");
const reposSection = document.querySelector(".repos");
const individualRepoData = document.querySelector(".repo-data");
const backToRepoGallery = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

// Function to select profile info from the GitHub API
const profileInfo = async function (){
    const profileCall = await fetch (`https://api.github.com/users/${username}`);
    const profileDetails = await profileCall.json();
    //console.log(profileDetails);
    displayProfileInfo(profileDetails);
};
profileInfo();

const displayProfileInfo = function (profileDetails){
    let userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add("user-info");
    userInfoDiv.innerHTML = 
    `<figure>
      <img alt="user avatar" src=${profileDetails.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${profileDetails.name}</p>
      <p><strong>Bio:</strong> ${profileDetails.bio}</p>
      <p><strong>Location:</strong> ${profileDetails.location}</p>
      <p><strong>Number of public repos:</strong> ${profileDetails.public_repos}</p>
    </div>` ; 
    overview.append(userInfoDiv);
    fetchRepos();
};

const fetchRepos = async function (){
    const repoCall = await fetch (`https://api.github.com/users/${username}/repos?sort=created&per_page=100`);
    const repoDetails = await repoCall.json();
    //console.log(repoDetails);
    repoInfoDisplay(repoDetails);
};

const repoInfoDisplay = function (fetchRepos) {
    filterInput.classList.remove("hide");
    displayReposList.innerHTML = "";
    for (const loopRepos of fetchRepos) {
    const li = document.createElement("li");
    li.innerHTML = `<h3>${loopRepos.name}</h3>`;
    li.classList.add("repo");
    displayReposList.append(li);
    }
};

displayReposList.addEventListener ("click", function(e){
    if (e.target.matches("h3")) {
        let repoName = e.target.innerText;
        specificRepoInfo(repoName);

    }
});

const specificRepoInfo = async function(repoName) {
    const infoCall = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await infoCall.json();
    console.log(repoInfo);
    // Get languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    const languages = [];
    for (const language in languageData) {
    languages.push(language);
    //console.log(language);
    displaySpecificRepoInfo(repoInfo, languages);
    }
};

const displaySpecificRepoInfo = function(repoInfo, languages) {
    individualRepoData.innerHTML = "";
    individualRepoData.classList.remove("hide");
    reposSection.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = 
    `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    backToRepoGallery.classList.remove("hide");
    individualRepoData.append(div);

};

backToRepoGallery.addEventListener ("click", function(){
    reposSection.classList.remove("hide");
    individualRepoData.classList.add("hide");
    backToRepoGallery.classList.add("hide");
});

filterInput.addEventListener("input", function(e) {
    const searchText = e.target.value;
    //console.log(searchText);
    const repos = document.querySelectorAll(".repo");
    const searchLowerCase = searchText.toLowerCase();
    for (const repo of repos){
        const repoLowerCase = repo.innerText.toLowerCase();
        if (repoLowerCase.includes(searchLowerCase)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide")
        }
    }

});