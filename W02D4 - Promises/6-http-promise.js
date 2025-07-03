const requestPromise = require("request-promise");

const settings = {
    uri: "https://jsonplaceholder.typicode.com/posts",
    json: true
};

requestPromise(settings)
    .then((responseJSON) => {
        responseJSON.forEach((obj) => {
            console.log(obj.title, obj.id);
        });
    })
    .catch((error) => {
        console.log("Something went wrong with your request", error);
    });