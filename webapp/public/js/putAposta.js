window.addEventListener('load', function () {
    putAposta();
});

function putAposta() {
    console.log("*** getting aposta ***");
    $.get("/devolverAposta", function (res) {
        if (!res.error) {
            console.log("*** Views -> js -> bolao.js -> putAposta: ***", res.msg);
            alert(res.msg);
        } else {
            alert(res.msg);
        }
    })
}