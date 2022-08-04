const inputNum = document.querySelector(".inputSearch");
const inputBTN = document.querySelector(".inputBtn");
const menu = document.querySelector(".btn__container");
const item = document.querySelectorAll(".item");
const cartList = document.querySelector(".cartContainer");
const catalogo = document.querySelector(".catalogo");
const header = document.querySelector(".header");
const cartCont = document.querySelector(".carrito__Container");
const btnCompra = document.querySelectorAll(".btnCatalogo");
const totalItems = document.querySelector("#totalItems");
const totalProducts = document.querySelector("#totalProducts");
const borrarItemCart = document.querySelectorAll(".borrarCart");

console.log(totalItems)
const Pizzas = [{
    id: 1,
    nombre: "Muzzarella",
    ingredientes: ['queso', 'tomate', 'aceitunas', 'orégano'],
    precio: 1100,
    img: "./imagenes/muzza.jpg",
  },
  {
    id: 2,
    nombre: "Calabresa",
    ingredientes: ['queso', 'salame', 'tomate'],
    precio: 1350,
    img: "./imagenes/calabresa.jpg",
  },
  {
    id: 3,
    nombre: "Fugazzeta",
    ingredientes: ['queso', 'cebolla', 'aceitunas'],
    precio: 1200,
    img: "./imagenes/fugazeta.jpg",
  },
  {
    id: 4,
    nombre: "Especial",
    ingredientes: ['queso', 'tomate', 'aceitunas', 'orégano', 'jamón,morrones'],
    precio: 1300,
    img: "./imagenes/especial.jpg",
  },
  {
    id: 5,
    nombre: "Palmitos",
    ingredientes: ['palmitos', 'salsa golf', 'tomates', 'queso', 'jamón'],
    precio: 1300,
    img: "./imagenes/palmitos.jpg",
  },
  {
    id: 6,
    nombre: "Rúcula",
    ingredientes: ['queso', 'jamon', 'rucula'],
    precio: 1300,
    img: "./imagenes/rucula.jpg",
  },
]



// Mostrar menu (toggle)
menu.addEventListener('click', () => {
  item.forEach((i) => i.classList.toggle('show'));
});

inputBTN.addEventListener("click", buscarPizza);

function buscarPizza(e) {
  e.preventDefault();
  const pizzaID = inputNum.value;
  if (pizzaID === "") {
    showError("Por favor ingresa el ID de la pizza !");
    return;
  }
  createHTML();
  inputNum.value = "";
}

function showError(error) {
  const msgError = document.createElement("p");
  msgError.textContent = error;
  msgError.classList.add("error");
  cartList.appendChild(msgError);
  setTimeout(() => {
    msgError.remove();
  }, 2000);
}

function createHTML() {
  cartList.innerHTML = "";
  if (Pizzas.some((pizza) => pizza.id == inputNum.value)) {
    Pizzas.forEach((pizza) => {
      if (pizza.id === inputNum.valueAsNumber) {
        const h2 = document.createElement("h2");
        const h3 = document.createElement("h3");
        const h4 = document.createElement("h4");
        const span = document.createElement("span");
        cartList.classList.add("cartList2");
        h2.innerHTML = `Esa es la pizza ${pizza.nombre}`;
        h3.innerHTML = `Ingredientes: ${pizza.ingredientes}`;
        h4.innerHTML = `$ ${pizza.precio}`;
        span.innerHTML = `X`;
        cartList.appendChild(h2);
        cartList.appendChild(h3);
        cartList.appendChild(h4);
        cartList.appendChild(span);
        span.classList.add("borrar");
        span.addEventListener("click", (e) => {
          const item = e.target.parentElement;
          cartList.innerHTML = "";
        });
      } else {
        return;
      }
    });
  } else {
    showError("No hay ninguna pizza listada con ese ID!");
    return;
  }
}

//-----------------------------Intento carrito compras ----------
// let products = [];
// const setCount = () => {
//   let totalCount = 0;
//   for (let item in products) {
//     totalCount += Number(products[item].count);
//   }
//   totalItems.innerText = totalCount;
//   return totalCount;
// };

// const totalPrice = () => {
//   let totalCart = 0;
//   for (let item in products) {
//     totalCart += Number(products[item].precio * products[item].count);
//   }
//   totalProducts.innerText = totalCart;
//   return totalCart;
// };

// const handleAddProduct = (e) => {
//   e.preventDefault();
//   if (
//     !e.target.classList.contains("btnCatalogo") ||
//     e.target.classList.contains("disabled")
//   ) {
//     return;
//   }
//   for (let item in products) {
//     if (products[item].nombre === e.target.dataset.name) {
//       products[item].count++;
//       setCount();
//       totalPrice();
//       productList();
//       return;
//     }
//   }
//   const newPizza = {
//     id: e.target.dataset.id,
//     nombre: e.target.dataset.name,
//     precio: e.target.dataset.price,
//     img: e.target.dataset.img,
//     count: e.target.dataset.count,
//   };
//   products.push(newPizza);
//   setCount();
//   totalPrice();
//   productList();
// };

// const productList = () => {
//   cartCont.innerHTML = products
//     .map((product) => {
//       return `<div class="cardCatalogo">
//           <img class="imgCatalogo" src="${product.img}" alt="" />
//           <span class="numID">#${product.id}</span>
//           <h2>${product.nombre}</h2>
//           <h4>c/u $${product.precio}</h4>
//           <span class="cart__price">$${product.price * product.count}</span>
//           <span class="borrarCart">X</span>

//         </div>`;
//     })
//     .join("");
// };

// btnCompra.forEach((item) => {
//   item.addEventListener("click", handleAddProduct);
// });

// borrarItemCart.addEventListener("click", () => {
//   borrarItemCart.parentElement.remove();
// });