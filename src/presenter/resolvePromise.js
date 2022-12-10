function resolvePromise(promiseToResolve, promiseState){
    if (promiseToResolve === null) {
        return;
    }

    promiseState.promise=promiseToResolve;
    promiseState.data= null;
    promiseState.error= null;

    function saveDataACB(result){ 
        if(promiseState.promise !== promiseToResolve) {
            return;
        }
        promiseState.data= result;
        console.log(promiseState.data.joke)
    }

    function saveErrorACB(err)  {
        if(promiseState.promise !== promiseToResolve) {
            return;
        }
        promiseState.error= err;

      
    }

    promiseToResolve.then(saveDataACB).catch(saveErrorACB);
}

export {resolvePromise};