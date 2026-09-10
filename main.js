
const numeroSenha = document.querySelector('#tamanho-val');
let tamanhoSenha = 12;
const slider = document.querySelector('#slider');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('input[type="checkbox"]');
const indicadorForca = document.querySelector('#indicador-forca');
const entropiaTexto = document.querySelector('#entropia-texto');

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@#$%^&*()_+-=[]{}|;:,.<>?';
slider.oninput = function () {
    tamanhoSenha = this.value;
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
};
checkbox.forEach(box => box.onclick = geraSenha);

function geraSenha() {
    let alfabeto = '';
    if (checkbox[0].checked) alfabeto += letrasMaiusculas;
    if (checkbox[1].checked) alfabeto += letrasMinusculas;
    if (checkbox[2].checked) alfabeto += numeros;
    if (checkbox[3].checked) alfabeto += simbolos;

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        if (alfabeto.length === 0) break; // Evita erro se nada estiver selecionado
        let numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[numeroAleatorio];
    }

    campoSenha.value = senha;
    calculaEntropia(alfabeto.length);
}

function calculaEntropia(tamanhoAlfabeto) {
    if (tamanhoAlfabeto === 0 || campoSenha.value === '') {
        entropiaTexto.textContent = 'Selecione pelo menos um tipo de caractere.';
        indicadorForca.className = 'forca fraca';
        return;
    }
    const entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    indicadorForca.classList.remove('fraca', 'media', 'forte');
    if (entropia < 40) {
        indicadorForca.classList.add('fraca');
    } else if (entropia < 65) {
        indicadorForca.classList.add('media');
    } else {
        indicadorForca.classList.add('forte');
    }
    const combinacoes = Math.pow(tamanhoAlfabeto, tamanhoSenha);
    entropiaTexto.textContent = `Um computador pode levar anos para quebrar essa senha. Combinações possíveis: ${combinacoes.toExponential(2)}`;
}
geraSenha();
