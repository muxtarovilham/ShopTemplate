const customers = document.getElementById("customers");
const cartButton = document.getElementById('myCard');
const likeButton = document.getElementById('myWishes')


axios.get('https://dummyjson.com/products')
  .then(res => {
    db = res.data.products;
    console.log(db);

    for (let i = 0; i < Math.min(10, db.length); i++) {
      let item = db[i];
      let card = document.createElement('div');
      card.className = "cardBox";
      card.innerHTML = `
          <img src="${item.thumbnail}" alt="">
          <div class="cardTextBox">
            <p>${item.price} $ </p>
            <button class="cardButton" onclick="addToCart(${item.id})"><img id="imgShop" src="./assets/img/VectorShop.png" alt=""> Move to cart</button>
          </div>
          <img onclick="addToWishes(${item.id})" id="imgLike" style="cursor: pointer;" src="./assets/img/VectorLike.png" alt="">`;
      customers.appendChild(card);
    }
    displayLikeCount();
    displayCartCount();
  });


  function addToWishes(productIndex) {
    let like = JSON.parse(localStorage.getItem('like')) || [];
    like.push(db.find(item => item.id === productIndex));
    localStorage.setItem('like', JSON.stringify(like));
    displayLikeCount()

}


function displayLikeCount() {
  let like = JSON.parse(localStorage.getItem('like')) || [];
  console.log('Like Count:', like.length);
  likeButton.innerHTML = `<i class="i1 fa-solid fa-cart-shopping" style="font-size: 20px;"></i><p id="likeCount">${like.length}</p>`;
}


  
  function addToCart(productIndex) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(db.find(item => item.id === productIndex));
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartCount()

}


function displayCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  console.log('Cart Count:', cart.length);
  cartButton.innerHTML = `<i class="i1 fa-solid fa-cart-shopping" style="font-size: 20px;"></i><p id="cartCount">${cart.length}</p>`;
}

window.onload = () => {
  displayCartCount();
  displayLikeCount();
};






// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------






const inp = document.getElementById('inp')
const btn = document.getElementById('btn')
const url = 'https://dummyjson.com/products/category/';
const productsContainer = document.getElementById('products');

btn.addEventListener('click', (e) => {
  window.location.href = "./search.html";
    e.preventDefault();
    searchUser();
   
    
});

function searchUser() {
    fetch(url + inp.value)
    .then(res => res.json())
    .then(data => {
        renderUser(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function renderUser(data) {
    productsContainer.innerHTML = '';
    data.products.forEach(product => {
        const img = document.createElement('img');
        img.className = 'img1';
        const p2 = document.createElement('p');
        const p3 = document.createElement('p');
        const p4 = document.createElement('p');
        p2.className = 'p2';
        p3.className = 'p3';
        p4.className = 'p4';
        p2.textContent = product.title;
        p3.textContent = product.description;
        p4.textContent = 'Price: $' + product.price.toFixed(2);
        img.src = product.thumbnail;

        productsContainer.appendChild(img);
        productsContainer.appendChild(p2);
        productsContainer.appendChild(p3);
        productsContainer.appendChild(p4);
    });
}




