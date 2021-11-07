var ruta = dominio + "Client/";

function cargarLista() {
    $('#mensaje').text("Cargando datos ...");
    listaClientes();
}

function listaClientes() {
    $('#clients-table tbody').empty();
    $.ajax({    
        url : ruta + "all",
        data : { },
        type : 'GET',
        dataType : 'json',
        crossDomain: true,
    
        success : function(response) {
            var items = response;
            for (var i=0; i<items.length; i++)
            {
                var item = items[i]
                $('#clients-table tbody')
                    .append('<tr>' +
                                '<td class="col">' + item.idClient + '</td>' +
                                '<td class="col">' + item.name + '</td>' +
                                '<td class="col">' + item.age + '</td>' +
                                '<td class="col">' + item.email + '</td>' +
                                '<td class="col">' + '*'.repeat(item.password.length) + '</td>' +
                                '<td class="col"><a href="detalle.html?id=' + item.idClient + '">Detalle</td>' +
                            '</tr>');
            };
        },
        error : function(xhr, status) {
            console.log('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            $('#mensaje').empty();
            console.log('Petición realizada');
        }
    });
}

function carTablaMensajes(items) {
    for (var i=0; i<items.length; i++)
    {
        var item = items[i]
        $('#messages-table tbody')
            .append('<tr>' +
                        '<td class="col">' + item.idMessage + '</td>' +
                        '<td class="col">' + item.messageText + '</td>' +
                        '<td class="col"><a href="/messages/detalle.html?id=' + item.idMessage + '">Detalle</td>' +
                    '</tr>');
    };
}

function carTablaReservas(items) {
    for (var i=0; i<items.length; i++)
    {
        var item = items[i]
        $('#reservations-table tbody')
            .append('<tr>' +
                        '<td class="col">' + item.idReservation + '</td>' +
                        '<td class="col">' + formatDate(item.startDate) + '</td>' +
                        '<td class="col">' + formatDate(item.devolutionDate) + '</td>' +
                        '<td class="col">' + printStatus(item.status) + '</td>' +
                        '<td class="col"><a href="/reservation/detalle.html?id=' + item.idReservation + '">Detalle</a></td>' +
                    '</tr>');
    };
}
function cargarDetalles() {
    $('#mensaje').text("Cargando datos ...");
    var id = obtenerParametroId();
    $.ajax({    
        url : ruta + id,
        data : { },
        type : 'GET',
        dataType : 'json',
        crossDomain: true,
        
        success : function(response) {
            var item = response;
            if (item != null) {
                $("#content").show();
                $('#client-id').val(item.idClient);
                $('#client-name').val(item.name);
                $('#client-age').val(item.age);
                $('#client-email').val(item.email);
                $('#client-password').val(item.password);
                $('#client-name').prop("disabled", false)
                $('#client-age').prop("disabled", false)
                $('#client-email').prop("disabled", false)
                $('#client-password').prop("disabled", false)
                carTablaReservas(item.reservations);
                carTablaMensajes(item.messages);
                $('#mensaje').empty();
            } else {
                $('#content').empty();
                $('#mensaje').text("No hay registro disponible");
            }
        },
        error : function(xhr, status) {
            console.log('ha sucedido un problema');
            $('#content').empty();
            $('#mensaje').text("No hay registro disponible");
        },
        complete : function(xhr, status) {
            console.log('Petición realizada');
        }
    });
}

function obtenerParametroId() {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === 'id') {
            return sParameterName[1];
        }
    }
    return undefined;
};

function limpiarFormulario() {
    $("#client-id").val("");
    $("#client-name").val("");
    $("#client-age").val("");
    $("#client-email").val("");
    $("#client-password").val("");
}

function actualizar() {
    $('#client-name').prop("disabled", true)
    $('#client-age').prop("disabled", true)
    $('#client-email').prop("disabled", true)
    $('#client-password').prop("disabled", true)
    var body = { 
        idClient: $("#client-id").val(),
        name: $("#client-name").val(),
        age: $("#client-age").val(),
        email: $("#client-email").val(),
        password: $("#client-password").val(),
    }
    
    $.ajax({    
        url : ruta + "update",
        data : JSON.stringify(body),
        type : 'PUT',
        contentType: 'application/json',
    
        success : function(response, status) {
            alert('Datos actualizados');
        },
        error : function(xhr, status) {
            console.log('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            console.log('Petición realizada');
            $('#client-name').prop("disabled", false)
            $('#client-age').prop("disabled", false)
            $('#client-email').prop("disabled", false)
            $('#client-password').prop("disabled", false)
        }
    });
}

function eliminar() {
    if (confirm("¿Está seguro de eliminar el registro?")) {    
        $.ajax({    
            url : ruta + $("#client-id").val(),
            data : {},
            type : 'DELETE',
            contentType: 'application/json',
            
            success : function(response, status) {
                alert('Registro eliminado');
                $('#content').empty();
                $('#mensaje').text("No hay registro disponible");
            },
            error : function(xhr, status) {
                console.log('ha sucedido un problema');
            },
            complete : function(xhr, status) {
                console.log('Petición realizada');
            }
        });
    }
}

function registrar() {
    $('#client-password').prop("disabled", true)
    $('#client-name').prop("disabled", true)
    $('#client-age').prop("disabled", true)
    $('#client-email').prop("disabled", true)

    var body = { 
        password: $("#client-password").val(),
        name: $("#client-name").val(),
        age: $("#client-age").val(),
        email: $("#client-email").val(),
    }
    
    $.ajax({    
        url : ruta + "save",
        data : JSON.stringify(body),
        type : 'POST',
        contentType: 'application/json',
    
        success : function(response, status) {
            alert('Registro exitoso');
            limpiarFormulario();
        },
        error : function(xhr, status) {
            console.log('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            console.log('Petición realizada');
            $('#client-password').prop("disabled", false)
            $('#client-name').prop("disabled", false)
            $('#client-age').prop("disabled", false)
            $('#client-email').prop("disabled", false)
        }
    });
}