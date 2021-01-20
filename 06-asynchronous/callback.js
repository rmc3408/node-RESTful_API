console.log("Before");

getUser(1, function (user) {
  console.log("result from callback function in getUser =", user);

  getRepos(user.gitName, (repos) => {
    repos.map((p) => console.log(p));

    getCommits(repos[2], (commitsFromRepo) => {
      console.log("last commit from repo[2] is ", commitsFromRepo[1]);
    });
  });
});

console.log("after");

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading user from database...");
    callback({ id: id, gitName: "rmc3408" }); //it is like return for Asyncronous
  }, 2000);
}

function getRepos(username, callback) {
  setTimeout(() => {
    console.log("Username: ", username);
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    console.log("Calling GitHub API from " + repo + " and getting all commits...");
      callback(["commit01", "commit02"]);
  }, 2000);
}