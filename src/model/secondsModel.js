/**
    * secondsModel.js is the model for the Seconds of Fun page.
    * It is responsible for storing the state of the page and notifying the view when the state changes.
*/

import { getJoke } from '../jokeSource.js';
import { resolvePromise } from '../resolvePromise.js';
class secondsModel {
	constructor(input = '', user = null) {
		this.observers = [];
		this.jokePromiseState = {};
		this.currentInput = input;
		this.user = user;
	}

	addObserver(addObserverACB) {
		this.observers = [...this.observers, addObserverACB];
	}

	removeObserver(removeObserverACB) {
		function removeObsCB(obs) {
			return obs !== removeObserverACB;
		}
		this.observers = this.observers.filter(removeObsCB);
	}

	notifyObservers(payload) {
		function invokeObserverCB(obs) {
			try {
				obs(payload);
			} catch (err) {
				console.log(err);
			}
		}
		this.observers.forEach(invokeObserverCB);
	}

	setCurrentJoke() {
		resolvePromise(getJoke(), this.jokePromiseState);
	}

	setInput(input) {
		this.currentInput = input;
		this.notifyObservers({ input: input });
	}

	getInput() {
		return this.currentInput;
	}

	addToTest(infoToAdd) {
		this.testing = [...this.testing, infoToAdd];

		this.notifyObservers({ addTestInfo: infoToAdd });
	}

	removeFromTest(infoToRemove) {
		function hasSameIdNotifsCB(info) {
			return info === infoToRemove;
		}

		if (this.testing.some(hasSameIdNotifsCB) == false) {
			return;
		}

		function hasSameIdCB(info) {
			if (info === infoToRemove) {
				return false;
			}
			return true;
		}

		this.testing = this.testing.filter(hasSameIdCB);

		this.notifyObservers({ removeTestInfo: infoToRemove });
	}

	setUser(user) {
		this.user = user;
		this.notifyObservers({ userID: user });
	}

	getUser() {
		return this.user;
	}

	setCurrentJoke() {
		resolvePromise(getJoke(), this.jokePromiseState);
	}
}

export default secondsModel;
