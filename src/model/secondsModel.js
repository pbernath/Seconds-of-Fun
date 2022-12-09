import {joke} from '../configs/jokeSource.js'
class secondsModel{

    constructor(testArray = []){
        this.observers = [];
        this.testing = testArray;
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
            catch(err){ console.log(err);
            }
        }
        
        this.observers.forEach(invokeObserverCB)
    }

    fetchJoke(){
        joke();

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



}

export default secondsModel;
