console.log("Before");
getUser(1, function (user) {
  //console.log("Starting getUser callback: get User object", user);

  getRepos(user.gitName, (reps) => {
    reps.map((p) => console.log(p));
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
