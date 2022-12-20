/*
    * jokeSource.js contains the functions that are used to get the joke from the API.
*/

function treatHTTPResponseACB(response){ 
    if(response.status == 200){

        return response.json();
    }
    throw ("Status is not 200");
}
function getJoke(number){
    let categoryItems = ["Programming", "Misc", "Dark", "Pun", "Spooky", "Christmas"];
    let flagItems = ["NSFW", "Religious", "Political", "Racist", "Sexist", "Explicit"];
    let selectedCategories = [];
    let selectedFlags = [];
    let category = "any";
    let blacklist = "?blacklistFlags=" + flagItems.join(',');
    let type = "&type=single";
    let i = 0;

    while (number != 0) {
        if(Math.pow(2, i) >= number){
            if(Math.pow(2, i) == number){
                addPreferenceAccordingToIndex(i);
                break;
            }
            if(Math.pow(2, i) > number){
                addPreferenceAccordingToIndex(i-1);
                number -= Math.pow(2, i-1);
                i = -1;

            }
        }
        i++;
    }

    function addPreferenceAccordingToIndex(index) {
        if (index < 6) {
            selectedCategories = [categoryItems[index], ...selectedCategories];
        } else {
            selectedFlags = [flagItems[index - 6], ...selectedFlags];
        }
    }

    if (selectedCategories.length != 6 || selectedCategories.length != 0) {
        category = selectedCategories.join(',');
    }
    if (selectedFlags.length != 6 && selectedFlags.length != 0) {
        let invertedFlags = [];
        function filterFlags(item) {
            return !selectedFlags.includes(item);
            }
        invertedFlags = flagItems.filter(filterFlags);

        blacklist = "?blacklistFlags=" + invertedFlags.join(',');
    }
    if (selectedFlags.length == 6) {
        blacklist = "";
        type = "?type=single"
    }
    console.log("Check that the info for the fetch is corresponding to the preferences!");
    console.log(category)
    console.log(blacklist)
    console.log(type)
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