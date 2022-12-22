<!-- 
  * LoginView contains settings for how the login page looks, such as color, dimensions, messages and button settings.
-->

<script setup>
import styledButton from '../components/styledButton.vue';
import LoginPresenter from '../presenter/LoginPresenter.vue';
</script>

<template>
	<div>
		<div v-if="!fetchUser">
			<div>
				<div>
					<h1 v-if="logIn">Sign in to enable extra features!</h1>
					<h1 v-if="!logIn">Sign up to enable extra features!</h1>
				</div>
				<br />
				<table>
					<td>
						<div>
							<input
								id="emailField"
								type="text"
								placeholder="e-mail"
								@keydown="checkForEnterACB"
								v-model="email"
								style="background-color: #191a1c; color: white;"
							/>
						</div>
						<div>
							<input
								v-if="!showPassword"
								id="passwordField"
								type="password"
								placeholder="password"
								@keydown="checkForEnterACB"
								v-model="password"
								style="background-color: #191a1c; color: white;"
							/>
							<input
								v-else
								id="passwordField"
								type="text"
								placeholder="password"
								@keydown="checkForEnterACB"
								v-model="password"
								style="background-color: #191a1c; color: white;"
							/>
						</div>
						<div>
							<input
								v-if="!logIn && !showPassword"
								id="secondPasswordField"
								type="password"
								placeholder="repeat password"
								@keydown="checkForEnterACB"
								v-model="secondPassword"
								style="background-color: #191a1c; color: white;"
							/>
							<input
								v-if="!logIn && showPassword"
								id="secondPasswordField"
								type="text"
								placeholder="repeat password"
								@keydown="checkForEnterACB"
								v-model="secondPassword"
								style="background-color: #191a1c; color: white;"
							/>
						</div>
					</td>
					<td></td>
					<td>
						<div class="wide">
							<br />
							<div v-if="!showPassword" @click="toggleShowPasswordACB">
								<h3>
									<span style="color: #00bd7e"> (◕‿◕)  </span>
									<span style="color: #ebebeba3"> Show Password</span>
								</h3>
							</div>
							<div v-if="showPassword" @click="toggleShowPasswordACB">
								<h3>
									<span style="color: #00bd7e"> (>‿&lt)  </span>
									<span style="color: #ebebeba3"> Hide Password</span>
								</h3>
							</div>
						</div>
					</td>
				</table>
				<div class="narrow">
					<div v-if="!showPassword" @click="toggleShowPasswordACB">
						<h3>
							<span style="color: #00bd7e"> (◕‿◕)  </span>
							<span style="color: #ebebeba3"> Show Password</span>
						</h3>
					</div>
					<div v-if="showPassword" @click="toggleShowPasswordACB">
						<h3>
							<span style="color: #00bd7e"> (>‿&lt)  </span>
							<span style="color: #ebebeba3"> Hide Password</span>
						</h3>
					</div>
				</div>
				<div>
					<img src="../assets/right-500.png" @click="continueLogInACB" class="flex_continueButton" />
				</div>
			</div>
			<div class="wide">
				<div v-if="logIn" @click="switchToSignUpACB">
					<h3>
						<span style="color: #ebebeba3">
							Not yet registered? Click here to 
						</span>
						<span style="color: #00bd7e">
							Sign Up!
						</span>
					</h3>
				</div>
				<div v-if="!logIn" @click="switchToLogInACB">
					<h3>
						<span style="color: #ebebeba3">
							Already signed up? Click here to 
						</span>
						<span style="color: #00bd7e">
							Sign In!
						</span>
					</h3>
				</div>
			</div>
			<div class="narrow">
				<div v-if="logIn" @click="switchToSignUpACB">
					<h3>
						<span style="color: #ebebeba3">
							Not yet registered? 
						</span>
					</h3>
					<h3>
						<span style="color: #ebebeba3">
							Click here to 
						</span>
						<span style="color: #00bd7e">
							Sign Up!
						</span>
					</h3>
				</div>
				<div v-if="!logIn" @click="switchToLogInACB">
					<h3>
						<span style="color: #ebebeba3">
							Already signed up? 
						</span>
						<span style="color: #00bd7e">
							Sign In!
						</span>
					</h3>
					<h3>
						<span style="color: #ebebeba3">
							Click here to 
						</span>
						<span style="color: #00bd7e">
							Sign In!
						</span>
					</h3>
				</div>
			</div>
		</div>
		<div v-else>
			<h1>
				<span>Signed in as </span>
				<span style="color: #00bd7e">{{ fetchUser }}</span>
			</h1>
			<br />
			<div>
				<span>
					<img src="../assets/joke-500-like.png" @click="goToFavJokeACB" class="flex_continueButton" />
				</span>
				<span>
					<img src="../assets/dude-500-thicc-like.png" @click="goToFavComicACB" class="flex_continueButton" />
				</span>
				<span>
					<img src="../assets/user-500-x.png" @click="logOutACB" class="flex_continueButton" />
				</span>
			</div>
		</div>
		<h3 style="color: #df6464">{{ fetchErrorMessage }}</h3>
		<h3 style="color: #df6464">{{ passwordMismatch }}</h3>
	</div>
</template>

<style scoped>
@media (min-width: 410px) {
	.wide {
		display:block;
		cursor: pointer;
	}
	.narrow {
		display: none;
	}
}
@media (max-width: 410px) {
	.wide {
		display: none;
	}
	.narrow {
		display: block;
		cursor: pointer;
	}
}

.pointer {
  cursor: pointer;
}
.flex_continueButton{
    cursor: pointer;
	width: 5em;
    height: 5em;
  }
  .flex_continueButton:hover{
    background-color:#00bd7e1b;
  }

</style>

<script>
export default {
	props: ['userFromFirebase', 'errorMessage',],
	emits: ['getDetailsForAuthACB', 'signOutFromFirebaseACB', 'errorAckACB', 'jokeFavoritesRoutingACB', 'comicFavoritesRoutingACB',],
	data() {
		return {
			logIn: true,
			showPassword: false,
			email: null,
			password: null,
			secondPassword: null,
			passwordMismatch: null,
			currentWidth: window.innerWidth,
		};
	},
	created() {},
	computed: {
		fetchUser() {
			return this.userFromFirebase;
		},
		fetchErrorMessage() {
			let error = this.errorMessage;
			if (error) {
				return 'Error: ' + error.split('/').pop();
			} else {
				return null;
			}
		},
		checkWidth() {
			this.currentWidth = window.innerWidth;
			return this.currentWidth;
		}
	},
	methods: {
		toggleShowPasswordACB() {
			this.showPassword = !this.showPassword;
		},
		switchToSignUpACB() {
			this.logIn = false;
		},
		switchToLogInACB() {
			this.secondPassword = null;
			this.logIn = true;
		},
		checkForEnterACB(e) {
			if (e.key === 'Enter') {
				this.continueLogInACB();
			}
		},
		continueLogInACB() {
			this.$emit('errorAckACB');
			this.passwordMismatch = null;
			if (!this.logIn) {
				if (this.password !== this.secondPassword) {
					this.passwordMismatch = "Error: password fields don't match";
					this.password = null;
					this.secondPassword = null;
					return;
				}
			}
			this.$emit('getDetailsForAuthACB', { email: this.email, password: this.password, logIn: this.logIn });
			this.password = null;
			this.secondPassword = null;
		},
		logOutACB() {
			this.switchToLogInACB();
			this.showPassword = false;
			this.$emit('signOutFromFirebaseACB');
		},
		goToFavJokeACB() {
			this.$emit("jokeFavoritesRoutingACB");
		},
		goToFavComicACB() {
			this.$emit("comicFavoritesRoutingACB");
		},
	},
};
</script>
