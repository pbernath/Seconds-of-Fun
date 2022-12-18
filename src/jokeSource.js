/*
    * jokeSource.js contains the functions that are used to get the joke from the API.
*/

function treatHTTPResponseACB(response){ 
    if(response.status == 200){

        return response.json();
    }
    throw ("Status is not 200");
}
function getJoke(){
    // Object literal.
    return fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single", {  
        method: "GET"       
     } 
    ).then(treatHTTPResponseACB);
}

export {getJoke}