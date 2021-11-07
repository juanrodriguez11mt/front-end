var ruta = dominio + "Score/";

function printReservation(reservation) {
    return reservation.client.name + ' - ' 
            + reservation.car.name + '[' + reservation.car.brand + ' (' + reservation.car.year + ') ' + '] - '  
            + '(' + formatDate(reservation.startDate) + '/' + formatDate(reservation.devolutionDate) + ')'

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

function cargarReservas() {
    listaReservas(obtenerParametroId(), true);
}

function listaReservas(idReserva, inNew) {
    $.ajax({
        url: dominio + 'Reservation/' + idReserva,
        data: { },
        type: 'GET',
        dataType: 'json',
        crossDomain: true, 

        success: function(data) {
            var item = data;
            if (item.score != null && inNew) {
                $('#score-form').empty();
                $('#mensaje').text("La reserva ya cuenta con una calificación");
                return;
            }
            $('#score-form').css("display", "block");
            $('#score-reservation')
                .append('<option value="' + data.idReservation + '" selected >' + printReservation(item) + '</option>');
        },
        error: function(e, status) {
            console.log(e)
        },
        complete: function (e) {
            console.log('Petición realizada')
        }
    })
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
                $('#content').show();
                $('#score-id').val(item.idScore);
                $('#score-stars').val(item.stars);
                $('#score-message').val(item.messageText);
                $('#score-stars').prop("disabled", false)
                $('#score-message').prop("disabled", false)
                listaReservas(item.reservation.idReservation, false);$('#mensaje').empty();
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

function limpiarFormulario() {
    $('#score-id').val("");
    $('#score-stars').val("");
    $('#score-message').val("");
}

function actualizar() {
    $('#score-stars').prop("disabled", true);
    $('#score-message').prop("disabled", true);

    var body = { 
        idScore: $('#score-id').val(),
        messageText: $('#score-message').val(),
        stars: $('#score-stars').val(),
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
            $('#score-stars').prop("disabled", false);
            $('#score-message').prop("disabled", false);
        }
    });
}

function eliminar() {
    if (confirm("¿Está seguro de eliminar el registro?")) {    
        $.ajax({    
            url : ruta + $("#score-id").val(),
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
    $('#score-stars').prop("disabled", true);
    $('#score-message').prop("disabled", true);

    var body = { 
        idScore: $('#score-id').val(),
        messageText: $('#score-message').val(),
        stars: $('#score-stars').val(),
        reservation: {
            idReservation: $('#score-reservation').val()
        }
    }
    
    $.ajax({    
        url : ruta + "save",
        data : JSON.stringify(body),
        type : 'POST',
        contentType: 'application/json',
    
        success : function(response, status) {
            alert('Registro exitoso');
            $('#score-form').empty();
            $('#mensaje').text("La reserva ya cuenta con una calificación");
        },
        error : function(xhr, status) {
            console.log('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            console.log('Petición realizada');
            $('#score-stars').prop("disabled", false);
            $('#score-message').prop("disabled", false);
        }
    });
}