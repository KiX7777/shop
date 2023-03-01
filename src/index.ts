const cart = document.querySelector('#cart') as HTMLImageElement;
// const productCard = document.querySelector('.productCard') as HTMLImageElement;
const cartProducts = document.querySelector('.cartProducts') as HTMLDivElement;
const cartCont = <HTMLDivElement>document.querySelector('.cartContainer');
const cartBtn = document.getElementById('checkout') as HTMLButtonElement;
const addtocartbtn = document.querySelector('.addtocart') as HTMLButtonElement;
const emptymsg = document.querySelector('.emptymsg') as HTMLParagraphElement;
const minus = document.getElementById('minus') as HTMLButtonElement;
const closeside = document.querySelector('.closemenu') as HTMLImageElement;
const openside = document.querySelector('.hamburger') as HTMLImageElement;
const plus = document.getElementById('plus') as HTMLButtonElement;
const left = document.querySelector('.left') as HTMLSpanElement;
const right = document.querySelector('.right') as HTMLSpanElement;
const incart = document.getElementById('incart') as HTMLSpanElement;
const mainPic = document.querySelector('#mainpic') as HTMLImageElement;
const overlaymainPic = document.querySelector('.modal') as HTMLImageElement;
const overlay = document.querySelector('.overlay') as HTMLDivElement;
const modal = document.querySelector('.modal') as HTMLDivElement;
const closeModal = document.querySelector('.closeIcon') as HTMLImageElement;
const modalPic = modal.querySelector('.mainPic img') as HTMLDivElement;
const side = document.querySelector('.menu') as HTMLDivElement;
const galleryImgs = document.querySelectorAll('.gallery img');
const galleryImgsModal = document.querySelectorAll('.gallerymodal img');
const currentQ = document.querySelector(
  '.currentquantity'
) as HTMLParagraphElement;
const currPrice = document.querySelector('.currPrice') as HTMLParagraphElement;
let quantity = 0;
let total: number = 0;
let cartobj: object[] = [];
let currentpic = 1;

console.log(mainPic.getAttribute('src'));

cart.addEventListener('click', () => {
  cartCont.classList.toggle('openCart');
  if (cartCont.classList.contains('openCart')) {
    left.style.display = 'none';
    right.style.display = 'none';
  } else {
    left.style.display = 'flex';
    right.style.display = 'flex';
  }
});

addtocartbtn.addEventListener('click', () => {
  const card = document.createElement('div');
  card.classList.add('productCard');
  card.dataset.quant = `${currentQ.textContent}`;
  card.innerHTML = `
  <img src="images/thumb_1.jpg" alt="" />
  <div class="cardTxt">
    <p class="productTitle">NIKE Air Jordan 1</p>
    <div class="cartPrices">
      <p class="productCardPrice">€${currPrice.textContent?.slice(1)} x ${
    currentQ.textContent
  }</p>
      <p class="productCardTotal">€${
        Number(currPrice.textContent?.slice(1)) * Number(currentQ.textContent)
      }</p>
    </div>
  </div>
  <img src="images/icon-delete.svg" id="delete" alt="" />
  `;

  if (currentQ.textContent === '0') {
    return;
  } else {
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
    setTimeout(() => {
      cart.classList.remove('shake-top');
    }, 501);
    if (currentQ.textContent === '3') {
      const url: string =
        'https://open.spotify.com/track/58Z5LOsl0T0PlGYQaLGsMG?autoplay=true';
      const target: string = '_blank';
      let marinko = window.open(url, target);
      marinko?.focus();
    }
    quantity = 0;
    currentQ.textContent = '0';
  }
});

function deleteItem() {
  const trashBtns = document.querySelectorAll('#delete') as NodeList;

  for (let btn of trashBtns) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      console.log('test');
      const icon = e.target as HTMLImageElement;
      const card = icon.parentElement as HTMLDivElement;
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
  } else {
    currentQ.textContent = `${quantity}`;
  }
});

galleryImgs.forEach((img) => {
  let slika = img as HTMLImageElement;
  let id = slika.dataset.id;
  img.addEventListener('click', () => {
    console.log(id);
    console.log(modalPic);
    console.log(galleryImgsModal);
    galleryImgs.forEach((image) => image.classList.remove('active'));
    galleryImgsModal.forEach((img) => img.classList.remove('active'));
    // img.classList.add('active');
    galleryImgs[Number(id) - 1].classList.add('active');
    galleryImgsModal[Number(id) - 1].classList.add('active');
    currentpic = Number(id);
    console.log(currentpic);
    mainPic.classList.add('imageAnim');
    modalPic.classList.add('imageAnim');
    // mainPic.setAttribute('src', `/images/image-product-${id}.jpg`);
    // modalPic.setAttribute('src', `/images/image-product-${id}.jpg`);
    mainPic.setAttribute('src', `images/air_jordan_${id}.webp`);
    modalPic.setAttribute('src', `images/air_jordan_${id}.webp`);
    setTimeout(() => {
      mainPic.classList.remove('imageAnim');
      modalPic.classList.remove('imageAnim');
    }, 500);
  });
});

galleryImgsModal.forEach((img) => {
  let slika = img as HTMLImageElement;
  let id = slika.dataset.id;
  img.addEventListener('click', () => {
    galleryImgs.forEach((image) => image.classList.remove('active'));
    galleryImgs[Number(id) - 1].classList.add('active');
    galleryImgsModal[Number(id) - 1].classList.add('active');
  });
});

right.addEventListener('click', () => {
  mainPic.classList.add('imageAnimL');
  modalPic.classList.add('imageAnimL');
  currentpic++;
  if (currentpic > 4) {
    currentpic = 1;
  }
  mainPic.setAttribute('src', `images/air_jordan_${currentpic}.webp`);
  modalPic.setAttribute('src', `images/air_jordan_${currentpic}.webp`);
  setTimeout(() => {
    mainPic.classList.remove('imageAnimL');
    modalPic.classList.remove('imageAnimL');
  }, 500);
  galleryImgs.forEach((image) => image.classList.remove('active'));
  galleryImgs[Number(currentpic) - 1].classList.add('active');
  galleryImgsModal[Number(currentpic) - 1].classList.add('active');
  console.log(currentpic);
});
left.addEventListener('click', () => {
  mainPic.classList.add('imageAnim');
  modalPic.classList.add('imageAnim');
  currentpic--;
  if (currentpic < 1) {
    currentpic = 4;
  }
  mainPic.setAttribute('src', `images/air_jordan_${currentpic}.webp`);
  modalPic.setAttribute('src', `images/air_jordan_${currentpic}.webp`);
  setTimeout(() => {
    mainPic.classList.remove('imageAnim');
    mainPic.classList.remove('imageAnimL');
    modalPic.classList.remove('imageAnim');
  }, 500);
  console.log(currentpic);
});

function animQuantity(): void {
  currentQ.classList.add('slide-in-blurred-left');
  setTimeout(() => {
    currentQ.classList.remove('slide-in-blurred-left');
  }, 301);
}
function openModal() {
  console.log('test');
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
