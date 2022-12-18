/*
    * firebaseModel.js is responsible for storing the state of the page and notifying the view when the state changes.
    * It is also responsible for communicating with the database.
*/

import firebaseConfig from "../configs/firebaseConfig.js";
import secondsModel from "./secondsModel.js";

// Instructions from Firebase.
import {initializeApp} from "firebase/app";
import {getDatabase, ref, set, get, onChildRemoved, onChildAdded, onValue} from "firebase/database";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { getJoke, getJokeByID } from "../jokeSource.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const REF="cloudModel";


function createAccount (email, password, model) {
    createUserWithEmailAndPassword(auth, email, password)
    .then(function handleSignUp (userCredential) {
            // Signed in
            const user = userCredential.user;
            model.setUser(user.email);
            model.setAuthErrorMessage(null);
        }
    )
    .catch(function handleError (error) {
            const errorCode = error.code;
            console.log(errorCode);
            model.setAuthErrorMessage(errorCode);
        }
    );
}

function signInToAccount (email, password, model) {
    signInWithEmailAndPassword(auth, email, password)
    .then(function handleSignIn (userCredential) {
            // Signed in
            const user = userCredential.user;
            model.setUser(user.email);
            model.setAuthErrorMessage(null);
            updateModelFromFirebase(model);
        }
    )
    .catch(function handleError (error) {
            const errorCode = error.code;
            console.log(errorCode);
            model.setAuthErrorMessage(errorCode);
        }
    );
}

function signOutOfAccount (model) {
    signOut(auth)
    .then(function handleSignOut () {
            // Sign-out successful
            model.setUser(null);
            model.setAuthErrorMessage(null);
            updateModelFromFirebase(model);
        }
    )
    .catch(function handleError (error) {
            const errorCode = error.code;
            console.log(errorCode);
            model.setAuthErrorMessage(errorCode);
        }
    );
}


function observerRecap(model) {

    function obsACB(payload){
    
        if (payload) {

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

            if(firebaseData.val().favoriteJokes){
                favoriteJokes = firebaseData.val().favoriteJokes;
                console.log(favoriteJokes);
            }

        }
        
        if (auth.currentUser) {
            user = auth.currentUser.email;
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

    /*
    onValue(ref(database, REF + "/users/" + auth.currentUser.uid + "/input/"),
        function inputHasChangedInFirebaseACB(firebaseData) {
            model.setInput(firebaseData.val());
        }
    )
    */
    
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


export {observerRecap, firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase, createAccount, signInToAccount, signOutOfAccount};
