const fs = require('fs');

fs.readFile('./message.txt', {encoding: "UTF-8"}, (error, data) => {
    console.log("First callback");
    if(error){
        console.log(error);
        throw Error("Something went wrong while reading the file!");
    }
    data += "\nCopied successfully";
    fs.writeFile('./newFile.txt', data, {encoding: "UTF-8"}, (errorWrite, dataWrite) => {
        console.log("Second callback");
        fs.readFile("./newFile.txt", {encoding: "UTF-8"}, (errorRead2, dataRead2) => {
            console.log("Third callback");
            if(errorRead2){
                console.log(error);
                throw Error("Something went wrong while reading your second file!");
            }
            dataRead2 += "\nThe final file to be created!";
            fs.writeFile('./final.txt', dataRead2, {encoding: "UTF-8"}, (errorWrite2, dataWrite2) => {
                console.log("Fourth callback");
            });
        });
    });
});