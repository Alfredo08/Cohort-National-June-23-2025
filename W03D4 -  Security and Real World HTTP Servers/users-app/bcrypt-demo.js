const bcrypt = require('bcrypt');
const SALT = 10;

const password = "hello";
const plainText = "hellos";

const generatedSalt = bcrypt.genSaltSync(SALT);

const hashedPassword = bcrypt.hashSync(password, generatedSalt);

/*
console.log(generatedSalt);
console.log(hashedPassword);
*/

const isThereAMatch = bcrypt.compareSync(plainText, hashedPassword);

console.log(`Passwords match? ${plainText} - ${hashedPassword}`, isThereAMatch);
