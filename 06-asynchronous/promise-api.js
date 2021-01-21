
// If is known that will pass or fail ... use Promisse class.
Promise.resolve({ id: 103 }).then(r => console.log(r));
Promise.reject(new Error('reason rejected')).catch(err => console.log(err.message));

//Result are ready, return results

const p1 = new Promise((resolve, reject) => { 
    setTimeout(() => {
        console.log('Asyncro promise operation 01')
        resolve('number 1');
        //reject(new Error('p1 rejected'));
    }, 2000);    
});

const p2 = new Promise((resolve, reject) => { 
    setTimeout(() => {
        console.log('Asyncro promise operation 02')
        resolve('number 2');
    }, 2000);    
});

//Promise.all([p1, p2]).then(result => console.log(result)); //always display result wen BOTH are ready.
Promise.race([p1, p2]).then(result => console.log(result)); //display the First result Ready.


//If any give error, final result is error
//Promise.all([p1, p2]).then(result => console.log(result)).catch(err => console.log(err.message));
