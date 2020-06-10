window.addEventListener('load', function() {
    getQuantidadeApostas();
});

function getQuantidadeApostas() {
    console.log("*** getting quantidade apostas registradas ***");

    $.get("/quantidadeApostas", function(res) {
        
        if (!res.error) {
            console.log("*** Views -> js -> bolao.js -> getQuantidadeApostas: ***", res.msg);

            let quantidade = res.quantidade;
            let newRow = $("<tr>");
            let cols = `<td> ${quantidade.qtd} </td>`;
            
            newRow.append(cols);
            $("#products-table").append(newRow);

        } else {
            alert("Erro ao consultar a quantidade de apostas registradas do servidor. Por favor, tente novamente mais tarde. " + res.msg);
        }

    })
}