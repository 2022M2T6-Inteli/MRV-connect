const ulrUF = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
const uf = document.getElementById("uf");
console.log(uf)
const cidade = document.getElementById("cidade");


window.addEventListener('load', async ()=>{
    const request = await fetch(ulrUF);
    const response = await request.json();
    const uf = document.getElementById("uf");

    const options = document.createElement("optgroup");
    
    response.forEach(function(uf){
        options.innerHTML += '<option>'+ uf.sigla +'</option>'
        
        
    })
    console.log(uf);
    uf.append(options);
    
    
})

if(uf){
    uf.addEventListener('change', async function(){
        const ulrCidades = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+uf.value+'/municipios';
        const request = await fetch(ulrCidades);
        const response = await request.json();
    
        let options = '<option value="Cidade">Cidade</option>';
        response.forEach(function(cidades){
            options += '<option>'+cidades.nome+'</option>'
        })
    
        cidade.innerHTML =  options 
    
    })
}

