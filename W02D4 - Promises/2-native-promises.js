
const myFirstPromise = new Promise((resolve, reject) => {
    const randomNum = Math.random();
    if(randomNum >= 0.5){
        resolve(`The number is greater than 0.5. Num: ${randomNum}`);
    }
    else{
        reject(`The number was not enough to mark this as resolved. Num: ${randomNum}`);
    }
});

console.log("First");
myFirstPromise
    .then((response) => {
        console.log("Third, successful");
        console.log(response);
        
    })
    .catch((error) => {
        console.log("Third, unsuccessful");
        console.log(error);
    });
console.log("Second");
