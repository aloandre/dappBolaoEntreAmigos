window.addEventListener('load', function () {
    getDashboard();
});

function getDashboard() {
    console.log("*** getting dashboard ***");

    $.get("/dadosUsuario", function (res) {
        if (!res.error) {
            console.log("*** Views -> js -> bolao.js -> getDashboard: ***", res.msg);

            let newRow = $("<tr>");
            let cols = `<td> ${req.session.username} </td>`;
            cols += `<td> ${req.session.address} </td>`;
            $("#products-table").append(newRow);

        } else {
            alert("Erro ao consultar a aposta registrada no servidor. Por favor, tente novamente mais tarde. " + res.msg);
        }

    })
}