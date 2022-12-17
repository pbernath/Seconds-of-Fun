function treatHTTPResponseACB(response){ 
    if(response.status == 200){

        return response.json();
    }
    throw ("Status is not 200");
}

function getComic(){
    let comicNmbr=Math.floor((Math.random() * 2712)+1);

    return fetch("https://xkcd.now.sh/?comic="+comicNmbr.toString(), {  // object literal
        method: "GET"       
     } 
    ).then(treatHTTPResponseACB);
}

function getNextComic(){
    let comicNmbr=1;
}

function getPrevComic(){

}

export {getComic};