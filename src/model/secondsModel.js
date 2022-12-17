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

    setInput(input){
        this.currentInput = input;
        this.notifyObservers({input: input});
    }

    getInput() {
        return this.currentInput;
    }

    addToTest(infoToAdd){
        this.testing= [...this.testing, infoToAdd]

        this.notifyObservers({addTestInfo: infoToAdd})
    }
    
    removeFromTest(infoToRemove){
        function hasSameIdNotifsCB(info){
            return info === infoToRemove;
        }
        
        if(this.testing.some(hasSameIdNotifsCB) == false){
            return;
        }

        function hasSameIdCB(info){
            if (info === infoToRemove) {
                return false;
            }
            return true;
        }

        this.testing = this.testing.filter(hasSameIdCB);

        this.notifyObservers({removeTestInfo: infoToRemove});

    }

    setUser (user) {
        this.user = user;
        this.notifyObservers({userID: user})
    }

    getUser () {
        return this.user;
    }

    addJokeToFavorites(joke){
        this.favoriteJokes=[...this.favoriteJokes, joke]
        this.notifyObservers({favoriteJokes: this.favoriteJokes})
    }
    getAJoke(){ 
        resolvePromise(getJoke(), this.jokePromiseState)
    }

}

export default secondsModel;
