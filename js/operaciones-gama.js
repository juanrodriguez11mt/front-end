var ruta = dominio + "Gama/";

function cargarLista() {
    $('#mensaje').text("Cargando datos ...");
    listaCarros();
}

function listaCarros() {
    $('#gamas-table tbody').empty();
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
                $('#gamas-table tbody')
                    .append('<tr>' +
                                '<td class="col">' + item.idGama + '</td>' +
                                '<td class="col">' + item.name + '</td>' +
                                '<td class="col">' + item.description + '</td>' +
                                '<td class="col"><a href="detalle.html?id=' + item.idGama + '">Detalle</td>' +
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
            $("#gama-form").css("display", "block");
            $('#gama-id').val(item.idGama);
            $('#gama-name').val(item.name);
            $('#gama-description').val(item.description);
            $('#gama-name').prop("disabled", false)
            $('#gama-description').prop("disabled", false)
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
    $("#gama-id").val("");
    $("#gama-name").val("");
    $("#gama-description").val("");
}

function actualizar() {
    $('#gama-name').prop("disabled", true)
    $('#gama-description').prop("disabled", true)
    var body = { 
        idGama: $("#gama-id").val(),
        name: $("#gama-name").val(),
        description: $("#gama-description").val()
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
            $('#gama-name').prop("disabled", false)
            $('#gama-description').prop("disabled", false)
        }
    });
}

function eliminar() {
    if (confirm("¿Está seguro de eliminar el registro?")) {
        id = $("#gama-id").val()
    
        $.ajax({    
            url : ruta + id,
            data : {},
            type : 'DELETE',
            contentType: 'application/json',
            
            success : function(response, status) {
                alert('Registro eliminado');
                $('#gama-form').css("display", "none");
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
    $('#gama-name').prop("disabled", true)
    $('#gama-description').prop("disabled", true)

    var body = { 
        name: $("#gama-name").val(),
        description: $("#gama-description").val(),
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
            $('#gama-id').prop("disabled", false)
            $('#gama-name').prop("disabled", false)
            $('#gama-description').prop("disabled", false)
        }
    });
}