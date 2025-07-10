const express = require("express");
const cookieSession = require("cookie-session");
const app = express();
const PORT = 8080;

const cookieSessionConfig = {
    name: "myCookieSession",
    keys: ["this-is-a-secret-key"],
    maxAge: 60 * 1000 /* 1 minute */
}

app.use(cookieSession(cookieSessionConfig));

app.get("/cookie-session", (req, res) => {
    console.log("Session:", req.session);
    if(! req.session){
        req.session.numOfVisits = 1;
    }
    else{
        req.session.numOfVisits ++;
    }

    return res.send(`<h1> Number of visists: ${req.session.numOfVisits}</h1>`);
});

app.listen(PORT, () => {
    console.log("Server is running in port", PORT);
});

