function treatHTTPResponseACB(response){ 
    if(response.status == 200){

        return response.json();
    }
    throw ("Status is not 200");
}

function getComic(){ //get random comic 
    let comicNmbr=Math.floor((Math.random() * 2712)+1);

    return fetch("https://xkcd.now.sh/?comic="+comicNmbr.toString(), {  // object literal
        method: "GET"       
     } 
    ).then(treatHTTPResponseACB);
}

function getNextComic(currentComic){ //get next comic (Does not check if there is a next comic)

    return fetch("https://xkcd.now.sh/?comic="+(currentComic+1).toString(), {  // object literal
        method: "GET"       
    } 
    ).then(treatHTTPResponseACB);
}

function getPrevComic(currentComic){//get previous comic (As above, does not check if the previous comic exists)

    return fetch("https://xkcd.now.sh/?comic="+(currentComic-1).toString(), {  // object literal
        method: "GET"       
    } 
    ).then(treatHTTPResponseACB);   
}

function getFavoriteComic(currentComic){//get previous comic (As above, does not check if the previous comic exists)

    return fetch("https://xkcd.now.sh/?comic="+(currentComic).toString(), {  // object literal
        method: "GET"       
    } 
    ).then(treatHTTPResponseACB);   
}

export {getComic, getNextComic, getPrevComic, getFavoriteComic};