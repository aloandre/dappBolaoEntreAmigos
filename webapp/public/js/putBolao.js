window.addEventListener('load', function () {
    putBolao();
});

function putBolao() {
    console.log("*** puting bolao ***");
    $.get("/encerrarBolao", function (res) {
        if (!res.error) {
            console.log("*** Views -> js -> bolao.js -> putBolao: ***", res.msg);
            alert("Bolão encerrado com sucesso");
        } else {
            alert("Não foi possível encerrar. O bolão esportivo, ainda, encontra-se aberto para apostas");
        }
    })
}