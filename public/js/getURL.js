console.log(document.URL);
let url = document.URL;

let isEmpreiteira = url.search("id_empreiteira=");//15 caracteres
let isMrv = url.search("id_administrador=");//17 caracteres

console.log(isMrv);
console.log(url.substring(isMrv, url.length));

let query;

if (isMrv > -1) {
    let a = $('.link').attr('href');
    $('.link').attr('href', a+"&"+url.substring(isMrv, url.length));
    //$(".link").attr('name', url+"&id_administrador="+query);
    //conaole.log($(".link"));
}else if (isEmpreiteira > -1) {
    query = url.substring(isMrv+15, url.length);
    console.log(query);
};