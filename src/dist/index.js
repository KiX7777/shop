"use strict";
const cart = document.querySelector('#cart');
const cartProducts = document.querySelector('.cartProducts');
const cartCont = document.querySelector('.cartContainer');
const cartBtn = document.getElementById('checkout');
const addtocartbtn = document.querySelector('.addtocart');
const emptymsg = document.querySelector('.emptymsg');
const minus = document.getElementById('minus');
const closeside = document.querySelector('.closemenu');
const openside = document.querySelector('.hamburger');
const plus = document.getElementById('plus');
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const incart = document.getElementById('incart');
const mainPic = document.querySelector('.mainPic img');
const overlaymainPic = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.closeIcon');
const modalPic = modal.querySelector('.mainPic img');
const side = document.querySelector('.menu');
const galleryImgs = document.querySelectorAll('.gallery img');
const galleryImgsModal = document.querySelectorAll('.gallerymodal img');
const currentQ = document.querySelector('.currentquantity');
const currPrice = document.querySelector('.currPrice');
let quantity = 0;
let total = 0;
let cartobj = [];
cart.addEventListener('click', () => {
    cartCont.classList.toggle('openCart');
});
addtocartbtn.addEventListener('click', () => {
    var _a, _b;
    const card = document.createElement('div');
    card.classList.add('productCard');
    card.dataset.quant = `${currentQ.textContent}`;
    card.innerHTML = `
  <img src="/images/image-product-1-thumbnail.jpg" alt="" />
  <div class="cardTxt">
    <p class="productTitle">NIKE Air Jordan 1</p>
    <div class="cartPrices">
      <p class="productCardPrice">€${(_a = currPrice.textContent) === null || _a === void 0 ? void 0 : _a.slice(1)} x ${currentQ.textContent}</p>
      <p class="productCardTotal">€${Number((_b = currPrice.textContent) === null || _b === void 0 ? void 0 : _b.slice(1)) * Number(currentQ.textContent)}</p>
    </div>
  </div>
  <img src="/images/icon-delete.svg" id="delete" alt="" />
  `;
    if (currentQ.textContent === '0') {
        return;
    }
    else {
        cartProducts.insertAdjacentElement('afterbegin', card);
        emptymsg.style.display = 'none';
        cartBtn.style.display = 'block';
        setTimeout(deleteItem, 500);
        cart.classList.add('shake-top');
        total = total + Number(currentQ.textContent);
        incart.textContent = `${total}`;
        incart.style.display = 'block';
        let obj = {
            quantity: currentQ.textContent,
        };
        cartobj.push(obj);
        console.log(total);
        animQuantity();
        quantity = 0;
        currentQ.textContent = '0';
        setTimeout(() => {
            cart.classList.remove('shake-top');
        }, 501);
    }
});
function deleteItem() {
    const trashBtns = document.querySelectorAll('#delete');
    for (let btn of trashBtns) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            console.log('test');
            const icon = e.target;
            const card = icon.parentElement;
            card.style.animation = 'delete 400ms';
            card.addEventListener('animationend', () => {
                console.log(card);
                card.remove();
                total = Number(total) - Number(card.dataset.quant);
                incart.textContent = `${total}`;
                console.log(cartProducts.children);
                if (cartProducts.children[1].id === 'checkout') {
                    cartBtn.style.display = 'none';
                    emptymsg.style.display = 'block';
                    incart.style.display = 'none';
                }
            }),
                { capture: false };
        });
    }
}
plus.addEventListener('click', () => {
    quantity++;
    animQuantity();
    currentQ.textContent = `${quantity}`;
});
minus.addEventListener('click', () => {
    quantity--;
    animQuantity();
    if (quantity < 0) {
        quantity = 0;
        currentQ.textContent = `${quantity}`;
    }
    else {
        currentQ.textContent = `${quantity}`;
    }
});
galleryImgs.forEach((img) => {
    let slika = img;
    let id = slika.dataset.id;
    img.addEventListener('click', () => {
        console.log(id);
        console.log(modalPic);
        console.log(galleryImgsModal);
        galleryImgs.forEach((image) => image.classList.remove('active'));
        galleryImgsModal.forEach((img) => img.classList.remove('active'));
        galleryImgs[Number(id) - 1].classList.add('active');
        galleryImgsModal[Number(id) - 1].classList.add('active');
        mainPic.classList.add('imageAnim');
        modalPic.classList.add('imageAnim');
        mainPic.setAttribute('src', `images/air_jordan_${id}.webp`);
        modalPic.setAttribute('src', `images/air_jordan_${id}.webp`);
        setTimeout(() => {
            mainPic.classList.remove('imageAnim');
            modalPic.classList.remove('imageAnim');
        }, 500);
    });
});
alert('teest');
galleryImgsModal.forEach((img) => {
    let slika = img;
    let id = slika.dataset.id;
    img.addEventListener('click', () => {
        galleryImgs.forEach((image) => image.classList.remove('active'));
        galleryImgs[Number(id) - 1].classList.add('active');
        galleryImgsModal[Number(id) - 1].classList.add('active');
    });
});
function animQuantity() {
    currentQ.classList.add('slide-in-blurred-left');
    setTimeout(() => {
        currentQ.classList.remove('slide-in-blurred-left');
    }, 301);
}
function openModal() {
    overlay.style.animation = 'overlay 400ms ease';
    overlay.style.display = 'block';
    modal.style.display = 'flex';
    setTimeout(() => {
        overlay.style.animation = '';
    }, 401);
}
mainPic.addEventListener('click', openModal);
let mql = window.matchMedia('(max-width: 500px)');
if (!mql.matches) {
    side.style.display = 'none';
    left.style.display = 'none';
    right.style.display = 'none';
}
if (mql.matches) {
    console.log('test');
    mainPic.removeEventListener('click', openModal);
}
overlay.addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
});
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
});
openside.addEventListener('click', () => {
    side.style.transform = 'translateX(0)';
});
closeside.addEventListener('click', () => {
    side.style.transform = 'translateX(-100%)';
});
//# sourceMappingURL=index.js.map