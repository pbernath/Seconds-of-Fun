/**
    * This function is used to resolve a promise and save the result in the promiseState object.
    * When the promise is resolved, the function calls the notify function.
*/

function resolvePromise(promiseToResolve, promiseState, notify){
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
        if (notify) {
            notify();
        }
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