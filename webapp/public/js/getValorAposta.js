window.addEventListener('load', function() {
    getValorAposta();
});

function getValorAposta() {
    console.log("*** getting valor aposta ***");

    $.get("/valorAposta", function(res) {
        
        if (!res.error) {
            console.log("*** Views -> js -> bolao.js -> getValorAposta: ***", res.msg);

            let valor = res.valor;
            let newRow = $("<tr>");
            let cols = `<td> ${valor.vlr} </td>`;
            newRow.append(cols);
            $("#products-table").append(newRow);

        } else {
            alert("Erro ao consultar o valor da aposta registradas do servidor. Por favor, tente novamente mais tarde. " + res.msg);
        }

    })
}