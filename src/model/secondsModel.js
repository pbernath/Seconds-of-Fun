/*
    * secondsModel.js is the model for the Seconds of Fun page.
    * It is responsible for storing the state of the page and notifying the view when the state changes.
*/

import {getJoke, getJokeByID} from '../jokeSource.js'
import {resolvePromise} from '../resolvePromise.js';


class secondsModel{

    constructor(userMail = null, favoriteJokes = [], preferenceNumber = 63){
        this.observers = [];

        this.userMail = userMail;
        this.authErrorMessage = null;

        this.jokePromiseState = {};
        this.currentJoke = "";
        this.favoriteJokes = favoriteJokes;
        this.preferenceNumber = preferenceNumber;
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

}

export default secondsModel;
