function treatHTTPResponseACB(response){ 
    if(response.status == 200){

        return response.json();
    }
    throw ("Status is not 200");
}
function getComic(){
    function randomizeComicCB(){
        return Math.floor((Math.random() * 2712)+1);
    }


    return fetch("https://xkcd.now.sh/?comic=1", {  // object literal
        method: "GET"       
     } 
    ).then(treatHTTPResponseACB);
}

export {getComic};