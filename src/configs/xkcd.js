function randomComic(){
    var url = 'https://xkcd.now.sh/?comic=';
    var xhr = new XMLHttpRequest();
    function randomizerCB(){
        return Math.floor((Math.random() * 2712)+1);
    }

    xhr.open("GET", "https://xkcd.now.sh/?comic="+randomizerCB.toString())

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status < 300) // readyState 4 means request has finished + we only want to parse the joke if the request was successful (status code lower than 300)
        {
            var randComic = JSON.parse(xhr.responseText);
            console.log(randComic);
            
        }
        else if(xhr.readyState == 4)
        {
            alert("Error while requesting joke.\n\nStatus code: " + xhr.status + "\nServer response: " + xhr.responseText);
        }
    }

    xhr.send(); 
}

export {randomComic};