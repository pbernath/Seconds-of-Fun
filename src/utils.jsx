function jokeSort(jokesList){
    function sortByIDCB(jokeA, jokeB){
        if (jokeA.id < jokeB.id) {
            return -1;
        } else if (jokeA.id > jokeB.id) {
            return 1;
        }
    }
    return [...jokesList].sort(sortByIDCB);
}
export {jokeSort}
