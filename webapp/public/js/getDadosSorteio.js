window.addEventListener('load', function () {
    getDadosSorteio();
});

function getDadosSorteio() {
    console.log("*** getting dados sorteio ***");
    $.get("/dadosSorteio", function (res) {
        if (!res.error) {
            console.log("*** Views -> js -> bolao.js -> getDadosSorteio: ***", res.msg);
            console.log("*** res: ***", res.dadosSorteio);

            let dados = res.dadosSorteio;

            let newRow = $("<tr>");
            let cols = `<th scope="col">Número Sorteado</th>`;
            newRow.append(cols);
            $("#products-table").append(newRow);
            newRow = $("<tr>");
            cols = `<td> ${dados.numeroSorteado} </td>`;
            newRow.append(cols);
            $("#products-table").append(newRow);
            newRow = $("<tr>");
            cols = `<th scope="col">Quantidade Ganhadores</th>`;
            newRow.append(cols);
            $("#products-table").append(newRow);
            newRow = $("<tr>");
            cols = `<td> ${dados.quantidadeGanhadores} </td>`;
            newRow.append(cols);
            $("#products-table").append(newRow);
            newRow = $("<tr>");
            cols = `<th scope="col">Valor Prêmio Total</th>`;
            newRow.append(cols);
            $("#products-table").append(newRow);
            newRow = $("<tr>");
            cols = `<td> ${dados.valorPremioTotal} </td>`;
            newRow.append(cols);
            $("#products-table").append(newRow);
            newRow = $("<tr>");
            cols = `<th scope="col">Valor Prêmio Resíduo</th>`;
            newRow.append(cols);
            $("#products-table").append(newRow);
            newRow = $("<tr>");
            cols = `<td> ${dados.valorPremioResiduo} </td>`;
            newRow.append(cols);
            $("#products-table").append(newRow);
        } else {
            alert("Erro ao consultar os dados do sorteio no servidor. Por favor, tente novamente mais tarde." + res.msg);
        }
    })
}