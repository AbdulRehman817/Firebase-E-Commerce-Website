import {
  auth,
  doc,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  db,
  provider,
} from "./firebase-config.js";

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const sigin_btn = document.querySelector("#sigin_btn");
const google_btn = document.querySelector("#google_btn");
const signin_google = document.querySelector("#sigin_google  ");

sigin_btn.addEventListener("click", (e) => {
  e.preventDefault();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user, "user ================>");
      // addData(user);
      window.location = "./profile.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error ==============>", errorMessage);
    });
});

signin_google.addEventListener("click", (e) => {
  e.preventDefault();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // addUserToFirebase(user);
      console.log("user ==================>", user);
      window.location = "./profile.html";

      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, "error ============>");

      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});
