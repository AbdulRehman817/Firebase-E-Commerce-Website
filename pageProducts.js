import {
  addDoc,
  doc,
  db,
  onAuthStateChanged,
  getDocs,
  getDownloadURL,
} from "./firebase-config.js";
const title = document.parentElement("h5");
const img = document.querySelector(".img");
const price = document.querySelector("p");
const btn = document.querySelector(".btn");
console.log(btn);
console.log(title);
console.log(btn);
console.log(price);
console.log(img);
const pageProducts = {
  title,
  img,
  price,
};
// btn.addEventListener("click", async () => {
//   const docRef = await addDoc(
//     (collection(db, "pageProducts"), pageProducts),
//     {}
//   );
//   console.log("Document written with ID: ", docRef.id);
// });
