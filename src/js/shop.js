import { auth, db } from "./functions/app";
import { onAuthStateChanged } from "./functions/auth";
import { getProducts } from "./functions/products";
import { createFirebaseCart, getFirebaseCart  } from "./functions/cart";
import { addProductToCart, getMyLocalCart, currencyFormat } from "../utils";

const productSection = document.getElementById("products");
const categoryFilter = document.getElementById("category");
const orderFilter = document.getElementById("order");

let userLogged = undefined;
let products = [];
let cart = [];

async function loadProducts() {
    const firebaseProducts = await getProducts(db);
   
    productSection.innerHTML = "";
    firebaseProducts.forEach(product => {
        renderProduct(product);
    });

    products = firebaseProducts;
   // console.log(products);
}



function renderProduct(item) {
    const product = document.createElement("a");
    product.className = "product";

    product.setAttribute("href", `./product.html?id=${item.id}`);

    const coverImage = item.images ? item.images[0] : "https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-512.png";

    const isProductAddedToCart = cart.some((productCart) => productCart.id === item.id);

    const productButtonCart = isProductAddedToCart ?
    '<button class="product__cart" disabled>Producto añadido</button>' :
    '<button class="product__cart">Añadir al carrito</button>';

    product.innerHTML = `
    <div class="product" id="obj0">
        <h3 class="product__name">${item.name}</h3>
        <img class="product__image" src="${coverImage}">
        <div class="product__flex flex">
        <p class="product__price">Precio:${currencyFormat(item.price)}</p>
        ${productButtonCart}
        </div>
    </div>
    `;

    productSection.appendChild(product);
    console.log(productSection);

    const productCartButton = product.querySelector(".product__cart");

    productCartButton.addEventListener("click", async (e) => {
        e.preventDefault(); // evitar que al dar click en el boton, funcione el enlace del padre.

        cart.push(item);
        addProductToCart(cart);

        if (userLogged) {
            await createFirebaseCart(db, userLogged.uid, cart);
        }

        productCartButton.setAttribute("disabled", true);
        productCartButton.innerText = "Producto añadido";

    });
}
 function filterBy(){
    const newCategory = categoryFilter.value;
    const newOrder = orderFilter.value;

    let filteredProducts = [];

    if (newCategory !== "") {
        filteredProducts = products.filter((product) => product.category === newCategory);
    } else {
        filteredProducts = products;
    }

    if (newOrder === "asc") {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }

    if (newOrder === "desc") {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    }
    
    productSection.innerHTML = "";
    filteredProducts.forEach(product => {
        renderProduct(product);
    });

}

categoryFilter.addEventListener("change", e => {
    filterBy();
});

orderFilter.addEventListener("change", e => {
    filterBy();
}); 


onAuthStateChanged(auth, async (user) => {
    if (user) {
      
      userLogged = user;
      cart = await getFirebaseCart(db, userLogged.uid);
      // ...
    } else {
        cart = getMyLocalCart();
      // User is signed out
      // ...
    }

    loadProducts();

  });