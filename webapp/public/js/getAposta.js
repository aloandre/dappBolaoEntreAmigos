window.addEventListener('load', function () {
    getAposta();
});

function getAposta() {
    console.log("*** getting aposta ***");

    $.get("/detalharAposta", function (res) {

        if (!res.error) {
            console.log("*** Views -> js -> bolao.js -> getAposta: ***", res.msg);
            let valor = res.valor;

            if (valor.vlr == 0) {
                let newRow = $("<tr>");
                let cols = `<th scope="col">Atenção</th>`;
                newRow.append(cols);
                $("#products-table").append(newRow);
                newRow = $("<tr>");
                cols = `<td> ${res.msg} </td>`;
                newRow.append(cols);
                $("#products-table").append(newRow);
            } else {
                let newRow = $("<tr>");
                let cols = `<th scope="col">Valor</th>`;
                newRow.append(cols);
                $("#products-table").append(newRow);
                newRow = $("<tr>");
                cols = `<td> ${valor.vlr} </td>`;
                newRow.append(cols);
                $("#products-table").append(newRow);
            }

        } else {
            alert("Erro ao consultar a aposta registrada no servidor. Por favor, tente novamente mais tarde. " + res.msg);
        }

    })
}