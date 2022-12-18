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

            /*
            if (payload.input) {
                if (auth.currentUser) {
                    set(ref(database, REF + "/users/"+ auth.currentUser.uid + "/input/"), payload.input);
                }
            }
            */
        }
    }
    model.addObserver(obsACB);

}

function firebaseModelPromise() {

    function makeBigPromiseACB(firebaseData) {
        let user = null;

        if (firebaseData.val()) {
            /*
            if(firebaseData.val().user){
                user = firebaseData.val().user;
            }
            */
        }
        
        if (auth.currentUser) {
            user = auth.currentUser.email;
        }

        /*
        function makeDishPromiseCB(dishId) {
            return getDishDetails(dishId);
        }
        */
        
        function createModelACB() {
            return new secondsModel(user);
        }

        /*
        const testPromiseArray= Object.keys(testsList);
        return Promise.all(testPromiseArray).then(createModelACB);
        */
        
        return createModelACB();
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
    
    /*
    onChildAdded(ref(database, REF+"/testingList/"),
        function testAddedInFirebaseACB(firebaseData){
            function testAlreadyAddedCB(test) {
                return test == +firebaseData.key;
            }
            if (!model.testing.find(testAlreadyAddedCB)) {
                function addTestACB(test) {
                    model.addToTest(test);
                }
                addTestACB();
            }
        }
    )

    onChildRemoved(ref(database, REF+"/testingList/"),
        function testRemovedInFirebaseACB(firebaseData){
            model.removeFromTest({id: +firebaseData.key}); 
        }
    )
    */

    return;
}


export {observerRecap, firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase, createAccount, signInToAccount, signOutOfAccount};
