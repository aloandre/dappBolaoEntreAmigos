window.addEventListener('load', function() {
    getValorPremioAcumulado();
});

function getValorPremioAcumulado() {
    console.log("*** getting valor premio acumulado ***");

    $.get("/valorPremioAcumulado", function(res) {
        
        if (!res.error) {
            console.log("*** Views -> js -> bolao.js -> getValorPremioAcumulado: ***", res.msg);

            let valor = res.valor;
            let newRow = $("<tr>");
            let cols = `<td> ${valor.vlr} </td>`;
            
            newRow.append(cols);
            $("#products-table").append(newRow);

        } else {
            alert("Erro ao consultar a quantidade de apostas registradas do servidor. Por favor, tente novamente mais tarde. " + res.msg);
        }

    })
}