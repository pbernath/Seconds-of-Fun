import getJokeFromCat from "../jokeSource.js"
export default
function MainContent(props){ //Exports function as MainContent(from mainContentPresenter.js)

    function someACB(){
        console.log(getJokeFromCat)
    }

    return (<MainContentView someEvent={someACB}
    />
    ); //returns component to be displayed in App
}