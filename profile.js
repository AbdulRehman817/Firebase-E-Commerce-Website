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

// Flag to prevent reloading products
let productsLoaded = false;

// Function to fetch and display products
const getProducts = async () => {
  // Check if products are already loaded
  if (productsLoaded) {
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
      let category = product.category;

      // Initialize category if not present
      if (!categories[category]) {
        categories[category] = [];
      }

      // Add product to the category
      categories[category].push(product);
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
      heading.style.marginBottom = "15px";
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
          <p>Price: ${product.price}</p>
          <p>Condition: ${product.condition}</p>
        `;

        row.appendChild(card);
      });

      // Add the row to the section
      section.appendChild(row);
      // Add the section to the container
      container.appendChild(section);
    }

    // Set flag to prevent further loading
    productsLoaded = true;
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
  localStorage.setItem("productId", id);
  window.location = "./pageProduct.html";
};
