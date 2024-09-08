import {
  ref,
  storage,
  uploadBytes,
  collection,
  addDoc,
  getDownloadURL,
  db,
  onAuthStateChanged,
  auth,
} from "./firebase-config.js";

let uid;

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    uid = user.uid;
    console.log(uid);
  } else {
    // User is signed out
    // ...
  }
});

const product_form = document.querySelector("#product_form");
product_form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e);
  const title = e.srcElement[0].value;
  console.log(title);

  const description = e.srcElement[1].value;
  console.log(description);

  const price = e.srcElement[2].value;
  console.log(price);

  const img = e.srcElement[3].files[0];
  console.log(img);

  const button = e.srcElement[4];
  const loader = document.getElementById("loader");
  if (!img) {
    return alert("picture is required");
  }
  button.setAttribute("disabled", "true");
  loader.style.display = "block";

  const storageRef = ref(storage, img.name);
  //   const storageRef = ref(storage, picture.name);
  uploadBytes(storageRef, img).then((snapshot) => {
    getDownloadURL(storageRef).then((url) => {
      const productData = {
        title,
        description,
        price,
        img: url,
        uid,
      };
      // const currentUser = localStorage.setItem(
      //   "productData",
      //   JSON.stringify(productData)
      // );
      // console.log(currentUser);
      addDoc(collection(db, "products"), productData).then((snapshot) => {
        console.log(snapshot);

        // loader display none
        window.location.href = "./profile.html"; // ek nayi file bnao wahan data get krke show karao.
      });
    });
    loader.style.display = "none";
  });
});
