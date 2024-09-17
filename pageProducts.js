import { doc, getDoc, db } from "./firebase-config.js";
const productContainer = document.querySelector("#container");
console.log(productContainer);
let getId = localStorage.getItem("productId");
const loader = document.querySelector("#loader");
const main = document.querySelector("#main");
const getData = async () => {
  const docRef = doc(db, "productData", getId);
  console.log(docRef);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    loader.style.display = "none";
    productContainer.style.display = "block";
    main.style.display = "block";
    const { title, productImg, price, condition } = docSnap.data();
    console.log(docSnap.data());
    productContainer.innerHTML += `<div class="max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-[400px]" style='margin:auto'>
        <a href="#">
            <img class="rounded-t-lg" src="${productImg}" alt="product"  />
        </a>
        <div class="p-5">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${title}</h5>
            </a>
         
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">price:${price}</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">condition:${condition}</p>
            
            
    </div>`;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};
getData();
