export default
function MainContent(props){ //Exports function as MainContent(from mainContentPresenter.js)

    function someACB(){
        
    }

    return (<MainContentView someEvent={props.doSomething}
    />
    ); //returns component to be displayed in App
}