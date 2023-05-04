const formItem = document.querySelectorAll('.form_item');

function inserirBotao() {
    const [input, botao] = formItem;

    if (input.value) {
        form.classList.add('form_2');
        botao.removeAttribute('disabled');
    } else {
        form.classList.remove('form_2');
        botao.setAttribute('disabled', '');
    }
}

input.addEventListener('input', inserirBotao);