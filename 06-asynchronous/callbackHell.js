const user = { id: 1, gitName: "rmc3408" };

// getUser(1, () => {
//   getRepos(user.gitName, (reps) => {
//       getCommits(repo, (com) => {
//           console.log(com);
//     });
//   });
// });

getUser(1, getRepositories);

function getRepositories(user) {
    getRepositories(user.gitName, getCommits);
}
function getCommits(reps) {
    getCommits(repo, displayCommits);
}
function displayCommits(com) {
    console.log(com);
}













function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading user from database...");
    callback({ id: id, gitName: "rmc3408" }); //it is like return for Asyncronous
  }, 2000);
}
