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
            set(ref(database, REF + "/users/"+ user.uid + "/jokePreferences/"), model.preferenceNumber);
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
            model.cleanupAfterUser();
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
            // These payloads are for all users




            // These payloads are for individual users
            if (auth.currentUser) {

                if (payload.favoriteJokeToAdd){
                    set(ref(database, REF + "/users/"+ auth.currentUser.uid + "/favoriteJokes/" + payload.favoriteJokeToAdd.id), payload.favoriteJokeToAdd.category);
                }

                if (payload.removeJoke){
                    set(ref(database, REF + "/users/"+ auth.currentUser.uid + "/favoriteJokes/" + payload.removeJoke.id), null);
                }

                if (payload.favoriteComicToAdd){
                    set(ref(database, REF + "/users/"+ auth.currentUser.uid + "/favoriteComics/" + payload.favoriteComicToAdd.num), payload.favoriteComicToAdd.title);
                }

                if (payload.removeComic){
                    set(ref(database, REF + "/users/"+ auth.currentUser.uid + "/favoriteComics/" + payload.removeComic.num), null);
                }

                if (payload.preference){
                    set(ref(database, REF + "/users/"+ auth.currentUser.uid + "/jokePreferences/"), payload.preference);
                }
            }
        }
    }

    model.addObserver(obsACB);

}

function firebaseModelPromise() {

    function makeBigPromiseACB(firebaseData) {
        let user = null;

        if (firebaseData.val()) {

            /*
            if(firebaseData.val().favoriteJokes){
                favoriteJokes = firebaseData.val().favoriteJokes;
            }

            if(firebaseData.val().jokePreferences) {
                console.log(firebaseData.val().jokePreferences);
                if (firebaseData.val().jokePreferences.categories) {
                    jokeCategories = firebaseData.val().jokePreferences.categories;
                    console.log(jokeCategories);
                }
                if (firebaseData.val().jokePreferences.blacklist) {
                    jokeBlacklist = firebaseData.val().jokePreferences.blacklist;
                    console.log(jokeBlacklist);
                }
            }
            */

        }

        if (auth.currentUser) {
            user = auth.currentUser.email;
        }

        /*
        function makeJokePromiseCB(ID) {
            return getJokeByID(ID);
        }
        */
        
        function createModelACB() {
            return new secondsModel(user);
        }
        
        // const jokePromiseArray= Object.keys(favoriteJokes).map(makeJokePromiseCB);
        // return Promise.all(jokePromiseArray).then(createModelACB);

        return createModelACB();
    }

    return get(ref(database, REF)).then(makeBigPromiseACB);

}

function updateFirebaseFromModel(model) {
    observerRecap(model);
    return;
}

function updateModelFromFirebase(model) {

    // These should trigger regardless of if there is a user logged in or not




    // These only trigger if and when there is a user logged in
    if (auth.currentUser) {

        onValue(ref(database, REF + "/users/" + auth.currentUser.uid + "/jokePreferences/"),
            function inputHasChangedInFirebaseACB(firebaseData) {
                model.updatePreferences(firebaseData.val());
            }
        )

        onChildAdded(ref(database, REF + "/users/" + auth.currentUser.uid + "/favoriteJokes/"),
            function jokeAddedInFirebaseACB(firebaseData){
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
                model.removeFromFavorites({id: +firebaseData.key}); 
            }
        )

        onChildAdded(ref(database, REF + "/users/" + auth.currentUser.uid + "/favoriteComics/"),
            function comicAddedInFirebaseACB(firebaseData){
                function comicAlreadyAddedCB(comic) {
                    return comic.num == +firebaseData.key;
                }
                if (!model.favComics.find(comicAlreadyAddedCB)) {
                    model.addFavComic({num: +firebaseData.key, title: firebaseData.val()});
                }
            }
        )

        onChildRemoved(ref(database, REF + "/users/" + auth.currentUser.uid + "/favoriteComics/"),
            function comicRemovedInFirebaseACB(firebaseData){
                model.removeFromFavComic({num: +firebaseData.key, title: firebaseData.val()}); 
            }
        )
    }
    
    return;
}


export {observerRecap, firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase, createAccount, signInToAccount, signOutOfAccount};
