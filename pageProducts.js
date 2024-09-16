import { doc, getDoc, db } from "./firebase-config.js";
const productContainer = document.querySelector("#productContainer");
let getId = localStorage.getItem("productId");

const getData = async () => {
  const docRef = doc(db, "productData", getId);
  console.log(docRef);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const { title, productImg, price, condition } = docSnap.data();
    console.log(docSnap.data());
    productContainer.innerHTML += `<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-[400px]">
        <a href="#">
            <img class="rounded-t-lg" src="${productImg}" alt="product" />
        </a>
        <div class="p-5">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${title}</h5>
            </a>
         
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${price}</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">condition:${condition}</p>
           <button onclick="showProductDetails('${doc.id}')" 
           type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Click for more details</button>
            
    </div>`;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};
getData();
