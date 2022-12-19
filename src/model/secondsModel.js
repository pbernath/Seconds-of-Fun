/*
    * secondsModel.js is the model for the Seconds of Fun page.
    * It is responsible for storing the state of the page and notifying the view when the state changes.
*/

import {getJoke, getJokeByID} from '../jokeSource.js'
import {resolvePromise} from '../resolvePromise.js';


class secondsModel{

    constructor(userMail = null, favoriteJokes = [], jokeCategories = [], jokeBlacklist = [],){
        this.observers = [];

        this.userMail = userMail;
        this.authErrorMessage = null;

        this.jokePromiseState = {};
        this.currentJoke = "";
        this.favoriteJokes = favoriteJokes;
        this.jokeCategories = jokeCategories;
        this.jokeBlacklist = jokeBlacklist;
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

    addJokePreferences (props) {
        this.jokeCategories = props.categories;
        this.jokeBlacklist = props.blacklist;
    }
    addJokeCategory(categoryToAdd){
        console.log(categoryToAdd);
        function hasSameIdNotifsCB(category){
            return category == categoryToAdd;
        }
        
        if(this.jokeCategories.some(hasSameIdNotifsCB) == true){
            return;
        }
        this.jokeCategories=[...this.jokeCategories, categoryToAdd]
        this.notifyObservers({addJokeCategory: categoryToAdd})
    }

    removeJokeCategory(categoryToRemove){
        console.log(categoryToRemove);
        function hasSameIdNotifsCB(category){
            return category == categoryToRemove;
        }
        
        if(this.jokeCategories.some(hasSameIdNotifsCB) == false){
            return;
        }

        function hasSameIdCB(category){
            if (category == categoryToRemove) {
                return false;
            }
            return true;
        }

        this.jokeCategories = this.jokeCategories.filter(hasSameIdCB);
        this.notifyObservers({removeJokeCategory: categoryToRemove});
    }

    addJokeBlacklist(flagToAdd){
        console.log(flagToAdd);
        function hasSameIdNotifsCB(flag){
            return flag == flagToAdd;
        }
        
        if(this.jokeBlacklist.some(hasSameIdNotifsCB) == true){
            return;
        }
        this.jokeBlacklist=[...this.jokeBlacklist, flagToAdd]
        this.notifyObservers({addBlacklistFlag: flagToAdd})
    }

    removeJokeBlacklist(flagToRemove){
        console.log(flagToRemove);
        function hasSameIdNotifsCB(flag){
            return flag == flagToRemove;
        }
        
        if(this.jokeBlacklist.some(hasSameIdNotifsCB) == false){
            return;
        }

        function hasSameIdCB(flag){
            if (flag == flagToRemove) {
                return false;
            }
            return true;
        }

        this.jokeBlacklist = this.jokeBlacklist.filter(hasSameIdCB);
        this.notifyObservers({removeBlacklistFlag: flagToRemove});
    }


    resetPreferences() {
        console.log("Preferences reset");
        this.jokeCategories = [];
        this.jokeBlacklist = [];
    }

}

export default secondsModel;
