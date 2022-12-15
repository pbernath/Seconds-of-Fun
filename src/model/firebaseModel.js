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

const REF="testingModel";



function createAccount (email, password) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            return user;
        }
    )
    .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return {errorCode, errorMessage};
        }
    );
}

function signInToAccount (email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            return user;
        }
    )
    .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return {errorCode, errorMessage};
        }
    );
}


function observerRecap(model) {

    function obsACB(payload){
    
        if (payload) {
            if (payload.input) {
                set(ref(database, REF + "/input/"), payload.input);
            }
        }
    }
    model.addObserver(obsACB);

}

function firebaseModelPromise() {

    function makeBigPromiseACB(firebaseData) {
        let input = "";

        if (firebaseData.val()) {
            if(firebaseData.val().input){
                input = firebaseData.val().input;
            }
        }
        
        /*
        function makeDishPromiseCB(dishId) {
            return getDishDetails(dishId);
        }
        */
        
        function createModelACB() {
            return new secondsModel(input);
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

    onValue(ref(database, REF+"/input/"),
        function inputHasChangedInFirebaseACB(firebaseData) {
            model.setInput(firebaseData.val());
        }
    )
    
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


export {observerRecap, firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase, createAccount, signInToAccount};
