const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const { render } = require('ejs');
const SALT = 10;
const PORT = 8080;
const generatedSalt = bcrypt.genSaltSync(SALT);

const cookieSessionConfig = {
    name: "myCookieSession",
    keys: ["this-is-a-secret-key"],
    maxAge: 60 * 1000 /* 1 minute */
}

let currentId = 4;
const users = {
    1: {
        id: 1,
        email: "puppycat@hotmail.com",
        password: "$2b$10$DHT66IXZRUYsPkx0ReWTKu47wOKhLORIxoIWYpPIdgQAscR9LtLCu" //ImNotCute
    },
    2: {
        id: 2,
        email: "lighthouseAssignments@hotmail.com",
        password: "$2b$10$s4astxxmFenD1lFDybpEF.cjASjQKFSgO6/o1FTgH5aqqYYFvVfKe" //veryDifficult
    },
    3: {
        id: 3,
        email: "homersimpson@hotmail.com",
        password: "$2b$10$WZK1y2gd8oVn9dkKafXtNeXrq9f/dfeR2oQGRYzleJZximobD8qyC" //d0h!
    }
};

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));
app.use(cookieSession(cookieSessionConfig));

app.set('view engine', 'ejs');

app.get('/login', (req, res) => {
    return res.render('login');
});

app.get('/signup', (req, res) => {
    return res.render('signup');
})

app.get('/home', (req, res) => {
    // Check if the session is still active
    if(! req.session.user){
        return res.redirect('/login');
    }
    const currentUser = users[req.session.user.id];
    const templateVars = {
        userEmail: currentUser.email
    }
    return res.render('home', templateVars);
})

app.post('/logout', (req, res) => {
    req.session = null
    return res.redirect('/login')
});

app.post('/process/signup', (req, res) => {
    const email = req.body.emailField;
    const password = req.body.passwordField;

    // Check user information
    for(keyId in users){
        // Check if the email exists!
        if(users[keyId].email === email){
            return res.status(400).send(`
                <h1> This email is already in use </h1>
                <a href="/signup"> Go back to signup </a>
            `);
        }
    }

    // Encrypt the user password
    bcrypt.hash(password, generatedSalt)
        .then((hashedPassword) => {
            // Add the user to the dataset
            users[currentId] = {
                id: currentId,
                email: email,
                password: hashedPassword
            }

            // Add the user to the cookie session
            req.session.user = {
                id: currentId,
                email: email
            }

            // Update the currentId, leave it ready for the next user signup
            currentId ++;

            console.log(users);

            // Redirect to the home page
            return res.redirect('/home');
        })
});

app.post('/process/login', (req, res) => {
    const email = req.body.emailField;
    const password = req.body.passwordField;
    let foundUser; 

    // Check user information
    for(keyId in users){
        // Check if the email exists!
        console.log(users[keyId].email, email);
        if(users[keyId].email === email){
            foundUser = users[keyId];
        }
    }

    // Unhappy path: email doesn't exists
    if(! foundUser){
        return res.status(404).send(`
            <h1> This email doesn't exist! </h1>
            <a href="/login"> Go back to login </a>
        `);
    }

    // Check the passwords
    bcrypt.compare(password, foundUser.password)
        .then((match) => {
            // Passwords do not match
            if(! match){
                return res.status(400).send(`
                    <h1> Wrong credentials! </h1>
                    <a href="/login"> Go back to login </a>
                `)
            }

            // Add the user to the cookie session
            req.session.user = {
                id: foundUser.id,
                email: foundUser.email
            }

            // Redirect to the home page
            return res.redirect('/home');
        })
        .catch((error) => {
            return res.status(400).send(`
                <h1> Something went wrong with the app! </h1>
                <a href="/login"> Go back to login </a>
            `);
        })
});



app.listen(PORT, () => {
    console.log(`Server is running in port: ${PORT}.`);
});
