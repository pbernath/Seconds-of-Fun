import {getJoke, getJokeByID} from '../jokeSource.js'
import {resolvePromise} from '../resolvePromise.js';
class secondsModel{

    constructor(input = "", user = null, favoriteJokes = []){
        this.observers = [];

        this.jokePromiseState = {};
        this.currentInput = input;
        this.favoriteJokesPromiseState={data: {joke: "No favorite joke."}, };
        this.user = user;
        this.currentJoke = "";
        this.favoriteJokes=favoriteJokes;
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
    
    removeFromFavorites(jokeToRemove){
        function hasSameIdNotifsCB(joke){
            return joke.id === jokeToRemove.id;
        }
        
        if(this.favoriteJokes.some(hasSameIdNotifsCB) == false){
            console.log("yeah2")
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

    setUser (user) {
        this.user = user;
        this.notifyObservers({userID: user})
    }

    getUser () {
        return this.user;
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
    getAJoke(){ 
        resolvePromise(getJoke(), this.jokePromiseState)
    }

}

export default secondsModel;
