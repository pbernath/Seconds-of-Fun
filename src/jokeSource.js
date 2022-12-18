/**
    * jokeSource.js contains the functions that are used to get the joke from the API.
*/

function treatHTTPResponseACB(response){ 
    if(response.status == 200){

        return response.json();
    }
    throw ("Status is not 200");
}
function getJoke(){
    return fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single", {  // object literal
        method: "GET"       
     } 
    ).then(treatHTTPResponseACB);
}


/*
function joke(){
var baseURL = "https://v2.jokeapi.dev";
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single");

xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status < 300) // readyState 4 means request has finished + we only want to parse the joke if the request was successful (status code lower than 300)
    {
        var randomJoke = JSON.parse(xhr.responseText);
        console.log(randomJoke.joke);
        alert(randomJoke.joke);
    }
    else if(xhr.readyState == 4)
    {
        alert("Error while requesting joke.\n\nStatus code: " + xhr.status + "\nServer response: " + xhr.responseText);
    }
};

xhr.send(); 
}
*/
export {getJoke}