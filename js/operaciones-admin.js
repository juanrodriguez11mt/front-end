var ruta = dominio + "Admin/";

function cargarLista() {
    $('#mensaje').text("Cargando datos ...");
    listaClientes();
}

function listaClientes() {
    $('#admins-table tbody').empty();
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
                $('#admins-table tbody')
                    .append('<tr>' +
                                '<td class="col">' + item.idAdmin + '</td>' +
                                '<td class="col">' + item.name + '</td>' +
                                '<td class="col">' + item.email + '</td>' +
                                '<td class="col">' + '*'.repeat(item.password.length) + '</td>' +
                                '<td class="col"><a href="detalle.html?id=' + item.idAdmin + '">Detalle</td>' +
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
                $('#admin-id').val(item.idAdmin);
                $('#admin-name').val(item.name);
                $('#admin-email').val(item.email);
                $('#admin-password').val(item.password);
                $('#admin-name').prop("disabled", false)
                $('#admin-email').prop("disabled", false)
                $('#admin-password').prop("disabled", false)
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
    $("#admin-id").val("");
    $("#admin-name").val("");
    $("#admin-email").val("");
    $("#admin-password").val("");
}

function actualizar() {
    $('#admin-name').prop("disabled", true)
    $('#admin-email').prop("disabled", true)
    $('#admin-password').prop("disabled", true)
    var body = { 
        idAdmin: $("#admin-id").val(),
        name: $("#admin-name").val(),
        email: $("#admin-email").val(),
        password: $("#admin-password").val(),
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
            $('#admin-name').prop("disabled", false)
            $('#admin-email').prop("disabled", false)
            $('#admin-password').prop("disabled", false)
        }
    });
}

function eliminar() {
    if (confirm("¿Está seguro de eliminar el registro?")) {    
        $.ajax({    
            url : ruta + $("#admin-id").val(),
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
    $('#admin-password').prop("disabled", true)
    $('#admin-name').prop("disabled", true)
    $('#admin-email').prop("disabled", true)

    var body = { 
        password: $("#admin-password").val(),
        name: $("#admin-name").val(),
        email: $("#admin-email").val(),
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
            $('#admin-password').prop("disabled", false)
            $('#admin-name').prop("disabled", false)
            $('#admin-email').prop("disabled", false)
        }
    });
}