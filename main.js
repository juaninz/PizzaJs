const inputNum = document.querySelector(".inputSearch");
const inputBTN = document.querySelector(".inputBtn");
const menu = document.querySelector(".btn__container");
const item = document.querySelectorAll(".item");
const cartList = document.querySelector(".cartContainer");
const catalogo = document.querySelector(".catalogo");
const header = document.querySelector(".header");
const btnCompra = document.querySelectorAll(".btnCatalogo");
//Quitar elemento carrito
const btnQuitar = document.getElementsByClassName('cart__quitar')
const btnBorrar = document.getElementById('borrarTodo')


// Contador del carrito y el total
const totalItems = document.getElementById('totalItems');
const totalProducts = document.getElementById('totalProducts');

// Div del carrito
const cart = document.getElementById('cart');
// Llamamos al navbar
const navbar = document.getElementById('navbar');

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

// Mostrar/Ocultar menu al scrollear
let ultimoScrollTop;

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  // console.log(`el scrolltop es ${scrollTop}`);
  // console.log(`el ultimo scroll es ${ultimoScrollTop}`);
  if (scrollTop > ultimoScrollTop) {
    navbar.style.top = '-200px';
  } else {
    navbar.style.top = '0';
  }
  ultimoScrollTop = scrollTop;
});

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
// Arrancamos con el carrito

// Creamos un array vacio para los productos
let products = [];

// Funcion para actualizar el contador de productos
const setCount = () => {
  let totalCount = 0;

  //   Recorremos el array y sumamos el contador
  for (let item in products) {
    totalCount += Number(products[item].count);
  }

  //   Actualizar el contador que esta en el span del carrito
  totalItems.innerText = totalCount;
  return totalCount;
};

const totalPrice = () => {
  let totalCart = 0;

  //   Reccorrer el array para hacer el total
  for (let item in products) {
    totalCart += Number(products[item].price * products[item].count);
  }

  totalProducts.innerText = totalCart;
  return totalCart;
};

const handleAddProduct = (e) => {
  // Cancelamos el comportamiento por defecto del boton
  e.preventDefault();
  if (
    !e.target.classList.contains('btnCatalogo') ||
    e.target.classList.contains('disabled')
  ) {
    return;
  }

  //   Tenemos que recorrer el array de productos
  for (let item in products) {
    // Si el name del producto ews igual al target.dataset.name que se esta agregando
    if (products[item].name === e.target.dataset.name) {
      // Incrementemos el contador del producto
      products[item].count++;
      // Llamamos a la funcion que actualiza el contador
      setCount();
      //   Actualizar en el div carrito
      // products[item].price * products[item].count;
      //   Ejecutamos el total del carrito
      totalPrice();
      // Ejecutamos la funcion que pinta para que actualice el carrito
      productList();
      return;
    }
  }

  //   Guardamos los target de los data
  const newProduct = {
    img: e.target.dataset.img,
    name: e.target.dataset.name,
    price: e.target.dataset.price,
    count: e.target.dataset.count,
  };

  products.push(newProduct);
  // console.log(newProduct);
  // crear una funcion que setee el contador de los items
  setCount();
  // crear una funcion que haga el total del precio
  totalPrice();
  // crear una funcion que pinte el html
  productList();
};

const productList = () => {
  cart.innerHTML = products
    .map((product) => {
      return `
    <div class="cart__item">
        <div class="cart__item--content">
        <div>
            <img
                src="${product.img}"
                alt="pizza"
                class="item-img"
            />
          </div>
          <p class="cart__title">${product.name} x ${product.count} c/u $ ${product.price}</p>
          <span class="cart__price">$${product.price * product.count}</span>
          <span class="cart__quitar"> X </span>
        </div>
      </div>
        `;
    })
    .join('');

};

// Listener al boton de comprar
btnCompra.forEach((item) => {
  item.addEventListener('click', handleAddProduct);
});

// //funcion para borrar todo
// function borrarCarrito(){
//   let products = 0;
//   // crear una funcion que setee el contador de los items
//   setCount();
//   // crear una funcion que haga el total del precio
//   totalPrice();
//   // crear una funcion que pinte el html
//   productList();
// };

//btn borrar todo
btnBorrar.addEventListener('click',() =>{
  products = [];
  // crear una funcion que setee el contador de los items
  setCount();
  // crear una funcion que haga el total del precio
  totalPrice();
  // crear una funcion que pinte el html
  productList();
})