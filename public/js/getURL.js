//Possibilita passar para todas as urls o id do user, para ele nunca ser perdidio enquanto não utilizamos um token + cookies
let url = document.URL;

let isEmpreiteira = url.search("id_empreiteira=");//15 caracteres
let isMrv = url.search("id");//17 caracteres

//Verifica qual tipo de usuário é e envia para as tags <a> que possuem a classe chamada link o id do usuário no final do atributo href
if (isMrv > -1) {
    let tag = $('.link').attr('href');
    $('link').each(function(index, value){
        this.href = this.href+"&"+url.substring(isMrv, url.length);
        console.log(this.href);
    });
    //$('.link').attr('href', tag+"&"+url.substring(isMrv, url.length));
}else if (isEmpreiteira > -1) {
    let tag = $('.link').attr('href');
    $('.link').attr('href', tag+"&"+url.substring(isEmpreiteira, url.length));
};