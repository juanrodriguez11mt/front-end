window.onload = function() {
    iniciarNombreJquery();
}

var conteo = 0;

function inicioPagina() {
    alert('Hola, bienvenido a la universidad')
}

function sumarConteo() {
    conteo ++;
    alert("Has realizado " + conteo + ' clicks ');
}

function restarConteo() {
    conteo --;
    alert("Has realizado " + conteo + ' clicks ');
}

function iniciarNombre() {
    var txtNombre = document.getElementById("nombre");
    txtNombre.value = "Juan Pablo";
}

function iniciarNombreJquery() {
    var txtNombre = $('#nombre');
    txtNombre.val("Juan Pablo");
}

function resaltar(element) {
    element.style.backgroundColor = "grey";
}

function liberar(element) {
    element.style.backgroundColor = "white";
}

function mostrarValor(element) {
    alert('Has elegido la gama ' + element.value)
}

function resumen() {
    var parrafos = $('p');
    var botones = $('button');

    if (parrafos.length > 0) {
        alert('Hay un total de ' + parrafos.length + ' parráfos')
    } else {
        alert('No hay elementos de tipo párrafo')
    }
    if (botones.length > 0) {
        alert('Hay un total de ' + botones.length + ' botones')
    } else {
        alert('No hay elementos de tipo botón')
    }

    var claseTextoInicial = $('.texto-inicial');
    if (claseTextoInicial.length > 0) {
        alert('Hay un total de ' + claseTextoInicial.length + ' clases "texto-inicial"')
    } else {
        alert('No hay elementos de clases "texto-inicial"')
    }
    var claseTextoInicial = $('.texto-inicialssss');
    if (claseTextoInicial.length > 0) {
        alert('Hay un total de ' + claseTextoInicial.length + ' clases "texto-inicialsss"')
    } else {
        alert('No hay elementos de clases "texto-inicialsss"')
    }

}