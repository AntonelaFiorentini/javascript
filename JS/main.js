$(document).ready(function () {

    // DOM

    const index = document.getElementById("index");
    const titulo = document.createElement("h1");
    const subtitulo = document.createElement("h2");
    const parrafo = document.createElement("p");

    titulo.textContent = "MAGNA STUDIO";
    subtitulo.textContent = "Wellness retreats";
    parrafo.textContent = "Tu bienestar es nuestra prioridad. Por eso te ofrecemos la oportunidad de diseñar tu retiro a medida. Te invitamos a relajarte y disfutar en nuestras instalaciones, accediendo a nuestros servicios exclusivos brindados por profesionales destacados en su ámbito.";

    index.appendChild(titulo);
    index.appendChild(subtitulo);
    index.appendChild(parrafo);

    // VARIABLES GLOBALES

    let finalCarrito = 0;
    let carrito = [];

    // SERVICIOS

    servicios = [
        { 'id': 1, 'nombre': 'Terapias sanadoras', 'precio': 5000, 'img': 'Multimedia/2.png' },
        { 'id': 2, 'nombre': 'Sauna', 'precio': 3000, 'img': 'Multimedia/3.png' },
        { 'id': 3, 'nombre': 'Restaurante', 'precio': 10000, 'img': 'Multimedia/4.png' },
        { 'id': 4, 'nombre': 'Piscina', 'precio': 3000, 'img': 'Multimedia/5.png' },
        { 'id': 5, 'nombre': 'Relax room', 'precio': 8000, 'img': 'Multimedia/6.png' },
        { 'id': 6, 'nombre': 'Masajes relajantes', 'precio': 5000, 'img': 'Multimedia/7.png' },
        { 'id': 7, 'nombre': 'Servicio para parejas', 'precio': 10000, 'img': 'Multimedia/8.png' },
        { 'id': 8, 'nombre': 'Alojamiento', 'precio': 9000, 'img': 'Multimedia/9.png' }
    ]

    // FUNCIONES
    
    var leerCarrito = function () {
        let car = JSON.parse(localStorage.getItem("carrito"));
        if (car == null) {
            carrito = []
        } else carrito = car
    }

    var mostrarServicios = function () {
        for (var i = 0; i < servicios.length; i++) {
            $("#muestra").append(`<div class="card text-center" style="width: 18rem;"><img src = ${servicios[i].img} class= "card-img-top" id="card-image" alt = "terapias"><div class="card-body"><h5 class="card-title item" id="card-title">${servicios[i].nombre}</h5><a href="#" class="btn addToCart" id="button${servicios[i].id}">Lo quiero</a></div>`)
            $(`#button${servicios[i].id}`).on("click", { value: servicios[i].id }, (event) => {
                let serv = servicios[event.data.value - 1];
                actualizarCarrito(serv);
                mostrarCarritoYTotal();
            })
        }
    }

    var actualizarCarrito = function (serv) {
        let itemCarrito = carrito.find((element) => element.servid == serv.id);
        if (itemCarrito != null) {
            itemCarrito.cantidad++;
            itemCarrito.precio = serv.precio * itemCarrito.cantidad;
        } else {
            carrito.push({ 'servicio': serv.nombre, 'servid': serv.id, 'cantidad': 1, 'precio': serv.precio });
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    var mostrarCarritoYTotal = function () {
        $("#carrito div.row").remove();
        if (carrito.length == 0) {
            $("#items").append(`<div class="row">No tiene elementos agregados al carrito.</div>`);
            $("#total").hide();
            return;
        }

        let total = 0;


        for (var i = 0; i < carrito.length; i++) {
            $("#items").append(`<div class="row"><div class="col-1" id="id_cantidad">${carrito[i].cantidad}</div><div class="col-8" id="nombre">${carrito[i].servicio}</div><div class="col-3 precioCarrito" id="precio">${carrito[i].precio}</div></div>`)
            total = total + carrito[i].precio;
        }

        if (total > 0) {
            $("#total").show()
            $("#importeTotal").text(total)
        }
    }

    // PRINCIPAL

    leerCarrito();
    mostrarServicios();
    mostrarCarritoYTotal();


})