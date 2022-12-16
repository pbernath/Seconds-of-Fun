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
            if (payload.input) {
                if (auth.currentUser) {
                    set(ref(database, REF + "/users/"+ auth.currentUser.uid + "/input/"), payload.input);
                }
            }
            if (payload.userID) {
                set(ref(database, REF + "/user/"), payload.userID);
            }
        }
    }
    model.addObserver(obsACB);

}

function firebaseModelPromise() {

    function makeBigPromiseACB(firebaseData) {
        let input = "";
        let user = null;

        if (firebaseData.val()) {
            if(firebaseData.val().input){
                input = firebaseData.val().input;
            }
            if(firebaseData.val().user){
                user = firebaseData.val().user;
            }
        }
        
        /*
        function makeDishPromiseCB(dishId) {
            return getDishDetails(dishId);
        }
        */
        
        function createModelACB() {
            return new secondsModel(input, user);
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

    onValue(ref(database, REF + "/users/" + auth.currentUser.uid + "/input/"),
        function inputHasChangedInFirebaseACB(firebaseData) {
            model.setInput(firebaseData.val());
        }
    )

    onValue(ref(database, REF+"/user/"),
        function userHasChangedInFirebaseACB(firebaseData) {
            model.setUser(firebaseData.val());
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
