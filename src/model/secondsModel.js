class secondsModel{

    constructor(){
        this.observers = [];

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



}

export default secondsModel;
