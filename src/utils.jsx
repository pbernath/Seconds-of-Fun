function jokeSort(jokesList){
    function sortByIDCB(jokeA, jokeB){
        if (jokeA.id < jokeB.id) {
            return -1;
        } else if (jokeA.id > jokeB.id) {
            return 1;
        }
    }
    console.log(jokesList);
    return [...jokesList].sort(sortByIDCB);
}
export {jokeSort}
