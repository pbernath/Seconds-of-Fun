import promiseNoData from "../views/promiseNoData";
import resolvePromise from "../resolvePromise"

const Sidebar={ //Vue component
    props: ["model"], 
    data(){return {jokePromiseState: {} };},

    created(){},

    render(){

    function fetchJokeACB(){
        //this.jokePromiseState.promise=fetch joke from API 
        console.log("Presenter about to resolve promise")
        resolvePromise(this.jokePromiseState.promise, this.jokePromiseState)
    }


    return (
        <div>
            <ActivityChooser buttonClickEvent={fetchJokeACB.bind(this)} />
        </div>
    );

    },
};
export default Sidebar;
