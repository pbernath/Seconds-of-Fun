export default function promiseNoData(promiseState){
    //function to handle promise data rendering
    if(!promiseState.promise){                                     
        return <div>no data</div>}
        
    if(promiseState.promise && !promiseState.data && !promiseState.error){    
        return <img src = "http://www.csc.kth.se/~cristi/loading.gif"/>;
    }

    if(promiseState.promise && !promiseState.data && promiseState.error){                 
        return <div>{promiseState.error.error}</div>;
    } 

    if(promiseState.promise && promiseState.data && !promiseState.error){                                                              
        return false;
    }
}