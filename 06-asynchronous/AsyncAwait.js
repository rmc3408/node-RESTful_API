async function displayCommits() {
  try {
    const user = await getUser(39);
    const reposit = await getRepos(user.gitName);
    const comitt = await getCommits(reposit[0]);
    console.log(comitt);
  }
  catch (er) {
    console.log('Error is ', er.message);
  }
}

displayCommits();

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
      reject(new Error('REPOS rejected'));
      //resolve(["repo1", "repo2", "repo3"]);
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
