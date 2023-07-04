// Product data
const products = [
  { id: "1", name: "Product 1", price: 10, image: "./img/1.jpg" },
  { id: "2", name: "Product 2", price: 20, image: "./img/2.jpg" },
  { id: "3", name: "Product 3", price: 15, image: "./img/4.jpg" },
];

// Cart
let cart = [];
let cartList = [];

function renderProducts() {
  const productList = document.getElementById("product-list");
  products.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("col-md-4");
    productItem.innerHTML = `
            <div class="card mb-3">
                <img src="${product.image}" class="card-img-top" alt="Product Image">
                <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">$${product.price}</p>
                <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
            `;
    productList.appendChild(productItem);
  });

  const addToCartButtons = document.getElementsByClassName("add-to-cart-btn");
  //console.log(addToCartButtons);
  for (let i = 0; i < addToCartButtons.length; i++) {
    //addToCartButtons[i].addEventListener('click',addToCart);
    addToCartButtons[i].addEventListener("click", addToCartonButtonClick);
  }
}
//

function addToCartonButtonClick(event) {
  const productId = parseInt(event.target.dataset.id);
  console.log(productId);

  const product = products.find((x) => x.id == productId);
  console.log(product);

  if (product) {
    const existingProd = cartList.find((x) => x.id == product.id);
    console.log(existingProd);

    if (existingProd) {
    } else {
      cartList.push(product);
      UpdateCartStatus();
      console.log(cartList);
    }
  }
}

// Function to add a product to the cart
function addToCart(event) {
  const productId = parseInt(event.target.dataset.id);
  const product = products.find((p) => p.id === productId);

  if (product) {
    cart.push(product);
    updateCartUI();
  }
}

//Function to update the cart UI
function updateCartUI() {
  const cartItemsList = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");

  // Clear previous cart items
  cartItemsList.innerHTML = "";

  // Render cart items
  cart.forEach((item) => {
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `${item.name} - $${item.price}`;
    cartItemsList.appendChild(cartItem);
  });

  // Calculate total price
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalPrice.textContent = `Total: $${total.toFixed(2)}`;
}

//New cart data loading
function UpdateCartStatus() {
  const updateCart = document.getElementById("cart-list");
  //const totalPrice = document.getElementById('total-price');


  updateCart.innerHTML = "";
  cartList.forEach((item) => {
    console.log(item);
    const cartItem = document.createElement("div");
    cartItem.innerHTML = `
    <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
    <div class="mr-1"><img class="rounded" src="${item.image}" width="70"></div>
            <div class="d-flex flex-column align-items-center product-details ml-5"><span class="font-weight-bold">${
              item.name
            }</span>
                <div class="d-flex flex-row product-desc">
                    <div class="size mr-1"><span class="text-grey">Size:</span><span class="font-weight-bold">&nbsp;M</span></div>
                    <div class="color"><span class="text-grey">Color:</span><span class="font-weight-bold">&nbsp;Grey</span></div>
                </div>
            </div>
            <div class="d-flex flex-row align-items-center qty ml-5 mr-3"><i class="fa fa-minus text-danger decrese-item-btn" onclick="decreaseCount(${
              item.id
            })"></i>
                <h5 class="text-grey mt-1 mr-2 ml-2" id="txtQty-${
                  item.id
                }">${1}</h5><i class="fa fa-plus text-success increase-item-btn" onclick="increaseCount(${
      item.id
    })"></i></div>
            <div>
                <h5 class="text-grey mr-3 ml-3">${item.price}</h5>
            </div>
            <div class="d-flex align-items-center"><i class="fa fa-trash mb-1 text-danger product-remove-btn" onclick="removeItem()"></i></div>
            </div>
    `;

    updateCart.appendChild(cartItem);
    //console.log(updateCart);

    const prodRemoveBtn = document.getElementsByClassName("product-remove-btn");
    //console.log(prodRemoveBtn);
    for (let i = 0; i < prodRemoveBtn.length; i++) {
      prodRemoveBtn[i].addEventListener("click", removeItem);
    }

  });


  
  // Calculate total price
  // const total = cartList.reduce((sum, item) => sum + item.price, 0);
  // totalPrice.textContent = `Total: $${total.toFixed(2)}`;
    // const total = cartList.reduce((sum, item) => sum + item.price, 0);
  // totalPrice.textContent = `Total: $${total.toFixed(2)}`;
  updateTotalPrice();
}

function updateTotalPrice() {

  const totalPrice = document.getElementById('total-price');
    // Calculate total price
    const total = cartList.reduce((sum, item) => sum + item.price, 0);
    totalPrice.textContent = `Total: $${total.toFixed(2)}`;
}

function removeItem(event) {
  const prodId = parseInt(event.target.dataset.id);

  cartList.pop((x) => x.productId == prodId);
  UpdateCartStatus();
  console.log(prodId);

  
}

function increaseCount(id) {
  // alert('Hi Increase')
  // const prodCount= document.getElementById('txtQty').innerText;
  // console.log("id", id.toString());
  // document.getElementById('txtQty').innerText=parseInt(prodCount) +1;

  const prodCount = document.getElementById(
    `txtQty-${id.toString()}`
  ).innerText;
  // console.log(prodCount);
  document.getElementById(`txtQty-${id.toString()}`).innerText =
    parseInt(prodCount) + 1;

    updateTotalPrice();   
}

function decreaseCount(id) {
  //alert('Hi Increase')
  const prodCount = document.getElementById(
    `txtQty-${id.toString()}`
  ).innerText;
  //console.log(prodCount);
  if (parseInt(prodCount) > 1) {
    document.getElementById(`txtQty-${id.toString()}`).innerText =
      parseInt(prodCount) - 1;
  }

  
}

function checkout() {
  // Implement the checkout logic here
  alert('Checkout completed!');
  cartList = [];
  UpdateCartStatus();
}

function initialize() {
  renderProducts();
  //alert('hello Product List')

  const checkoutButton = document.getElementById('checkout-btn');
  checkoutButton.addEventListener('click', checkout);
}

initialize();
