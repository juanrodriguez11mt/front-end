var ruta = dominio + "Car/";

function cargarGamas() {
    listaGamas(-1)
}

function listaGamas(idGamaCar) {
    $.ajax({
        url: dominio + 'Gama/all',
        data: { },
        type: 'GET',
        dataType: 'json',
        crossDomain: true, 

        success: function(data) {
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
                $('#cars-table tbody')
                    .append('<tr>' +
                                '<td class="col">' + item.idCar + '</td>' +
                                '<td class="col">' + item.name + '</td>' +
                                '<td class="col">' + item.brand + '</td>' +
                                '<td class="col">' + item.year + '</td>' +
                                '<td class="col">' + item.description + '</td>' +
                                '<td class="col"><a href="detalle.html?id=' + item.idCar + '">Detalle</td>' +
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
    $.ajax({    
        url : ruta + obtenerParametroId(),
        data : { },
        type : 'GET',
        dataType : 'json',
        crossDomain: true,
        
        success : function(response) {
            var item = response;
            if (item != null) {
                $("#content").show();
                $('#car-id').val(item.idCar);
                $('#car-brand').val(item.brand);
                $('#car-name').val(item.name);
                $('#car-year').val(item.year);
                $('#car-description').val(item.description);
                $('#car-brand').prop("disabled", false)
                $('#car-name').prop("disabled", false)
                $('#car-year').prop("disabled", false)
                $('#car-description').prop("disabled", false)
                listaGamas(item.gama == null ? -1 : item.gama.idGama);
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
    $("#car-id").val("");
    $("#car-brand").val("");
    $("#car-name").val("");
    $("#car-description").val("");
    $("#car-year").val("");
    $("#car-gama").val("-1");
}

function actualizar() {
    $('#car-brand').prop("disabled", true)
    $('#car-name').prop("disabled", true)
    $('#car-year').prop("disabled", true)
    $('#car-description').prop("disabled", true)
    var body = { 
        idCar: $("#car-id").val(),
        brand: $("#car-brand").val(),
        name: $("#car-name").val(),
        year: $("#car-year").val(),
        description: $("#car-description").val(),
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
            $('#car-brand').prop("disabled", false)
            $('#car-name').prop("disabled", false)
            $('#car-year').prop("disabled", false)
            $('#car-description').prop("disabled", false)
        }
    });
}

function eliminar() {
    if (confirm("¿Está seguro de eliminar el registro?")) {
        $.ajax({    
            url : ruta + obtenerParametroId(),
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
    $('#car-brand').prop("disabled", true)
    $('#car-name').prop("disabled", true)
    $('#car-gama').prop("disabled", true)
    $('#car-description').prop("disabled", true)
    $('#car-year').prop("disabled", true)

    var body = { 
        brand: $("#car-brand").val(),
        name: $("#car-name").val(),
        year: $("#car-year").val(),
        description: $("#car-description").val(),
        gama: {
            idGama: $("#car-gama").val() == -1 ? null : $("#car-gama").val(), 
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
            $('#car-brand').prop("disabled", false)
            $('#car-name').prop("disabled", false)
            $('#car-year').prop("disabled", false)
            $('#car-gama').prop("disabled", false)
            $('#car-description').prop("disabled", false)
        }
    });
}