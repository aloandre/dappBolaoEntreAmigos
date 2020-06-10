window.addEventListener('load', function() {
    getQuantidadeExigidaApostadores();
});

function getQuantidadeExigidaApostadores() {
    console.log("*** getting quantidade exigida de apostadores ***");

    $.get("/quantidadeExigidaApostadores", function(res) {
        
        if (!res.error) {
            console.log("*** Views -> js -> bolao.js -> getQuantidadeExigidaApostadores: ***", res.msg);

            let quantidade = res.quantidade;
            let newRow = $("<tr>");
            let cols = `<td> ${quantidade.qtd} </td>`;
            
            newRow.append(cols);
            $("#products-table").append(newRow);

        } else {
            alert("Erro ao consultar a quantidade exigida de apostadores registradas do servidor. Por favor, tente novamente mais tarde. " + res.msg);
        }

    })
}