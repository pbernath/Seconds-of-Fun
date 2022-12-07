/*function treatHTTPResponseACB(response){ 
    if(response.status !== 200){
        throw new Error("HTTP error with status: " + response.status);
    }
    else {
    return response.json();
    }
}

function getJokeFromCat(category){
    return fetch("https://v2.jokeapi.dev/joke/Any", {  // object literal
        "method": "GET"       
     } 
)
} 

function responseCB(response){
    return response.results;
}

function getJoke(category){
    return getJokeFromCat(new URLSearchParams(category)).then(treatHTTPResponseACB).then(responseCB);
}*/

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

export {joke}