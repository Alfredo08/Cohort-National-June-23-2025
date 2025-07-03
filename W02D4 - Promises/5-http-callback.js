const request = require("request");

request.get("https://jsonplaceholder.typicode.com/posts", {json: true}, (error, response, body) => {
   if(error){
    throw new Error("Something went wrong with your request", error);
   }
   for(let i = 0; i < response.body.length; i ++){
    console.log(response.body[i].title, response.body[i].id);
   }
});