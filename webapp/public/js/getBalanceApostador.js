window.addEventListener('load', function () {
    getBalanceApostador();
});

function getBalanceApostador() {
    console.log("*** getting balance apostador ***");

    $.get("/balanceApostador", function (res) {

        if (!res.error) {
            console.log("*** Views -> js -> bolao.js -> getBalanceApostador: ***", res.msg);
            let quantidade = res.quantidade;
            let newRow = $("<tr>");
            let cols = `<th scope="col">Quantidade</th>`;
            newRow.append(cols);
            $("#products-table").append(newRow);
            newRow = $("<tr>");
            cols = `<td> ${quantidade.qtd} </td>`;
            newRow.append(cols);
            $("#products-table").append(newRow);
        } else {
            alert("Erro ao consultar balance apostador registrada no servidor. Por favor, tente novamente mais tarde. " + res.msg);
        }

    })
}