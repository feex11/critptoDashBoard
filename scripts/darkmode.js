document.getElementById("darkmode").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");

    const botao = document.getElementById("divDark");

    if (document.body.classList.contains("dark-mode")) {
        botao.innerHTML = ``;
        botao.innerHTML = `<i class="fa-solid fa-lightbulb"></i>`;
    } else {
        botao.innerHTML = ``;
        botao.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    }
});

