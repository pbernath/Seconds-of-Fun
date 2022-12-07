import firebaseConfig from "../configs/firebaseConfig.js";
import secondsModel from "./secondsModel.js";

firebase.initializeApp(firebaseConfig);
const REF="testingModel";

function observerRecap(model) {

    function obsACB(payload){
        
        if (payload) {
            if (payload.addTestInfo) {
                firebase.database().ref(REF+"/testingList/" + payload.addTestInfo).set(payload.addTestInfo);
            }  if (payload.removeTestInfo) {
                firebase.database().ref(REF+"/testingList/" + payload.removeTestInfo).set(null);
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
        
        return firebase.database().ref(REF).once("value").then(makeBigPromiseACB);
}

function updateFirebaseFromModel(model) {
    observerRecap(model);
    return;
}

function updateModelFromFirebase(model) {

    firebase.database().ref(REF+"/testingList/").on(
        "child_added",
        function testAddedInFirebaseACB(firebaseData){
            function testAlreadyAddedCB(test) {
                return test == +firebaseData.key;
            }
            if (!model.testing.find(testAlreadyAddedCB)) {
                function addTestACB(test) {
                    model.addToTest(test);
                }
                getDishDetails(firebaseData.key).then(addTestACB);
            }
        },
    );

    firebase.database().ref(REF+"/testingList/").on(
        "child_removed",
        function testRemovedInFirebaseACB(firebaseData){
            model.removeFromTest({id: +firebaseData.key}); 
        },
    );

    return;
}


export {observerRecap, firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase};
