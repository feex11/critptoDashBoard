const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");
const closeModalButton = document.querySelector("#close-modal");

const toggleModal = () => {
  [modal, fade].forEach((el) => el.classList.toggle("hide"));
};


[closeModalButton, fade].forEach((el) => {
  el.addEventListener("click", toggleModal);
});

