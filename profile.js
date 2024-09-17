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
  where,
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

let isProductsLoaded = false; // To check if products have already been loaded
let displayedProductIds = []; // To track displayed product IDs

// Function to check if the product already exists in Firestore
// Function to show product details and save product ID in local storage
const showProductDetails = (productId) => {
  // Save the product ID to local storage
  localStorage.setItem("selectedProductId", productId);

  // Optionally, navigate to a new page or perform other actions
  console.log(`Product ID ${productId} saved to local storage.`);

  // Redirect to a detailed page (optional)
  // window.location.href = "/product-details.html";
};

// Function to fetch and display products
const getProducts = async () => {
  // Check if products are already loaded
  if (isProductsLoaded) {
    console.log("Products already loaded.");
    return; // Stop if products have already been loaded
  }

  // Show the loader
  document.getElementById("loader").style.display = "block";

  try {
    // Fetch products from Firestore
    const snapshot = await getDocs(collection(db, "productData"));

    // Get the container for products
    const container = document.getElementById("productContainer");
    container.innerHTML = ""; // Clear existing content

    // Store products by category
    let categories = {};

    snapshot.forEach((doc) => {
      let product = doc.data();
      const uid = doc.id; // Store product ID

      let category = product.category;

      // Initialize category if not present
      if (!categories[category]) {
        categories[category] = [];
      }

      // Add product to the category
      categories[category].push({ ...product, uid }); // Include the product ID in the product object
    });

    // Display products for each category
    for (let category in categories) {
      // Create a section for the category
      let section = document.createElement("div");
      section.style.marginBottom = "30px";

      // Create and style the heading
      let heading = document.createElement("h2");
      heading.textContent = category.toUpperCase();
      heading.style.textAlign = "center";
      heading.style.marginBottom = "20px";
      heading.style.marginTop = "100px";
      heading.style.fontFamily = "fantasy";
      heading.style.fontSize = "30px";
      section.appendChild(heading);

      // Create a flex container for products
      let row = document.createElement("div");
      row.style.display = "flex";
      row.style.flexWrap = "wrap";
      row.style.justifyContent = "space-around";

      // Add product cards to the row
      categories[category].forEach((product) => {
        let card = document.createElement("div");
        card.style.width = "30%";
        card.style.marginBottom = "20px";

        card.innerHTML = `
          <img src="${product.productImg}" style="width: 100%; height: 200px; object-fit: cover;" />
          <p><strong>${product.title}</strong></p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Price:${product.price}</p>
                      <button onclick="showProductDetails('${product.uid}')"  type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Click for more details</button>
        `;

        row.appendChild(card);
      });

      // Add the row to the section
      section.appendChild(row);
      // Add the section to the container
      container.appendChild(section);
    }

    // Set flag to prevent further loading
    isProductsLoaded = true;
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    // Hide the loader
    document.getElementById("loader").style.display = "none";
  }
};

// Call the function to display products on page load
getProducts();
window.showProductDetails = (id) => {
  console.log(id);
  localStorage.setItem("productId", id);
  window.location = "./pageProduct.html";
};

// let isProductsLoaded = false; // To check if products have already been loaded
// let displayedProductIds = []; // To track displayed product IDs

// // Function to upload products to Firestore (used only once)
// const uploadProducts = async () => {
//   const products = [
//     {
//       category: "bikes",
//       productImg: "https://static.pakwheels.com/2023/09/ghfgh.jpg",
//       title: "Hayabusa",
//       price: 29.99,
//       uid: "user123",
//       condition: "used",
//     },
//     {
//       category: "bikes",
//       productImg: "https://static.toiimg.com/photo/80452572.cms",
//       title: "Honda 70",
//       price: 199.99,
//       uid: "user456",
//       condition: "new",
//     },
//     {
//       category: "bikes",
//       productImg:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEUbneM8lIyM0sMLyMpdtGZpsrNxoRMNX2tg&s",
//       title: "Electric Scooty",
//       price: 399.99,
//       uid: "user456",
//       condition: "new",
//     },
//     {
//       category: "cars",
//       productImg:
//         "https://static.pakwheels.com/2017/04/suzuki-mehran-vxr-euro-ii-2013-12064890.jpg",
//       title: "Suzuki Mehran",
//       price: 19990,
//       uid: "user456",
//       condition: "used",
//     },
//     {
//       category: "cars",
//       productImg:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPytPtiK-fsSyaD3BikaZdSp6SpId0KvnD5g&s",
//       title: "Honda Civic",
//       price: 59999,
//       uid: "user456",
//       condition: "used",
//     },
//     {
//       category: "cars",
//       productImg:
//         "https://media.ed.edmunds-media.com/audi/rs-7/2024/oem/2024_audi_rs-7_sedan_performance_fq_oem_1_1600.jpg",
//       title: "Audi",
//       price: 6999,
//       uid: "user456",
//       condition: "new",
//     },
//     {
//       category: "shirts",
//       productImg:
//         "https://rog.com.pk/wp/wp-content/uploads/2020/12/Brushed-Cotton-Shirt-Royal-Blue-15323-scaled.jpg",
//       title: "Light blue short",
//       price: 599,
//       uid: "user456",
//       condition: "used",
//     },

//     {
//       category: "shirts",
//       productImg:
//         "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1721661383-mhl-tshirts-lululemon-349-669e77c1baca7.jpg?crop=1xw:0.9995835068721366xh;center,top&resize=980:*",
//       title: "off white t-shirt",
//       price: 59999,
//       uid: "user456",
//       condition: "used",
//     },
//     {
//       category: "shirts",
//       productImg:
//         "https://assets.ajio.com/medias/sys_master/root/20230901/dYRe/64f2022eafa4cf41f59d8dcd/-473Wx593H-442200005-olive-MODEL3.jpg",
//       title: "Brown t-shirt",
//       price: 699,
//       uid: "user456",
//       condition: "new",
//     },
//     {
//       category: "jeans",
//       productImg:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdPknH1ySuDGP-ROopSsHKz6Qp6Jn3gbDocw&s",
//       title: "Black baggy jean",
//       price: 499,
//       uid: "user456",
//       condition: "new",
//     },

//     {
//       category: "jeans",
//       productImg:
//         "https://m.media-amazon.com/images/I/71uGyOMZOaL._AC_UF1000,1000_QL80_.jpg",
//       title: "Light blue jean",
//       price: 599,
//       uid: "user456",
//       condition: "used",
//     },
//     {
//       category: "jeans",
//       productImg:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTh0s4ZQCWk8nvnJUPVH8NOVFJYj66uhmP0kGiXdIXL-MY2VXohi256iDPs-R5W9ES7Ek&usqp=CAU",
//       title: "white jean",
//       price: 799,
//       uid: "user456",
//       condition: "new",
//     },
//     {
//       category: "watches",
//       productImg:
//         "https://currenwatches.com.pk/cdn/shop/files/S16a1d22aca9244a19944aad7e16f364fh_1445x.jpg?v=1708428048",
//       title: "Blue wrist watch",
//       price: 4999,
//       uid: "user456",
//       condition: "new",
//     },

//     {
//       category: "watches",
//       productImg:
//         "https://watchcentre.pk/wp-content/uploads/2022/04/curren-8356-black-stainless-steel-mens-watch.jpg",
//       title: "Black wrist watch",
//       price: 5999,
//       uid: "user456",
//       condition: "used",
//     },
//     {
//       category: "watches",
//       productImg:
//         "https://watchcentre.pk/wp-content/uploads/2022/04/curren-8356-silver-analog-dial-mens-wrist-watch-247x296.jpg",
//       title: "white wrist watch",
//       price: 7999,
//       uid: "user456",
//       condition: "new",
//     },
//   ];

//   for (const product of products) {
//     try {
//       await addDoc(collection(db, "productData"), product);
//       console.log(`Product added: ${product.title}`);
//     } catch (error) {
//       console.error(`Error adding product: ${product.title}`, error);
//     }
//   }
// };

// // Function to save product ID to local storage
// const saveProductIdToLocalStorage = (productId) => {
//   localStorage.setItem("selectedProductId", productId);
//   console.log(`Product ID ${productId} saved to local storage.`);
// };

// // Fetch and display products (only once)
// const getAllProducts = async () => {
//   if (isProductsLoaded) {
//     console.log("Products already loaded.");
//     return; // Stop if products have already been loaded
//   }

//   // Show the loader
//   document.getElementById("loader").style.display = "block";

//   try {
//     // Fetch products from Firestore
//     const productsSnapshot = await getDocs(collection(db, "productData"));

//     // Container to display the products
//     const productContainer = document.getElementById("productContainer");
//     productContainer.innerHTML = ""; // Clear previous content

//     let productsByCategory = {}; // Store products categorized

//     productsSnapshot.forEach((doc) => {
//       let product = doc.data();
//       let productId = doc.id;

//       if (displayedProductIds.includes(productId)) return; // Skip already displayed products

//       let category = product.category;

//       // Group products by category
//       if (!productsByCategory[category]) {
//         productsByCategory[category] = [];
//       }

//       productsByCategory[category].push({ ...product, productId }); // Add product with ID
//       displayedProductIds.push(productId); // Mark product as displayed
//     });

//     // Display products by category
//     for (let category in productsByCategory) {
//       // Add category heading
//       let heading = document.createElement("h2");
//       heading.textContent = category.toUpperCase();
//       productContainer.appendChild(heading);

//       // Display products line by line
//       productsByCategory[category].forEach((product) => {
//         let productCard = document.createElement("div");
//         productCard.innerHTML = `
//           <p><strong>${product.title}</strong></p>
//           <img src="${product.productImg}" style="width: 200px; height: 150px; object-fit: cover;" />
//           <p>Price: ${product.price}</p>
//           <p>Condition: ${product.condition}</p>
//           <button onclick="saveProductIdToLocalStorage('${product.productId}')">Save Product ID</button>
//           <hr>
//         `;
//         productContainer.appendChild(productCard);
//       });
//     }

//     isProductsLoaded = true; // Prevent further fetching
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   } finally {
//     // Hide the loader
//     document.getElementById("loader").style.display = "none";
//   }
// };

// // Call the function to upload products only once (if required)
// uploadProducts();

// // Call the function to display products on page load
// getAllProducts();
