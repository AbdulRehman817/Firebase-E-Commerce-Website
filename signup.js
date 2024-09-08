import {
  auth,
  createUserWithEmailAndPassword,
  ref,
  storage,
  getDownloadURL,
  uploadBytesResumable,
  addDoc,
  collection,
  db,
  doc,
  updateProfile,
} from "./firebase-config.js";

// const signup_btn = document.querySelector("#signup_btn");
// signup_btn.addEventListener("click", async (e) => {
//   e.preventDefault();
//   const email = document.querySelector("#email").value;
//   const password = document.querySelector("#password").value;
//   const image = document.querySelector("#image");
//   const firstName = document.querySelector("#first_name").value;
//   console.log(firstName);
//   const lastName = document.querySelector("#last-name").value;
//   console.log(lastName);
//   const profilePic = image.files[0];
//   createUserWithEmailAndPassword(auth, email, password)
//     .then(async (userCredential) => {
//       // Signed up
//       const user = userCredential.user;
//       if (user) {
//         console.log(user);
//         await updateProfile(user, {
//           // update user detail in user object
//           displayName: `${firstName} ${lastName}`,
//           photoURL: getImage,
//         });

//         const imageRef = ref(
//           storage,
//           `usersImage/${profilePic.name}
//           `
//         );
//         const uploadImg = await uploadBytes(imageRef, profilePic);
//         console.log("Image Uploaded successfull", uploadImg);
//         // uploading image
//         const getImage = await getDownloadURL(ref(imageRef)); // download img url
//         console.log("Uploaded image url", getImage);

//         // const uid = user.uid;

//         let userData = {
//           email,
//           password,
//           firstName,
//           lastName,
//           getImage,
//           uid,
//         };

//         // Add a new document with a generated id.
//         const docRef = await addDoc(collection(db, "usersdata"), userData);
//         console.log("Document written with ID: ", docRef.id);
//         console.log(docRef);
//         console.log("Account creation successful", user);
//         console.log(user.displayName);
//         console.log(user.photoURL);
//         window.location.replace("./profile.html");
//       }
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // ..
//     });
// });

// import {

// } from "./firebase-config.js";

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const signup_btn = document.querySelector("#signup_btn");
const image = document.querySelector("#image");
const firstName = document.querySelector("#first_name");
let uid;
console.log(firstName);
const lastName = document.querySelector("#last-name");
console.log(lastName);

let getImage;
// const profilePic = e.target.elements.file;

signup_btn.addEventListener("click", (e) => {
  e.preventDefault();
  const createUser = createUserWithEmailAndPassword(
    auth,
    email.value,
    password.value
  )
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user);
      uid = user.uid;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..

      let uploadImage = () => {
        const profilePic = image.files[0];
        // console.log(profilePic);
        const imageRef = ref(storage, `usersImage/${profilePic.name}`);
        const uploadTask = uploadBytesResumable(imageRef, profilePic);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            const imageUrl = getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                getImage = downloadURL;
                console.log(getImage);
              }
            );
          }
        );
      };
      uploadImage();
    });
  let userData = {
    email,
    password,
    firstName,
    lastName,
    getImage,
    uid,
  };

  const update = updateProfile(createUser.user, {
    displayName: `${firstName} ${lastName}`,
    photoURL: getImage,
  })
    .then(() => {
      // Profile updated!
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
    });

  let uploadData = async () => {
    try {
      const docRef = await addDoc(collection(db, "userData"), {
        email: email.value,
        password: password.value,
        image: getImage,
        firstName: firstName.value,
        lastName: lastName.value,
        id: uid,
      });
      console.log("Document written with ID: ", docRef.id);
      console.log("login successfully: ", createUser);
      console.log(docRef);
      // console.log("account created successfully", createData);
      window.location = "./profile.html";
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  uploadData();
});
