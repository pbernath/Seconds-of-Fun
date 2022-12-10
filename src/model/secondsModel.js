import {getJoke} from '../configs/jokeSource.js'
import {resolvePromise} from '../presenter/resolvePromise.js';
class secondsModel{

    constructor(testArray = []){
        this.jokePromiseState = {};
        this.testing = testArray;
    }

    setCurrentJoke(){ 
        resolvePromise(getJoke(), this.jokePromiseState)
        console.log(this.jokePromiseState);
    }



}

export default secondsModel;
