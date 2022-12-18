import {getJoke} from '../jokeSource.js'
import {getComic, getNextComic, getPrevComic, getFavoriteComic} from "../comicSource"
import {resolvePromise} from '../resolvePromise.js';
class secondsModel{
    constructor(input = "", user = null, comics=[]){
        this.observers = [];
        this.jokePromiseState = {};
        this.comicPromiseState={};
        this.currentInput = input;
        this.user = user;
        this.currentComic=1;
        this.favComics=comics;
    }

    addObserver(addObserverACB){
        this.observers = [...this.observers, addObserverACB]
    }

    removeObserver(removeObserverACB){
        function removeObsCB(obs){
            return obs!==removeObserverACB;
        }
        this.observers = this.observers.filter(removeObsCB)
    }

    notifyObservers(payload){
        function invokeObserverCB(obs){
            try{obs(payload);}
            catch(err){console.log(err);}
        }
        this.observers.forEach(invokeObserverCB)
    }
    
    setCurrentJoke(){ 
        resolvePromise(getJoke(), this.jokePromiseState)
    }

    getRandomComic(){
        resolvePromise(getComic(), this.comicPromiseState)
    }

    setCurrentComic(num){
        resolvePromise(getFavoriteComic(num), this.comicPromiseState)
    }

    setNextComic(){
        resolvePromise(getNextComic(this.comicPromiseState.data.num), this.comicPromiseState)
    }
    setPrevComic(){
        resolvePromise(getPrevComic(this.comicPromiseState.data.num), this.comicPromiseState)
    }

    addFavComic(comicToAdd){
        function hasSameIdNotifsCB(comic){
            return comic.num === comicToAdd.num;
        }
    
        if(this.favComics.some(hasSameIdNotifsCB) == true){
            return;
        }

        this.favComics=[...this.favComics, comicToAdd]
        this.notifyObservers({favoriteComicToAdd: comicToAdd})
        console.log(this.favComics)
    }

    setInput(input){
        this.currentInput = input;
        this.notifyObservers({input: input});
    }

    getInput() {
        return this.currentInput;
    }


    removeFromFavComic(comicToRemove){
        function hasSameIdNotifsCB(comic){
            return comic.num === comic.num;
        }
        
        if(this.favComics.some(hasSameIdNotifsCB) == false){
            return;
        }

        function hasSameIdCB(comic){
            if (comic.num === comicToRemove.num) {
                return false;
            }
            return true;
        }

        this.favComics = this.favComics.filter(hasSameIdCB);
        this.notifyObservers({removeComic: comicToRemove});

    }

    setUser (user) {
        this.user = user;
        this.notifyObservers({userID: user})
    }

    getUser () {
        return this.user;
    }

}

export default secondsModel;
