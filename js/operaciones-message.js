var ruta = "https://g55a3c31906132b-basedatosrenta.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message";

function cargarLista() {
    $('#mensaje').text("Cargando datos ...");
    listaCarros();
}

function listaCarros() {
    $('#messages-table tbody').empty();
    $.ajax({    
        url : ruta,
        data : { },
        type : 'GET',
        dataType : 'json',
        crossDomain: true,
    
        success : function(response) {
            var items = response.items;
            for (var i=0; i<items.length; i++)
            {
                var item = items[i]
                $('#messages-table tbody')
                    .append('<tr>' +
                                '<td class="col">' + item.id + '</td>' +
                                '<td class="col">' + item.messagetext + '</td>' +
                                '<td class="col"><a href="detalle.html?id=' + item.id + '">Detalle</td>' +
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
        url : ruta + "/" + id,
        data : { },
        type : 'GET',
        dataType : 'json',
        crossDomain: true,
        
        success : function(response) {
            var items = response.items;
            if (items.length < 1) {
                alert('No fue posible cargar los detalles del mensaje')
            }
            else {
                var item = items[0];
                $("#message-form").css("display", "block");
                $('#message-id').val(item.id);
                $('#message-message').val(item.messagetext);
                $('#message-message').prop("disabled", false)
            }
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
}

function actualizar() {
    $('#message-message').prop("disabled", true);
    var body = { 
        id: $("#message-id").val(),
        messagetext: $("#message-message").val(),
    }
    
    $.ajax({    
        url : ruta,
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
        var body = { 
            id: $("#message-id").val()
        }
    
        $.ajax({    
            url : ruta,
            data : JSON.stringify(body),
            type : 'DELETE',
            contentType: 'application/json',
            
            success : function(response, status) {
                alert('Registro eliminado');
                $('#message-form').css("display", "none");
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
    var body = { 
        id: $("#message-id").val(),
        messagetext: $("#message-message").val()
    }
    
    $.ajax({    
        url : ruta,
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
        }
    });
}