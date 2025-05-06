const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");
const closeModalButton = document.querySelector("#close-modal");

const toggleModal = () => {
  [modal, fade].forEach((el) => el.classList.toggle("hide"));
};

const openModalButtons = document.querySelectorAll(".parent > div");

openModalButtons.forEach((div) => {

  div.addEventListener("click", () => {
    toggleModal();

  });
});


[closeModalButton, fade].forEach((el) => {
  el.addEventListener("click", toggleModal);
});

