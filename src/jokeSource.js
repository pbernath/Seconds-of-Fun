/*
    * jokeSource.js contains the functions that are used to get the joke from the API.
*/

function treatHTTPResponseACB(response){ 
    if(response.status == 200){

        return response.json();
    }
    throw ("Status is not 200");
}
function getJoke(props){
    let blacklistItems = ["NSFW", "Religious", "Political", "Racist", "Sexist", "Explicit"];
    let category = "any";
    let blacklist = "";
    let type = "?type=single";
    if (props.category.length != 0) {
        category = props.category.join(',');
    }
    if (props.blacklist.length != 6) {
        let invertedFlags = [];
        function filterFlags(item) {
            return !props.blacklist.includes(item);
            }
        invertedFlags = blacklistItems.filter(filterFlags);

        blacklist = "?blacklistFlags=" + invertedFlags.join(',');
        type = "&type=single";
    }
    console.log(category);
    console.log(blacklist);
    return fetch("https://v2.jokeapi.dev/joke/" + category + blacklist + type, {  // object literal
        method: "GET"       
    }
    ).then(treatHTTPResponseACB);
}

function getJokeByID(ID) {
    return fetch("https://v2.jokeapi.dev/joke/Any?idRange=" + ID, {  // object literal
    method: "GET"       
    } 
    ).then(treatHTTPResponseACB);
}

export {getJoke, getJokeByID}