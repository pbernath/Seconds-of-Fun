export default function resolvePromise(promise, promiseState, notify){
    if(promise===null){
        return promiseState;
    }

    if(notify){
        console.log("Resolve promise notice"); 
        notify();
    }

    promiseState.promise=promise;
    promiseState.data= null;           
    promiseState.error= null;
    
    function saveDataACB(result){ 
        if(promiseState.promise!==promise) return;
        promiseState.data= result; 
        if(notify) notify();
    }  // triggers UI update because of changing state

    function saveErrorACB(err)  { 
        if(promiseState.promise!==promise) return;
        promiseState.error= err; 
        if(notify)notify();
    }    // triggers UI update because of changing state

    return promise.then(saveDataACB).catch(saveErrorACB);
}