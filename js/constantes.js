const dominio = "http://localhost/api/"; // "http://132.226.253.34/api/";

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