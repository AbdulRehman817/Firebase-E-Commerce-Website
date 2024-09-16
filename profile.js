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
const checkIfProductExists = async (title) => {
  const querySnapshot = await getDocs(collection(db, "productData"));
  let exists = false;

  querySnapshot.forEach((doc) => {
    let product = doc.data();
    if (product.title === title) {
      exists = true; // Product already exists
    }
  });

  return exists;
};

// Function to upload products only once to Firestore
const uploadProducts = async () => {
  const products = [
    {
      category: "bikes",
      productImg: "https://static.pakwheels.com/2023/09/ghfgh.jpg",
      title: "Hayabusa",
      price: 29.99,
      uid: "user123",
      condition: "used",
    },
    {
      category: "bikes",
      productImg: "https://static.toiimg.com/photo/80452572.cms",
      title: "Honda 70",
      price: 199.99,
      uid: "user456",
      condition: "new",
    },
    {
      category: "bikes",
      productImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEUbneM8lIyM0sMLyMpdtGZpsrNxoRMNX2tg&s",
      title: "Electric Scooty",
      price: 399.99,
      uid: "user456",
      condition: "new",
    },
    {
      category: "cars",
      productImg:
        "https://static.pakwheels.com/2017/04/suzuki-mehran-vxr-euro-ii-2013-12064890.jpg",
      title: "Suzuki Mehran",
      price: 19990,
      uid: "user456",
      condition: "used",
    },
    {
      category: "cars",
      productImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPytPtiK-fsSyaD3BikaZdSp6SpId0KvnD5g&s",
      title: "Honda Civic",
      price: 59999,
      uid: "user456",
      condition: "used",
    },
    {
      category: "cars",
      productImg:
        "https://media.ed.edmunds-media.com/audi/rs-7/2024/oem/2024_audi_rs-7_sedan_performance_fq_oem_1_1600.jpg",
      title: "Audi",
      price: 6999,
      uid: "user456",
      condition: "new",
    },
  ];

  for (const product of products) {
    try {
      const exists = await checkIfProductExists(product.title);
      if (!exists) {
        // If product doesn't exist, add it to Firestore
        await addDoc(collection(db, "productData"), {
          category: product.category,
          productImg: product.productImg,
          title: product.title,
          price: product.price,
          uid: product.uid,
          condition: product.condition,
        });
        console.log(`Product added: ${product.title}`);
      } else {
        console.log(`Product already exists: ${product.title}`);
      }
    } catch (error) {
      console.error(`Error adding product ${product.title}:`, error);
    }
  }
};

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

//     // Get the container where products will be displayed
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

//       productsByCategory[category].push(product);
//       displayedProductIds.push(productId); // Mark product as displayed
//     });

//     // Display products by category
//     for (let category in productsByCategory) {
//       // Create a container for each category
//       let categorySection = document.createElement("div");
//       categorySection.style.marginBottom = "30px"; // Add space between categories

//       // Add category heading
//       let heading = document.createElement("h2");
//       heading.textContent = category.toUpperCase();
//       heading.style.textAlign = "center"; // Center the heading
//       heading.style.marginBottom = "15px"; // Add space between the heading and products

//       // Add the heading to the category section
//       categorySection.appendChild(heading);

//       // Create a flex container for the products
//       let productsRow = document.createElement("div");
//       productsRow.style.display = "flex"; // Flexbox layout
//       productsRow.style.flexWrap = "wrap"; // Allow products to wrap if there are too many
//       productsRow.style.justifyContent = "space-around"; // Spread products evenly across the row

//       // Display products line by line in flex rows
//       productsByCategory[category].forEach((product) => {
//         let productCard = document.createElement("div");
//         productCard.style.width = "30%"; // Each product card takes 30% of the row
//         productCard.style.marginBottom = "20px"; // Space between products

//         productCard.innerHTML = `
//           <img src="${product.productImg}" style="width: 100%; height: 200px; object-fit: cover;" />
//           <p><strong>${product.title}</strong></p>
//           <p>Price: ${product.price}</p>
//           <p>Condition: ${product.condition}</p>
//         `;

//         // Add the product card to the flex row
//         productsRow.appendChild(productCard);
//       });

//       // Add the products row to the category section
//       categorySection.appendChild(productsRow);

//       // Append the entire category section to the product container
//       productContainer.appendChild(categorySection);
//     }

//     isProductsLoaded = true; // Prevent further fetching
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   } finally {
//     // Hide the loader
//     document.getElementById("loader").style.display = "none";
//   }
// };

// // Call the function to display products on page load
// getAllProducts();

// Example call to fetch products from a specific category

// // Example call to fetch products from a specific category

// Flag to prevent reloading products

// Function to fetch and display products
const getAllProducts = async () => {
  if (isProductsLoaded) {
    console.log("Products already loaded.");
    return; // Stop if products are already loaded
  }

  // Show the loader
  document.getElementById("loader").style.display = "block";

  try {
    // Fetch products from Firestore
    const productsSnapshot = await getDocs(collection(db, "productData"));

    // Get the container where products will be displayed
    const productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = ""; // Clear any existing content

    // Object to store products by category
    let productsByCategory = {};

    // Process each product
    productsSnapshot.forEach((doc) => {
      let product = doc.data();
      let category = product.category;

      // Initialize category if not already present
      if (!productsByCategory[category]) {
        productsByCategory[category] = [];
      }

      // Add product to the category
      productsByCategory[category].push(product);
    });

    // Display products for each category
    for (let category in productsByCategory) {
      // Create a section for the category
      let categorySection = document.createElement("div");
      categorySection.style.marginBottom = "30px"; // Space between categories

      // Create and style the category heading
      let heading = document.createElement("h2");
      heading.textContent = category.toUpperCase();
      heading.style.textAlign = "center";
      heading.style.marginBottom = "15px";
      categorySection.appendChild(heading);

      // Create a flex container for the products
      let productsRow = document.createElement("div");
      productsRow.style.display = "flex";
      productsRow.style.flexWrap = "wrap";
      productsRow.style.justifyContent = "space-around";

      // Add product cards to the row
      productsByCategory[category].forEach((product) => {
        let productCard = document.createElement("div");
        productCard.style.width = "30%";
        productCard.style.marginBottom = "20px";

        productCard.innerHTML = `
          <img src="${product.productImg}" style="width: 100%; height: 200px; object-fit: cover;" />
          <p><strong>${product.title}</strong></p>
          <p>Price: ${product.price}</p>
          <p>Condition: ${product.condition}</p>
        `;
        productsRow.appendChild(productCard);
      });

      // Add the products row to the category section
      categorySection.appendChild(productsRow);
      // Add the category section to the main container
      productContainer.appendChild(categorySection);
    }

    // Set flag to prevent further fetching
    isProductsLoaded = true;
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    // Hide the loader
    document.getElementById("loader").style.display = "none";
  }
};

// Call the function to display products on page load
getAllProducts();

window.showProductDetails = (id) => {
  localStorage.setItem("productId", id);
  window.location = "./pageProduct.html";
};
