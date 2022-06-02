// Profile info will show here
const overview = document.querySelector(".overview");
const username = "arianamoschopoulou";
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
};
