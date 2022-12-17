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

function getJokeByID(ID) {
    return fetch("https://v2.jokeapi.dev/joke/Any?idRange=" + ID + "?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single", {  // object literal
    method: "GET"       
    } 
    ).then(treatHTTPResponseACB);
}

export {getJoke, getJokeByID}