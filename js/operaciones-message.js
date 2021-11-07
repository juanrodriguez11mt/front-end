var ruta = dominio + "Message/"

function cargarListas() {
    listaClientes(-1);
    listaCarros(-1)
}

function listaClientes(idClientMessage) {
    $.ajax({
        url: dominio + 'Client/all',
        data: { },
        type: 'GET',
        dataType: 'json',
        crossDomain: true, 

        success: function(data) {
            for(var i=0; i<data.length; i ++) {
                var selected = '';
                if (data[i].idClient == idClientMessage) {
                    selected = 'selected';
                }
                $('#message-client')
                    .append('<option value="' + data[i].idClient + '" ' + selected + '>' + data[i].name + '</option>');
            }
        }, 
        error: function(e, status) {
            console.log(e)
        },
        complete: function (e) {
            console.log('Petición realizada')
        }
    })
}

function listaCarros(idCarMessage) {
    $.ajax({
        url: dominio + 'Car/all',
        data: { },
        type: 'GET',
        dataType: 'json',
        crossDomain: true, 

        success: function(data) {
            for(var i=0; i<data.length; i ++) {
                var selected = '';
                if (data[i].idCar == idCarMessage) {
                    selected = 'selected';
                }
                $('#message-car')
                    .append('<option value="' + data[i].idCar + '" ' + selected + '>' + data[i].name + '-' + data[i].brand + ' (' + data[i].year + ')' + '</option>');
            }
        }, 
        error: function(e, status) {
            console.log(e)
        },
        complete: function (e) {
            console.log('Petición realizada')
        }
    })
}

function cargarLista() {
    $('#mensaje').text("Cargando datos ...");
    lista();
}

function lista() {
    $('#messages-table tbody').empty();
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
                $('#messages-table tbody')
                    .append('<tr>' +
                                '<td class="col">' + item.idMessage + '</td>' +
                                '<td class="col">' + item.messageText + '</td>' +
                                '<td class="col"><a href="detalle.html?id=' + item.idMessage + '">Detalle</td>' +
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
                $('#message-id').val(item.idMessage);
                $('#message-message').val(item.messageText);
                $('#message-message').prop("disabled", false)
                listaCarros(item.car.idCar)
                listaClientes(item.client.idClient)
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
    $("#message-id").val("");
    $("#message-message").val("");
    $('#message-client').val("");
    $('#message-car').val("");
}

function actualizar() {
    $('#message-message').prop("disabled", true);
    var body = { 
        idMessage: $("#message-id").val(),
        messageText: $("#message-message").val(),
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
            $('#message-message').prop("disabled", false);
        }
    });
}

function eliminar() {
    if (confirm("¿Está seguro de eliminar el registro?")) {    
        $.ajax({    
            url : ruta + $("#message-id").val(),
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
    $('#message-id').prop("disabled", true)
    $('#message-message').prop("disabled", true)
    $('#message-client').prop("disabled", true)
    $('#message-car').prop("disabled", true)
    var body = { 
        messageText: $("#message-message").val(),
        client: {
            idClient: $("#message-client").val()
        },
        car: {
            idCar: $("#message-car").val()
        }
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
            $('#message-id').prop("disabled", false)
            $('#message-message').prop("disabled", false)
            $('#message-client').prop("disabled", false)
            $('#message-car').prop("disabled", false)
        }
    });
}