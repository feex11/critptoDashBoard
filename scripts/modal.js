const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");
const closeModalButton = document.querySelector("#close-modal");

const toggleModal = () => {
  [modal, fade].forEach((el) => el.classList.toggle("hide"));
};

const openModalButtons = document.querySelectorAll("#parent > div");

openModalButtons.forEach((div) => {

  div.addEventListener("click", () => {
    if (event.target.closest(".selecionarPeriodo")) {
      // Se o clique foi no select, não faz nada
      return;
    } else{
     toggleModal();
}
  });
});


[closeModalButton, fade].forEach((el) => {
  el.addEventListener("click", toggleModal);
});

