document.getElementById("buttonsearch").onclick = function() {filtro()};

function filtro(){

    let estado = document.getElementById("valorEstado");
    var value = estado.options[estado.selectedIndex].value; //$("#valorEstado :selected").text();
    let cidade = $("#valorCidade").val() //$("#valorCidade :selected").text();

    console.log("estado : " + value + " cidade : "+ cidade);

    let xhr = new XMLHttpRequest();

    xhr.open("GET","/servico/filtro?cidade="+cidade+"?estado="+estado, true);

    xhr.responseType = 'json';

    xhr.send();

    xhr.onload = function() {
        let res = xhr.response;
        let saida = '';
        res.map(function(CARDS) {
            console.log(CARDS);
        });
        document.getElementById('cards').innerHTML = saida;
    };
};