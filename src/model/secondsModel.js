import {getJoke} from '../jokeSource.js'
import {resolvePromise} from '../resolvePromise.js';
class secondsModel{

    constructor(userMail = null){
        this.observers = [];
        this.jokePromiseState = {};
        this.userMail = userMail;
        this.authErrorMessage = null;
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




    
    setCurrentJoke(){ 
        resolvePromise(getJoke(), this.jokePromiseState);
    }






    addToTest(infoToAdd){
        this.testing= [...this.testing, infoToAdd];
        this.notifyObservers({addTestInfo: infoToAdd});
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
        this.userMail = user;
        this.notifyObservers({userMail: user});
    }

    setAuthErrorMessage (error) {
        this.authErrorMessage = error;
    }

    

  setCurrentJoke() {
    resolvePromise(getJoke(), this.jokePromiseState);
  }
}

export default secondsModel;
