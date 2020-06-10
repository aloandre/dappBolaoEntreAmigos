window.addEventListener("load", function() {
    // resgata formulário de apost
    let form = document.getElementById("addAposta");

    // adiciona uma função para
    // fazer o login quando o 
    // formulário for submetido
    form.addEventListener('submit', addAposta);
})

function addAposta() {
    // previne a página de ser recarregada
    event.preventDefault();

    $('#load').attr('disabled', 'disabled');

    // resgata os dados do formulário
    let aposta = $("#aposta").val();

    // envia a requisição para o servidor
    $.post("/apostar", {aposta: aposta}, function(res) {
        
        console.log(res);
        // verifica resposta do servidor
        if (!res.error) {
            console.log("*** Views -> js -> bolao.js -> registrarAposta: ***", res.msg);            
            // limpa dados do formulário
            $("#aposta").val("");
           
            // remove atributo disabled do botao
            $('#load').attr('disabled', false);

            alert("Sua aposta foi cadastrada com sucesso");
        } else {
            alert(res.msg);
        }

    });
    
}