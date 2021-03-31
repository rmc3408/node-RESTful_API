const p = new Promise((resolve, reject) => {
  //resolve(1); //PASS syncronouss
  setTimeout(() => resolve(1), 2000); //PASS ASyncronouss

  //reject(new Error('message')); //FAIL syncronouss
  setTimeout(() => reject(new Error("Something wrong")), 2000); //Fail Asyncronouss
});

//then = Success
//catch = Error
p.then((result) => console.log(`Result is ${result}`))
    .catch((result) => console.log("Error is", result.message) );

/**
 *  CALL BACK
getUser(1, function (user) {
  console.log("result from callback function in getUser =", user);

  getRepos(user.gitName, (repos) => {
    repos.map((p) => console.log(p));

    getCommits(repos[2], (commitsFromRepo) => {
      console.log("last commit from repo[2] is ", commitsFromRepo[1]);
    });
  });
});



getUser(1, () => {
    getRepos(user.gitName, (reps) => {
        getCommits(repo, (com) => {
            console.log(com);
      });
    });
  });
* 

      SIMPLIFYING!!!
*/

//const u = getUser(1);
//u.then(a => console.log('User details = ', a));


getUser(2)
    .then(user => getRepos(user.gitName))
        .then(repos => getCommits(repos[2]))
            .then(com => console.log(com[1]))
    .catch(err => console.log('Error is ', err.message)); //Catch is from any of them. all 3 of them.


    // function getUser(id, callback) {
    //   setTimeout(() => {
    //     console.log("Reading user from database...");
    //     callback({ id: id, gitName: "rmc3408" }); //it is like return for Asyncronous
    //   }, 2000);
    // }
    
function getUser(theId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading user info from database...");
      resolve({ id: theId, gitName: "rmc3408" });
    }, 2000);
  });
}

function getRepos(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Getting Repository from Username ", username);
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
      console.log("Obtaining information of " + repo);
      console.log("Calling GitHub API and getting all commits");
      resolve(["commit01", "commit02"]);
    }, 2000);
  });
}
