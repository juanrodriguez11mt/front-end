var ruta = "https://g55a3c31906132b-basedatosrenta.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/car/car";

function cargarGamas() {
    $.ajax({
        url: 'http://132.226.253.34/api/Gama/all',
        data: { },
        type: 'GET',
        dataType: 'json',
        crossDomain: true, 

        success: function(data) {
            var idGamaCar = -2;
            for(var i=0; i<data.length; i ++) {
                var selected = '';
                if (data[i].idGama == idGamaCar) {
                    selected = 'selected';
                }
                $('#car-gama')
                    .append('<option value="' + data[i].idGama + '" ' + selected + '>' + data[i].name + '</option>');
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
    listaCarros();
}

function listaCarros() {
    $('#cars-table tbody').empty();
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
                $('#cars-table tbody')
                    .append('<tr>' +
                                '<td class="col">' + item.id + '</td>' +
                                '<td class="col">' + item.brand + '</td>' +
                                '<td class="col">' + item.model + '</td>' +
                                '<td class="col">' + item.category_id + '</td>' +
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
                alert('No fue posible cargar los detalles del carro')
            }
            else {
                var item = items[0];
                $("#car-form").css("display", "block");
                $('#car-id').val(item.id);
                $('#car-brand').val(item.brand);
                $('#car-model').val(item.model);
                $('#car-category').val(item.category_id);
                $('#car-brand').prop("disabled", false)
                $('#car-model').prop("disabled", false)
                $('#car-category').prop("disabled", false)
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
    $("#car-id").val("");
    $("#car-brand").val("");
    $("#car-model").val("");
    $("#car-category").val("");
}

function actualizar() {
    $('#car-brand').prop("disabled", true)
    $('#car-model').prop("disabled", true)
    $('#car-category').prop("disabled", true)
    var body = { 
        id: $("#car-id").val(),
        brand: $("#car-brand").val(),
        model: $("#car-model").val(),
        category_id: $("#car-category").val(),
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
            $('#car-brand').prop("disabled", false)
            $('#car-model').prop("disabled", false)
            $('#car-category').prop("disabled", false)
        }
    });
}

function eliminar() {
    if (confirm("¿Está seguro de eliminar el registro?")) {
        var body = { 
            id: $("#car-id").val()
        }
    
        $.ajax({    
            url : ruta,
            data : JSON.stringify(body),
            type : 'DELETE',
            contentType: 'application/json',
            
            success : function(response, status) {
                alert('Registro eliminado');
                $('#car-form').css("display", "none");
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
    $('#car-id').prop("disabled", true)
    $('#car-brand').prop("disabled", true)
    $('#car-model').prop("disabled", true)
    $('#car-category').prop("disabled", true)

    var body = { 
        id: $("#car-id").val(),
        brand: $("#car-brand").val(),
        model: $("#car-model").val(),
        category_id: $("#car-category").val(),
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
            $('#car-id').prop("disabled", false)
            $('#car-brand').prop("disabled", false)
            $('#car-model').prop("disabled", false)
            $('#car-category').prop("disabled", false)
        }
    });
}