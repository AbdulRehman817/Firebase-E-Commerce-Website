import {
  auth,
  signOut,
  onAuthStateChanged,
  db,
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  limit,
  doc,
  getDocs,
  storage,
  ref,
  setDoc,
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
let main = document.querySelector(".main");
const navbar = document.querySelector("#main");
let userUid;
let username;
let userPic;
// let getIma
let userData;
onAuthStateChanged(auth, (user) => {
  userData = user;

  if (user) {
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

const uploadProducts = async () => {
  const products = [
    {
      category: "bikes",
      productImg:
        "data:image/jpeg;base64,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",
      title: "hayabusa",
      price: 29.99,
      uid: "user123",
      condition: "used",
    },
    {
      productImg: "https://static.toiimg.com/photo/80452572.cms",
      title: "Honda Civic",
      price: 199.99,
      uid: "user456",
      condition: "new",
    },
    // Add more products as needed
  ];

  for (const product of products) {
    try {
      const docRef = await addDoc(collection(db, "productData"), {
        category: product.category,
        productImg: product.productImg,
        title: product.title,
        price: product.price,
        uid: product.uid,
        condition: product.condition,
      });
      console.log(`Product added: ${product.title}`);
    } catch (error) {
      console.error(`Error adding product ${product.title}:`, error);
    }
  }
};

// Call the function to upload products
uploadProducts();
document.body.style.overflowY = "auto";
loader.classList.add("none");
const shownProducts = []; // Array to keep track of displayed product IDs

const getProductsByCategory = async (category) => {
  try {
    loader.classList.remove("none");
    document.body.style.overflowY = "hidden";

    // Reference to the products collection in the specified category
    const querySnapshot = await getDocs(collection(db, "productData"));

    // Container to display products
    const productContainer = document.querySelector("#productContainer");
    productContainer.innerHTML = ""; // Clear existing content

    // Iterate through each document in the category
    querySnapshot.forEach((doc) => {
      const { productImg, title, price, condition } = doc.data();

      // Check if the product has already been displayed
      if (!shownProducts.includes(doc.id)) {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
        <h1 class='text-center text-black'>${category}</h1>
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-[400px]">
            <a href="#">
                <img class="rounded-t-lg" src="${productImg}" alt="product" />
            </a>
            <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${title}</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${price}</p>
                <button onclick="showProductDetails('${doc.id}')" 
                type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Click for more details</button>
            </div>
    </div>`;

        // Append the product card to the container
        productContainer.appendChild(productCard);

        // Add the product ID to the shownProducts list
        shownProducts.push(doc.id);
      }
    });

    document.body.style.overflowY = "auto";
    loader.classList.add("none");
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
  }
};

// Example call to fetch products from a specific category

// Example call to fetch products from a specific category
const category = "Electronics"; // Replace with the category you want to fetch
getProductsByCategory(category);

window.showProductDetails = (id) => {
  localStorage.setItem("productId", id);
  window.location = "./pageProduct.html";
};
