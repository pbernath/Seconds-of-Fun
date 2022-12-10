import {getJoke} from '../configs/jokeSource.js'
import {resolvePromise} from '../presenter/resolvePromise.js';
class secondsModel{

    constructor(testArray = []){
        this.jokePromiseState = {};
        this.testing = testArray;

        this.currentJoke = "";
    }

    setCurrentJoke(){ 
        resolvePromise(getJoke(), this.jokePromiseState)
    }



}

export default secondsModel;
