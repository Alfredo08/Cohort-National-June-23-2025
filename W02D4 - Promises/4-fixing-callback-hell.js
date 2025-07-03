const fs = require("fs");

fs.promises.readFile('./message.txt', {encoding: "UTF-8"})
    .then((dataRead) => {
        dataRead += "\nCopied successfully";
        return fs.promises.writeFile('./newFile.txt', dataRead, {encoding: "UTF-8"});
    })
    .then((dataWrite) => {
        console.log("File created successfully");
        return fs.promises.readFile("./newFile.txt", {encoding: "UTF-8"});
    })
    .then((dataRead2) => {
        dataRead2 += "\nThe final file to be created!";
        return fs.promises.writeFile('./final.txt', dataRead2, {encoding: "UTF-8"});
    })
    .then((dataWrite2) => {
        console.log("Final file created successfully");
    })
    .catch((error) => {
        console.log("Something went wrong, see details here: ", error);
    });