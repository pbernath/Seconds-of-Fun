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
					<h1>Sign in to enable extra features!</h1>
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
						<tr></tr>
						<div class="pointer">
							<div v-if="!showPassword" @click="toggleShowPasswordACB">
								<table>
									<td>
										<h3 style="color: #ebebeba3"> (◕‿◕) </h3>
									</td>
									<td>
										<h3 style="color: #ebebeba3">Show Password</h3>
									</td>
								</table>
							</div>
							<div v-if="showPassword" @click="toggleShowPasswordACB">
								<table>
									<td>
										<h3 style="color: #ebebeba3"> (>‿&lt) </h3>
									</td>
									<td>
										<h3 style="color: #ebebeba3">Hide Password</h3>
									</td>
								</table>
							</div>
						</div>
					</td>
				</table>
				<br />
				<div>
					<styledButton v-if="logIn" buttonText="Sign In" @click="continueLogInACB" />
					<styledButton v-if="!logIn" buttonText="Sign Up!" @click="continueLogInACB" />
				</div>
			</div>
			<br />
			<div class="pointer">
				<div v-if="logIn" @click="switchToSignUpACB">
					<h3 style="color: #ebebeba3">
						Not yet registered? Click here to 
					</h3>
					<h3 style="color: #00bd7e">
						Sign Up!
					</h3>
				</div>
				<div v-if="!logIn" @click="switchToLogInACB">
					<h3 style="color: #ebebeba3">
						Already signed up? Click here to 
					</h3>
					<h3 style="color: #00bd7e">
						Sign In!
					</h3>
				</div>
			</div>
		</div>
		<div v-else>
			<h1>Signed in as </h1>
			<h1 style="color: #00bd7e">{{ fetchUser }}</h1>
			<br />
			<h3 @click="logOutACB" class="pointer">Click here to sign out!</h3>
		</div>
		<h3 color="red">{{ fetchErrorMessage }}</h3>
		<h3 color="red">{{ passwordMismatch }}</h3>
	</div>
</template>

<style scoped>
@media (min-width: 768px) {
	.about {
		min-height: 100vh;
		display: flex;
		align-items: center;
	}
	.login_page {
		width: 100%;
		height: 100%;
		border-color: #00bd7e;
		border-style: solid;
		border-radius: 0px;
		border-width: 0px;
		margin: auto;
	}
}
@media (max-width: 768px) {
	.about {
		min-height: 100vh;
		display: flex;
		align-items: center;
	}
	.login_page {
		width: 100%;
		height: 100%;
		border-color: #00bd7e;
		border-style: solid;
		border-radius: 0px;
		border-width: 0px;
	}
}
.pointer {
  cursor: pointer;
}
</style>

<script>
export default {
	props: ['userFromFirebase', 'errorMessage'],
	emits: ['getDetailsForAuthACB', 'signOutFromFirebaseACB', 'errorAckACB'],
	data() {
		return {
			logIn: true,
			showPassword: false,
			email: null,
			password: null,
			secondPassword: null,
			passwordMismatch: null,
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
	},
};
</script>
