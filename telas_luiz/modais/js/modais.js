const openModalButton = document.querySelector("#open-modal");
const closeModalButton = document.querySelector("#close-modal");
const closeModalButton2 = document.querySelector("#modal-header");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

const toggleModal = () => {
  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
};

[openModalButton, closeModalButton, closeModalButton2, fade].forEach((el) => {
  el.addEventListener("click", () => toggleModal());
});

