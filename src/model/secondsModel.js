/*
    * secondsModel.js is the model for the Seconds of Fun page.
    * It is responsible for storing the state of the page and notifying the view when the state changes.
*/

import {getJoke, getJokeByID} from '../jokeSource.js'
import {resolvePromise} from '../resolvePromise.js';
import {getComic, getNextComic, getPrevComic, getFavoriteComic} from "../comicSource"


class secondsModel{

    constructor(userMail = null, favoriteJokes = [], preferenceNumber = 63, comics = [],){
        this.observers = [];

        this.userMail = userMail;
        this.authErrorMessage = null;

        this.jokePromiseState = {};
        this.currentJoke = "";
        this.favoriteJokes = favoriteJokes;
        this.preferenceNumber = preferenceNumber;
        this.jokeCategories = jokeCategories;
        this.jokeBlacklist = jokeBlacklist;

        this.comicPromiseState = {};
        this.favComics = comics;
    }




    addObserver(addObserverACB){
        this.observers = [...this.observers, addObserverACB];
    }

    removeObserver(removeObserverACB){
        function removeObsCB(obs){
            return obs!==removeObserverACB;
        }
        this.observers = this.observers.filter(removeObsCB);
    }

    notifyObservers(payload){
        function invokeObserverCB(obs){
            try{obs(payload);}
            catch(err){console.log(err);}
        }
        this.observers.forEach(invokeObserverCB);
    }




    setUser (user) {
        this.userMail = user;
        this.notifyObservers({userMail: user});
    }

    setAuthErrorMessage (error) {
        this.authErrorMessage = error;
    }





    removeFromFavorites(jokeToRemove){
        function hasSameIdNotifsCB(joke){
            return joke.id === jokeToRemove.id;
        }
        
        if(this.favoriteJokes.some(hasSameIdNotifsCB) == false){
            return;
        }

        function hasSameIdCB(joke){
            if (joke.id === jokeToRemove.id) {
                return false;
            }
            return true;
        }

        this.favoriteJokes = this.favoriteJokes.filter(hasSameIdCB);
        this.notifyObservers({removeJoke: jokeToRemove});

    }

    addJokeToFavorites(jokeToAdd){
        function hasSameIdNotifsCB(joke){
            return joke.id === jokeToAdd.id;
        }
        
        if(this.favoriteJokes.some(hasSameIdNotifsCB) == true){
            return;
        }
        this.favoriteJokes=[...this.favoriteJokes, jokeToAdd]
        this.notifyObservers({favoriteJokeToAdd: jokeToAdd})
    }

    setFavoriteJokes(listOfJokes){
        this.favoriteJokes = listOfJokes;
    }

    updatePreferences(preferenceNumber) {
        if (preferenceNumber == null) {
            preferenceNumber = 63;
        }
        this.preferenceNumber = preferenceNumber;
        this.notifyObservers({preference: preferenceNumber});
    }

    resetPreferences() {
        this.updatePreferences(63);
    }

    resetUser() {
        this.setUser(null);
    }

    resetAuthErrorMessage() {
        this.setAuthErrorMessage(null);
    }

    resetFavoriteJokes() {
        this.setFavoriteJokes([]);
    }

    cleanupAfterUser() {
        this.resetUser();
        this.resetAuthErrorMessage();
        this.resetPreferences();
        this.resetFavoriteJokes();
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






}

export default secondsModel;
