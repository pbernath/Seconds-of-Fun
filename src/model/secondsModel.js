import {getJoke} from '../jokeSource.js'
import {resolvePromise} from '../resolvePromise.js';
class secondsModel{

    constructor(testArray = []){
        this.jokePromiseState = {};
        this.testing = testArray;
    }
    
    setCurrentJoke(){ 
        resolvePromise(getJoke(), this.jokePromiseState)
        
    }

    

}

export default secondsModel;
