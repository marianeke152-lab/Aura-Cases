let productos = [];
let carrito = [];

fetch("productos.json")
.then(r => r.json())
.then(data => {
    productos = data;
    renderizar(productos);
});

function renderizar(lista){

    const contenedor =
    document.getElementById("productos");

    contenedor.innerHTML = "";

    lista.forEach((p,index)=>{

        contenedor.innerHTML += `
        <div class="card">

            <img src="${p.imagen}">

            <div class="info">

                <div class="nombre">
                    ${p.nombre}
                </div>

                <div class="modelo">
                    ${p.modelo}
                </div>

                <div class="precio">
                    $${p.precio.toLocaleString()}
                </div>

                <div class="stock">
                    ${p.stock > 0
                    ? `✅ En stock (${p.stock})`
                    : `❌ Sin stock`}
                </div>

                <button
                class="agregar"
                onclick="agregar(${index})">

                    Agregar

                </button>

            </div>

        </div>
        `;
    });
}

function agregar(index){

    if(productos[index].stock <= 0){
        return;
    }

    carrito.push(productos[index]);

    actualizarCarrito();
}

function actualizarCarrito(){

    let html = "";
    let total = 0;

    carrito.forEach(item=>{

        html += `
        <p>
        ${item.nombre}
        <br>
        <small>${item.modelo}</small>
        </p>
        <hr>
        `;

        total += item.precio;
    });

    document.getElementById(
        "listaCarrito"
    ).innerHTML = html;

    document.getElementById(
        "total"
    ).innerText =
    total.toLocaleString();
}

function enviarWhatsApp(){

    if(carrito.length === 0){
        return;
    }

    let mensaje =
    "Hola Aura Cases, quiero pedir:%0A%0A";

    let total = 0;

    carrito.forEach(item=>{

        mensaje +=
        `• ${item.nombre} (${item.modelo}) - $${item.precio}%0A`;

        total += item.precio;
    });

    mensaje +=
    `%0ATotal: $${total}`;

    window.open(
        `https://wa.me/5493435126095?text=${mensaje}`
    );
}

document.addEventListener(
"input",
e=>{

if(e.target.id==="buscar"){

const texto =
e.target.value.toLowerCase();

const filtrados =
productos.filter(p=>

p.modelo.toLowerCase()
.includes(texto)

||

p.nombre.toLowerCase()
.includes(texto)

);

renderizar(filtrados);

}

});

function filtrarModelo(modelo){

if(modelo===""){
renderizar(productos);
return;
}

renderizar(
productos.filter(p=>
p.modelo.includes(modelo)
)
);

}
