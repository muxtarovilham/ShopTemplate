const inp = document.getElementById('inp');
const btn = document.getElementById('btn');
const url = 'https://dummyjson.com/products/category/';
const productsContainer = document.getElementById('products');

btn.addEventListener('click', (e) => {
    e.preventDefault();
    searchUser();
});


let resultCount = 0;


function searchUser() {

    resultCount = 0;
    
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

    resultCount += data.products.length;

    displayResultCount(resultCount);


    db = data.products;
    console.log(db);

    data.products.forEach(product => {
        const productHTML = `
        <div class="allProducts">

        <img class="img11" src="${product.thumbnail}">
        <div class="div1">
            <p style="font-weight: 700;" class="p2">${product.title}</p>
            <p style="font-weight: 700;" class="p4">$ ${product.price.toFixed(2)}</p>
            <div style="display:flex; gap:7px;"> 
            <i class="fa-solid fa-star" style="color: #ffbb00;"></i>
            <i class="fa-solid fa-star" style="color: #ffbb00;"></i>
            <i class="fa-solid fa-star" style="color: #ffbb00;"></i>
            <i class="fa-solid fa-star" style="color: #ffbb00;"></i>
            <i class="fa-solid fa-star-half" style="color: #ffbb00;"></i>
            <p class="p3">${product.rating}</p>
            <div style="display:flex; gap: 7px; padding-left: 14px;">
            <p style="padding-right: 14px;">·</p>
            <p class="p3">${product.stock}</p>
            <p class="p3">stock</p>
            </div>
            <div style="display:flex; padding-left: 21px; gap: 14px; color: #00B517">
            <p style="color: black;">·</p>
            <p>Free shipping</p>
            </div>
            </div>
            <p style="color: gray; font-weight: 500;" class="p3">${product.description}</p>
            <p style="color: #0D6EFD" class="p3">View Details</p>
            </div>
            <img onclick="addToWishes(${product.id})" id="imgLike" style="cursor: pointer;" src="./assets/img/VectorLike.png" alt="">

            </div>
        `;

        productsContainer.innerHTML += productHTML;
        displayLikeCount();
    displayCartCount();
    });
}

function displayResultCount(count) {
    const resultCountElement = document.getElementById('resultCount');
    if (resultCountElement) {
        resultCountElement.textContent = `${count} items in ${inp.value}`;
    }
    console.log(count);
    resultCount = 0;

}


// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




const cartButton = document.getElementById('myCard');
const likeButton = document.getElementById('myWishes')



  function addToWishes(productIndex) {
    let like = JSON.parse(localStorage.getItem('like')) || [];
    like.push(db.find(item => item.id === productIndex));
    localStorage.setItem('like', JSON.stringify(like));
    displayLikeCount();

}


function displayLikeCount() {
  let like = JSON.parse(localStorage.getItem('like')) || [];
  console.log('Like Count:', like.length);
  likeButton.innerHTML = `<p id="likeCount">${like.length}</p>`;
}




function displayCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  console.log('Cart Count:', cart.length);
  cartButton.innerHTML = `<p id="cartCount">${cart.length}</p>`;
}

window.onload = () => {
  displayCartCount();
  displayLikeCount();
};

