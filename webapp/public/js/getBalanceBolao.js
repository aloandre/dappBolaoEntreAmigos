window.addEventListener('load', function () {
    getBalanceBolao();
});

function getBalanceBolao() {
    console.log("*** getting balance bolão ***");

    $.get("/balanceBolao", function (res) {

        if (!res.error) {
            console.log("*** Views -> js -> bolao.js -> getBalanceBolao: ***", res.msg);
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
            alert("Erro ao consultar a balance bolão registrada no servidor. Por favor, tente novamente mais tarde. " + res.msg);
        }

    })
}