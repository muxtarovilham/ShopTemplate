const customers = document.getElementById("customers");
let productCountMap = {};

function getCart() {
    let like = JSON.parse(localStorage.getItem("like")) || [];
    customers.innerHTML = '';

    updateProductCount();

    let shownProductIds = [];
    like.forEach((item, index) => {
        if (shownProductIds.includes(item.id)) {
            return;
        }

        let card = document.createElement("div");
        card.className = "cardBox";
        card.innerHTML = `
            <div class="image1">
                <img src="${item.thumbnail}" alt="">
            </div>
            <div class="wordsBox">
                <div class="cardTextBox">
                    <h2>${item.title}</h2>
                    <p>${item.description}</p>
                    <button onclick="removeOne(${item.id})">Remove</button>
                </div>
                <div class="priceAndCount"
                <p>${calculateTotalPrice(item.id, item.price)} $</p>
                <p class="quantity">Quantity: ${productCountMap[item.id] || 0} <img src="./assets/img/expand_more.png" alt=""></p>
                </div>
            </div>
        `;
        customers.appendChild(card);

        shownProductIds.push(item.id);
    });

    if (like.length > 0) {
        const removeAllButton = document.getElementById("removeAll");
        removeAllButton.onclick = removeAll;
    }
    displayTotalCartPrice();
    displayCartCount();
}
function displayTotalCartPrice() {
    const totalCartPriceElement = document.getElementById("totalCartPrice");
    if (totalCartPriceElement) {
        totalCartPriceElement.textContent = calculateTotalCartPrice() + " $";
    }
}

function calculateTotalCartPrice() {
    let like = JSON.parse(localStorage.getItem('like')) || [];
    let totalCartPrice = 0;

    like.forEach(item => {
        totalCartPrice += calculateTotalPrice(item.id, item.price);
        
    });
    
    
    return totalCartPrice;
}


function removeOne(productId) {
    let like = JSON.parse(localStorage.getItem('like')) || [];
    let indexToRemove = like.findIndex(item => item.id === productId);

    if (indexToRemove !== -1) {
        like.splice(indexToRemove, 1);
        localStorage.setItem('like', JSON.stringify(like));
    }

    updateProductCount();
    getCart();
}

function removeAll() {
    localStorage.removeItem('like');
    location.reload();

    updateProductCount();
    getCart();
}

function updateProductCount() {
    let like = JSON.parse(localStorage.getItem('like')) || {};

    productCountMap = {};
    like.forEach(item => {
        if (!productCountMap[item.id]) {
            productCountMap[item.id] = 1;
        } else {
            productCountMap[item.id]++;
        }
    });
}

function calculateTotalPrice(productId, unitPrice) {
    return (productCountMap[productId] || 0) * unitPrice;
}







// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------





const extraProducts = document.getElementById("extraProducts");
const cartButton = document.getElementById('myCard');
const cartCountElement = document.querySelector(".myAllCardCounter")
const cartButton1 = document.getElementById('myWishes');



axios.get('https://dummyjson.com/products')
  .then(res => {
    db = res.data.products;
    console.log(db);

    for (let i = 0; i < Math.min(4, db.length); i++) {
      let item = db[i];
      let cardExtra = document.createElement('div');
      cardExtra.className = "cardExtra";
      cardExtra.innerHTML = `
          <img id="cardExtaImg" src="${item.thumbnail}" alt="">
          <div class="cardExtraTextBox">
            <p> $ ${item.price}</p>
            <p id="p1">${item.title}</p>
            <button id="cardExtraButton" onclick="addToCart(${item.id})"><img id="imgShop" src="./assets/img/VectorShop.png" alt=""> Move to card</button>
          </div>`;
          extraProducts.appendChild(cardExtra);
          
    }
    displayCartCount();
    
  });



  
  function addToCart(productIndex) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(db.find(item => item.id === productIndex));
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartCount()

}


function displayCartCount() {
  let extraCart = JSON.parse(localStorage.getItem('like')) || [];
  console.log('Cart Count:', extraCart.length);
  if (cartCountElement) {
    cartCountElement.textContent = extraCart.length;
  }
  cartButton.innerHTML = `<p id="cartCount">${extraCart.length}</p>`;
}




function displayLikeCount() {
    let like = JSON.parse(localStorage.getItem('like')) || [];
    console.log('Like Count:', like.length);
    likeButton.innerHTML = `<p id="likeCount">${like.length}</p>`;
  }



window.onload = () => {
  displayCartCount();
  updateProductCount();
    getCart();
};


window.addEventListener('storage', (event) => {
    if (event.key === 'cart') {
        updateProductCount();
        getCart();
    }
});