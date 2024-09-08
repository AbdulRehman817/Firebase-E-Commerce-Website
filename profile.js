import {
  auth,
  signOut,
  onAuthStateChanged,
  addDoc,
  collection,
  db,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  limit,
  doc,
  getDocs,
} from "./firebase-config.js";
const email = document.querySelector("#email");
const name = document.querySelector("#name");
const loader = document.querySelector("#loader");
// const main = document.querySelector("#main");
const div = document.querySelector("#div");
const logo = document.querySelector("#logo");
const userName = document.querySelector("#userName");
const userEmail = document.querySelector("#userEmail");
// const signOut = document.querySelector("#logOut");
let logOut = document.querySelector("#logOut");
const products = document.querySelector("#products");
const main = document.querySelector(".main");
const navbar = document.querySelector("#main");
let userUid;
let username;
let userPic;
// let getIma
let userData;
onAuthStateChanged(auth, (user) => {
  userData = user;

  if (user) {
    main.style.display = "block";
    navbar.style.display = "block";
    // products.style.display = "block";
    loader.style.display = "none";
    console.log("log in");
    console.log(user);
    console.log(user.uid);
    console.log(user.photoURL);
    console.log(user.image);
    userUid = user.uid;
    console.log(userUid);
    userData = user;
    const users = [];
    if (userData.displayName && userData.photoURL) {
      logo.src = userData.photoURL;
      console.log(logo);

      // `<p> ${doc.data().firstName + lastName}</p> `;
      userName.innerHTML = userData.displayName;
      userEmail.innerHTML = userData.email;
      console.log(userData);
      console.log(userData.photoURL);
    }

    // userPic = ;
  }
  getAllTodos();
  console.log("user=======>", user);
  if (!window.location.pathname === "./profile.html") {
    window.location = "./profile.html";
  } else {
    if (!window.location.pathname === "./sigin.html") {
      window.location = "./sigin.html";
    }
  }
});
// const signOut = document.querySelector("#logOut");

const users = [];
let getAllTodos = async () => {
  const res = await getDocs(collection(db, "userData"));
  res.forEach((doc) => {
    let { firstName, lastName } = doc.data();
    console.log(doc.data());
    if (userUid === doc.data().id) {
      console.log(doc.data());
      users.push(doc.data());
      logo.src = doc.data().image;
      // `<p> ${doc.data().firstName + lastName}</p> `;
      userName.innerHTML = doc.data().firstName + lastName;
      userEmail.innerHTML = doc.data().email;
    }
  });
  console.log(users);
};

logOut.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location = "./sigin.html";
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
});

//
