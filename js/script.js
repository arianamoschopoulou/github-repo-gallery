// Profile info will show here
const overview = document.querySelector(".overview");
const username = "arianamoschopoulou";
const displayReposList = document.querySelector(".repo-list")

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
    console.log(repoDetails);
    repoInfoDisplay(repoDetails);
};

const repoInfoDisplay = function (fetchRepos) {
    displayReposList.innerHTML = "";
    for (const loopRepos of fetchRepos) {
    const li = document.createElement("li");
    li.innerHTML = `<h3>${loopRepos.name}</h3>`;
    li.classList.add("repo");
    displayReposList.append(li);
    }
};