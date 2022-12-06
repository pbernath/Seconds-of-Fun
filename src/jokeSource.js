function treatHTTPResponseACB(response){ 
    if(response.status !== 200){
        throw new Error("HTTP error with status: " + response.status);
    }
    else {
    return response.json();
    }
}

function getJokeFromCat(category){
    return fetch(" https://v2.jokeapi.dev/joke/Any", {  // object literal
        "method": "GET"       
     } 
)
} 

function responseCB(response){
    return response.results;
}

function getJoke(category){
    return getJokeFromCat(new URLSearchParams(category)).then(treatHTTPResponseACB).then(responseCB);
}

