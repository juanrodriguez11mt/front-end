var ruta = dominio + "Reservation/";

function minDateTwo() {
    var startDateVal = $('#date-one').val();
    var date = startDateVal == '' || startDateVal == undefined ? new Date(1990, 0, 1) : new Date(startDateVal)
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
    return date.toISOString().split('T')[0]
}

function reporteEstado() {
    $('#mensaje').text("Cargando datos ...");
    $('#report-table').empty();
    $.ajax({
        url: ruta + 'report-status',
        data: { },
        type: 'GET',
        dataType: 'json',
        crossDomain: true, 

        success: function(data) {
            $('#report-table')
                .append('<div>' +
                '    <strong>Total reservas completadas: </strong><label>' + data.completed + '</label>' +
                '</div>' +
                '<div>' +
                '    <strong>Total reservas canceladas: </strong><label>' + data.cancelled + '</label>' +
                '</div>');
        }, 
        error: function(e, status) {
            console.log(e)
        },
        complete: function (e) {
            $('#mensaje').empty();
            console.log('Petición realizada')
        }
    })
}

function reporteClientes() {
    $('#mensaje').text("Cargando datos ...");
    $('#report-table tbody').empty();
    $.ajax({
        url: ruta + 'report-clients',
        data: { },
        type: 'GET',
        dataType: 'json',
        crossDomain: true, 

        success: function(data) {
            var items = data;
            for (var i=0; i<items.length; i++)
            {
                var item = items[i]
                $('#report-table tbody')
                    .append('<tr>' +
                                '<td class="col">' + item.client.name + '</td>' +
                                '<td class="col">' + item.client.age + '</td>' +
                                '<td class="col">' + item.total + '</td>' +
                            '</tr>');
            }
        }, 
        error: function(e, status) {
            console.log(e)
        },
        complete: function (e) {
            $('#mensaje').empty();
            console.log('Petición realizada')
        }
    })
}

function reportePeriodo() {
    $('#mensaje').text("Cargando datos ...");
    $('#report-table tbody').empty();
    var dateOne = $("#date-one").val();
    var dateTwo = $("#date-two").val();
    $.ajax({
        url: ruta + 'report-dates/' + dateOne + '/' + dateTwo,
        data: { },
        type: 'GET',
        dataType: 'json',
        crossDomain: true, 

        success: function(data) {
            var items = data;
            for (var i=0; i<items.length; i++)
            {
                var item = items[i]
                $('#report-table tbody')
                    .append('<tr>' +
                            '<td class="col">' + item.idReservation + '</td>' +
                            '<td class="col">' + formatDate(item.startDate) + '</td>' +
                            '<td class="col">' + formatDate(item.devolutionDate) + '</td>' +
                            '<td class="col">' + printStatus(item.status) + '</td>' +
                            '<td class="col"><a href="/reservation/detalle.html?id=' + item.idReservation + '">Detalle</td>' +
                        '</tr>');
            }
        }, 
        error: function(e, status) {
            console.log(e)
        },
        complete: function (e) {
            $('#mensaje').empty();
            console.log('Petición realizada')
        }
    })
}

function limpiarReporte() {
    $('#report-table tbody').empty();
    $("#date-one").val("");
    $("#date-two").val("");
}