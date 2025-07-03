
const addTwoNumbers = (n1, n2, callback) => {
    const total = n1 + n2;
    callback();
    console.log(`The sum of ${n1} and ${n2} is equal to ${total}`);
}

const printHello = () => {
    console.log("Hey there class of June 23");
}

setTimeout(() => {
    console.log("Ready to start executing the logic inside the timeout!");
}, 1000);

setTimeout(() => {
    console.log("This is the message from our second timeout");
}, 500)

addTwoNumbers(20, 30, printHello);