
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

async function displayMovie() {
  const c = await getCustomer();
  console.log('Customer: ', c);
  let m;
  if(c.isGold) m = await getTopMovies();
  console.log('Top movies: ', m);
  await sendEmail(c, m);
  console.log('Email sent...');
}

displayMovie();


// getCustomer().then(customer => {
//     console.log('Customer: ', customer);
//   if (customer.isGold) return getTopMovies();
// }).then((movs,customer) => {
//   console.log('Top movies: ', movs);
//   return sendEmail(customer, movs);
// }).then(() => console.log('Email sent...'));


function getCustomer() {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve({ 
      id: 1, 
      name: 'Mosh Hamedani', 
      isGold: true, 
      email: 'email' 
    });
  }, 2000);  
  });
  
}

function getTopMovies() {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
  }, 2000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
    resolve();
  }, 2000);
  });
}