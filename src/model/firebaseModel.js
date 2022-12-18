import firebaseConfig from "../configs/firebaseConfig.js";
import secondsModel from "./secondsModel.js";

/*
// as done in the turorial
import firebase from "firebase/app";
import "firebase/database";
firebase.initializeApp(firebaseConfig);
*/


// instructions from firebase, but how to call the functions? firebase.database not a function...
import {initializeApp} from "firebase/app";
import {getDatabase, ref, set, get, onChildRemoved, onChildAdded, onValue} from "firebase/database";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
import { getJoke, getJokeByID } from "../jokeSource.js";
const REF="cloudModel";



function createAccount (email, password, model) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            model.setUser(user.uid);
        }
    )
    .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
        }
    );
}

function signInToAccount (email, password, model) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            model.setUser(user.uid);
            updateModelFromFirebase(model);
        }
    )
    .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
        }
    );
}


function observerRecap(model) {

    function obsACB(payload){
        if (payload) {
            if (payload.userID) {
                set(ref(database, REF + "/user/"), payload.userID);
            }
            if (payload.favoriteJokeToAdd){
                if (auth.currentUser) {
                    set(ref(database, REF + "/users/"+ auth.currentUser.uid + "/favoriteJokes/" + payload.favoriteJokeToAdd.id), payload.favoriteJokeToAdd.category);
                }
            }
            if (payload.removeJoke){
                if (auth.currentUser) {
                    set(ref(database, REF + "/users/"+ auth.currentUser.uid + "/favoriteJokes/" + payload.removeJoke.id), null);
                }
            }
        }
    }
    model.addObserver(obsACB);

}

function firebaseModelPromise() {

    function makeBigPromiseACB(firebaseData) {
        let user = null;
        let favoriteJokes = [];
        if (firebaseData.val()) {
            if(firebaseData.val().user){
                user = firebaseData.val().user;
            }
            if(firebaseData.val().favoriteJokes){
                favoriteJokes = firebaseData.val().favoriteJokes;
                console.log(favoriteJokes)
            }
        }
        
        
        function makeJokePromiseCB(ID) {
            return getJokeByID(ID);
        }
        
        function createModelACB() {
            return new secondsModel(user, favoriteJokes);
        }

        const jokePromiseArray= Object.keys(favoriteJokes).map(makeJokePromiseCB);
        return Promise.all(jokePromiseArray).then(createModelACB);

    
    }

    return get(ref(database, REF)).then(makeBigPromiseACB);

}

function updateFirebaseFromModel(model) {
    observerRecap(model);
    return;
}

function updateModelFromFirebase(model) {

    onValue(ref(database, REF+"/user/"),
        function userHasChangedInFirebaseACB(firebaseData) {
            model.setUser(firebaseData.val());
        }
    )
    
    
    onChildAdded(ref(database, REF + "/users/" + auth.currentUser.uid + "/favoriteJokes/"),
        function testAddedInFirebaseACB(firebaseData){
            function jokeAlreadyAddedCB(joke) {
                return joke.id == +firebaseData.key;
            }
            if (!model.favoriteJokes.find(jokeAlreadyAddedCB)) {
                function addjokeACB(joke) {
                    model.addJokeToFavorites(joke);
                }
                getJokeByID(+firebaseData.key).then(addjokeACB);
            }
        }
    )

    onChildRemoved(ref(database, REF + "/users/" + auth.currentUser.uid + "/favoriteJokes/"),
        function jokeRemovedInFirebaseACB(firebaseData){
            console.log(model.favoriteJokes)
            model.removeFromFavorites({id: +firebaseData.key}); 
            console.log(model.favoriteJokes)
        }
    )
    return;
}


export {observerRecap, firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase, createAccount, signInToAccount};
