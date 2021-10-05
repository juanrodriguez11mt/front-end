var ruta = "https://g55a3c31906132b-basedatosrenta.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/car/car";

function cargarLista() {
    $('#cars-table tbody').empty();
    $('#mensaje').text("Cargando datos ...");
    $.ajax({    
        url : ruta,
        data : { },
        type : 'GET',
        dataType : 'json',
        crossDomain: true,
    
        success : function(json) {
            var items = json.items;
            for (var i=0; i<items.length; i++)
            {
                var item = items[i]
                $('#cars-table tbody')
                    .append('<tr>' +
                                '<td class="col">' + item.id + '</td>' +
                                '<td class="col">' + item.brand + '</td>' +
                                '<td class="col">' + item.model + '</td>' +
                                '<td class="col">' + item.category_id + '</td>' +
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