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
import {getDatabase, ref, set, get, onChildRemoved, onChildAdded} from "firebase/database";
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const REF="testingModel";

function observerRecap(model) {

    function obsACB(payload){
    
        if (payload) {
            if (payload.input) {
                console.log(payload.input);
                set(ref(database, REF+"/input/" + payload.input), payload.input);
            }
            if (payload.addTestInfo) {
                set(ref(database, REF+"/testingList/" + payload.addTestInfo), payload.addTestInfo);
            }
            if (payload.removeTestInfo) {
                set(ref(database, REF+"/testingList/" + payload.removeTestInfo), null);
            }
        }
    }
    model.addObserver(obsACB);

}

function firebaseModelPromise() {

    function makeBigPromiseACB(firebaseData) {
        let testsList = [];

        if (firebaseData.val()) {
            if(firebaseData.val().testingList){
                testsList = firebaseData.val().testingList;
            }
        }
        
        /*
        function makeDishPromiseCB(dishId) {
            return getDishDetails(dishId);
        }
        */
        
        function createModelACB(testInfo) {
            return new secondsModel(testInfo);
        }

        const testPromiseArray= Object.keys(testsList);
        return Promise.all(testPromiseArray).then(createModelACB);
    }

    return get(ref(database, REF)).then(makeBigPromiseACB);

}

function updateFirebaseFromModel(model) {
    observerRecap(model);
    return;
}

function updateModelFromFirebase(model) {
    
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
    
    return;
}


export {observerRecap, firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase};
