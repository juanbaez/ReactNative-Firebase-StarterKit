import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { errorMessages } from '../constants/messages';

const FirebaseRef = database().ref();

export default {
  state: {}, // initial state

  /**
   * Reducers
   */
  reducers: {
    setUserLogin(state, payload) {
      const { uid, email, emailVerified } = payload;

      return {
        ...state,
        uid,
        email,
        emailVerified,
      };
    },

    setUserDetails(state, payload) {
      const {
        firstName, lastName, signedUp, role,
      } = payload;

      return {
        ...state,
        firstName,
        lastName,
        signedUp,
        role,
      };
    },

    resetUser() {
      return {};
    },
  },

  /**
   * Effects/Actions
   */
  effects: (dispatch) => ({
    /**
     * Sign Up
     *
     * @param {obj} formData - data from form
     * @return {Promise}
     */
    signUp(formData) {
      const {
        email, password, password2, firstName, lastName,
      } = formData;

      return new Promise((resolve, reject) => {
        // Validation rules
        if (!firstName) return reject({ message: errorMessages.missingFirstName });
        if (!lastName) return reject({ message: errorMessages.missingLastName });
        if (!email) return reject({ message: errorMessages.missingEmail });
        if (!password) return reject({ message: errorMessages.missingPassword });
        if (!password2) return reject({ message: errorMessages.missingPassword });
        if (password !== password2) return reject({ message: errorMessages.passwordsDontMatch });

        // Go to Firebase
        return auth().createUserWithEmailAndPassword(email, password)
          .then((res) => {
            // Send user details to Firebase database
            if (res && res.user.uid) {
              FirebaseRef.child(`users/${res.user.uid}`).set({
                firstName,
                lastName,
                signedUp: database.ServerValue.TIMESTAMP,
                lastLoggedIn: database.ServerValue.TIMESTAMP,
              }).then(resolve);
            }
          }).catch(reject);
      }).catch((err) => { throw err.message; });
    },

    /**
     * Listen for realtime updates on the current user
     */
    listenForMemberProfileUpdates() {
      const UID = (
        FirebaseRef
        // && Firebase
        && auth()
        && auth().currentUser
        && auth().currentUser.uid
      ) ? auth().currentUser.uid : null;

      if (!UID) return false;

      const ref = FirebaseRef.child(`users/${UID}`);

      return ref.on('value', (snapshot) => {
        const userData = snapshot.val() || [];

        this.setUserDetails(userData); // Send to reducer
      });
    },

    /**
     * Get the current Member's Details
     *
     * @returns {Promise}
     */
    getMemberData() {
      if (auth === null) return new Promise((resolve) => resolve);

      // Ensure token is up to date
      return new Promise((resolve) => {
        auth().onAuthStateChanged((loggedIn) => {
          if (loggedIn) {
            this.listenForMemberProfileUpdates(dispatch);
            return resolve();
          }

          return new Promise(() => resolve);
        });
      });
    },

    /**
     * Login to Firebase with Email/Password
     *
     * @param {obj} formData - data from form
     * @return {Promise}
     */
    login(formData) {
      const { email, password } = formData;

      return new Promise((resolve, reject) => {
        // Validation rules
        if (!email || email.length === 0) return reject({ message: errorMessages.missingEmail });
        if (!password || password.length === 0) {
          return reject({ message: errorMessages.missingPassword });
        }

        // Go to Firebase
        return auth().signInWithEmailAndPassword(email, password)
          .then(async (res) => {
            const userDetails = res && res.user ? res.user : null;

            // Save the user's login data (email, UID)
            this.setUserLogin(userDetails);

            // Update last logged in data
            if (userDetails.uid) {
              FirebaseRef.child(`users/${userDetails.uid}`).update({
                lastLoggedIn: database.ServerValue.TIMESTAMP,
              });

              // Send verification Email when email hasn't been verified
              if (userDetails.emailVerified === false) {
                auth().currentUser.sendEmailVerification()
                  .catch(() => console.log('Verification email failed to send'));
              }

              // Get/Save User Profile (name, signed up date etc)
              this.listenForMemberProfileUpdates(dispatch);
            }

            return resolve();
          }).catch(reject);
      }).catch((err) => { throw err.message; });
    },

    /**
     * Reset Password
     *
     * @param {obj} formData - data from form
     * @return {Promise}
     */
    resetPassword(formData) {
      const { email } = formData;

      return new Promise((resolve, reject) => {
        // Validation rules
        if (!email) return reject({ message: errorMessages.missingEmail });

        // Go to Firebase
        return auth().sendPasswordResetEmail(email)
          .then(() => {
            this.resetUser();
            resolve();
          }).catch(reject);
      }).catch((err) => { throw err.message; });
    },

    /**
     * Update Profile
     *
     * @param {obj} formData - data from form
     * @return {Promise}
     */
    updateProfile(formData) {
      const {
        email, password, password2, firstName, lastName, changeEmail, changePassword,
      } = formData;

      return new Promise((resolve, reject) => {
        // Are they a user?
        // TODO:
        // Se quita el await en la siguiente linea, por la siguiente
        // recomendacion del ESLint
        // disallow using an async function as a Promise executor (no-async-promise-executor)
        const UID = auth().currentUser.uid;
        if (!UID) return reject({ message: errorMessages.memberNotAuthd });

        // Validation rules
        if (!firstName) return reject({ message: errorMessages.missingFirstName });
        if (!lastName) return reject({ message: errorMessages.missingLastName });
        if (changeEmail) {
          if (!email) return reject({ message: errorMessages.missingEmail });
        }
        if (changePassword) {
          if (!password) return reject({ message: errorMessages.missingPassword });
          if (!password2) return reject({ message: errorMessages.missingPassword });
          if (password !== password2) return reject({ message: errorMessages.passwordsDontMatch });
        }

        // Go to Firebase
        return FirebaseRef.child(`users/${UID}`).update({ firstName, lastName })
          .then(async () => {
            // Update Email address
            if (changeEmail) {
              await auth().currentUser.updateEmail(email).catch(reject);
            }

            // Change the Password
            if (changePassword) {
              await auth().currentUser.updatePassword(password).catch(reject);
            }

            return resolve();
          }).catch(reject);
      }).catch((err) => { throw err.message; });
    },

    /**
     * Logout
     *
     * @returns {Promise}
     */
    logout() {
      return new Promise((resolve, reject) => auth().signOut()
        .then(() => {
          this.resetUser();
          resolve();
        }).catch(reject)).catch((err) => { throw err.message; });
    },

  }),
};
