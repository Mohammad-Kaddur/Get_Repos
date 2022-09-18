let inputRepos = document.getElementById("input-repos");
let getRepos = document.getElementById("get-repos");
let showData = document.getElementById("show-data");
getRepos.onclick = function (e) {
  checkInput(e);
};

function checkInput(e) {
  if (inputRepos.value == "") {
    showData.innerHTML = "Plase Write Github repos";
    e.preventDefault();
  } else {
    e.preventDefault();
    fetch(`https://api.github.com/users/${inputRepos.value}/repos`)
      .then((repos) => repos.json())
      .then((repositories) => {
        showData.innerHTML = "";
        repositories.forEach((repository) => {
          // ### main Div
          let mainContainer = document.createElement("div");
          let mainParag = document.createElement("p");
          let text = document.createTextNode(repository.name);
          //   #######
          mainParag.appendChild(text);
          mainContainer.appendChild(mainParag);
          showData.appendChild(mainContainer);
          //   ### Link
          let textAndLink = document.createElement("div");
          let theUrl = document.createElement("a");
          let urlText = document.createTextNode("visit");
          theUrl.appendChild(urlText);
          theUrl.href = `https://github.com/${inputRepos.value}/${repository.name}`;
          theUrl.target = "_blank";
          textAndLink.appendChild(theUrl);
          mainContainer.appendChild(textAndLink);
          showData.appendChild(mainContainer);
          //   ### Stars
          let starSpan = document.createElement("span");
          let startText = document.createTextNode(
            `stars ${repository.stargazers_count}`
          );
          starSpan.appendChild(startText);
          textAndLink.appendChild(starSpan);
          //   ### Add Class
          textAndLink.setAttribute("class", "text-link");
          mainContainer.appendChild(textAndLink);
          showData.appendChild(mainContainer);
        });
      });
  }
}
