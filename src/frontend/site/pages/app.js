// Chama o modal
var modal = document.getElementById("myModal");

// Chama o botao que abre o modal
var btn = document.getElementById("myBtn");

// Chama o botao que fecha o modal
var span = document.getElementsByClassName("close")[0];

// Abri o modal ao clicar no botão
btn.onclick = function() {
  modal.style.display = "block";
}

// Quando o usuario clicar na seta, fecha o modal
span.onclick = function() {
  modal.style.display = "none";
}

// Caso o usuario clicar fora do modal, o mesmo fecha
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}