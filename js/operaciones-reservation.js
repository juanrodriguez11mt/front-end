var ruta = dominio + "Reservation/";

function minStartDate() {
    var startDateVal = $('#reservation-start-date').val();
    var date = startDateVal == '' || startDateVal == undefined ? new Date() : new Date(startDateVal)
    return date.toISOString().split('T')[0]
}

function minDevolutionDate() {
    var startDateVal = $('#reservation-start-date').val();
    var date = startDateVal == '' || startDateVal == undefined ? new Date() : new Date(startDateVal)
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
    return date.toISOString().split('T')[0]
}

function formatDate(reservationDate) {
    var date = new Date(reservationDate);
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    return date.getFullYear() + "-" + month + "-" + day ;
}

function printStatus(status) {
    switch(status) {
        case "created":
            return "Creado";
        case "completed":
            return "Completado";
        case "cancelled":
            return "Cancelado";
        default:
            return status;
    }
}

function cargarListas() {
    listaClientes(-1);
    listaCarros(-1)
}

function listaClientes(idClientReservation) {
    $.ajax({
        url: dominio + 'Client/all',
        data: { },
        type: 'GET',
        dataType: 'json',
        crossDomain: true, 

        success: function(data) {
            for(var i=0; i<data.length; i ++) {
                var selected = '';
                if (data[i].idClient == idClientReservation) {
                    selected = 'selected';
                }
                $('#reservation-client')
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

function listaCarros(idCarReservation) {
    $.ajax({
        url: dominio + 'Car/all',
        data: { },
        type: 'GET',
        dataType: 'json',
        crossDomain: true, 

        success: function(data) {
            for(var i=0; i<data.length; i ++) {
                var selected = '';
                if (data[i].idCar == idCarReservation) {
                    selected = 'selected';
                }
                $('#reservation-car')
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
    $('#reservations-table tbody').empty();
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
                var stars = item.score == null ? '<a href="/reservation/score/registrar.html?id=' + item.idReservation + '">Calificar</a>' : '<a href="/reservation/score/detalle.html?id=' + item.score.idScore + '">Detalle</a>';
                $('#reservations-table tbody')
                    .append('<tr>' +
                                '<td class="col">' + item.idReservation + '</td>' +
                                '<td class="col">' + formatDate(item.startDate) + '</td>' +
                                '<td class="col">' + formatDate(item.devolutionDate) + '</td>' +
                                '<td class="col">' + printStatus(item.status) + '</td>' +
                                '<td class="col">' + stars + '</td>' +
                                '<td class="col"><a href="detalle.html?id=' + item.idReservation + '">Detalle</a></td>' +
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
            var stars = item.score == null ? 'N/A' : item.score.stars;
            var observations = item.score == null ? 'N/A' : item.score.messageText;
            $("#reservation-form").css("display", "block");
            $('#reservation-id').val(item.idReservation);
            $('#reservation-start-date').val(formatDate(item.startDate));
            $('#reservation-devolution-date').val(formatDate(item.devolutionDate));
            $('#reservation-status').val(item.status);
            $('#reservation-score-stars').val(stars);
            $('#reservation-score-message').val(observations);
            $('#reservation-start-date').prop("disabled", false)
            $('#reservation-devolution-date').prop("disabled", false)
            $('#reservation-status').prop("disabled", false)
            listaCarros(item.car.idCar)
            listaClientes(item.client.idClient)
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
    $('#reservation-start-date').val("");
    $('#reservation-devolution-date').val("");
    $('#reservation-status').val("");
    $('#reservation-car').val("");
    $('#reservation-client').val("");
}

function actualizar() {
    $('#reservation-start-date').prop("disabled", true)
    $('#reservation-devolution-date').prop("disabled", true)
    $('#reservation-status').prop("disabled", true)

    var body = { 
        idReservation: $('#reservation-id').val(),
        startDate: $('#reservation-start-date').val(),
        devolutionDate: $('#reservation-devolution-date').val(),
        status: $('#reservation-status').val(),
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
            $('#reservation-start-date').prop("disabled", false)
            $('#reservation-devolution-date').prop("disabled", false)
            $('#reservation-status').prop("disabled", false)
        }
    });
}

function eliminar() {
    if (confirm("¿Está seguro de eliminar el registro?")) {    
        $.ajax({    
            url : ruta + $("#reservation-id").val(),
            data : {},
            type : 'DELETE',
            contentType: 'application/json',
            
            success : function(response, status) {
                alert('Registro eliminado');
                $('#reservation-form').css("display", "none");
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
    $('#reservation-start-date').prop("disabled", true)
    $('#reservation-devolution-date').prop("disabled", true)
    $('#reservation-status').prop("disabled", true)
    $('#reservation-car').prop("disabled", true)
    $('#reservation-client').prop("disabled", true)

    var body = { 
        startDate: $('#reservation-start-date').val(),
        devolutionDate: $('#reservation-devolution-date').val(),
        status: $('#reservation-status').val() == "" ? null : $('#reservation-status').val(),
        car: {
            idCar: $('#reservation-car').val()
        },
        client: {
            idClient: $('#reservation-client').val()
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
            $('#reservation-start-date').prop("disabled", false)
            $('#reservation-devolution-date').prop("disabled", false)
            $('#reservation-status').prop("disabled", false)
            $('#reservation-car').prop("disabled", false)
            $('#reservation-client').prop("disabled", false)
        }
    });
}