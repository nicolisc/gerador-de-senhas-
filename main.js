function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        //tamanhoSenha = tamanhoSenha-1;
        tamanhoSenha--;
    }

    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        //tamanhoSenha = tamanhoSenha+1;
        tamanhoSenha++;
    }

    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

for(i=0; i < checkbox.length;i++){
    checkbox[i].onclick = geraSenha;
}

geraSenha();

function geraSenha(){
    let alfabeto = '';
    if (checkbox[0].cheked){
        alfabeto = alfabeto + letrasMaiusculas;
    }
    if (checkbox[1].cheked){
        alfabeto = alfabeto + letrasMinusculas;
    }
     if (checkbox[2].cheked) {
        alfabeto = alfabeto + numeros;
    }
    if (checkbox[3].cheked) {
        alfabeto = alfabeto + simbolos;
    }

    let senha = '';
    for(let i=0;i<tamanhoSenha;i++){
        let numeroAleatorio = Math.random()*alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        senha = senha + alfabeto[numeroAleatorio];

    }

    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
   
}
 
function classificaSenha(tamanhoAlfabeto) {
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log(entropia);
    forcaSenha.classList.remove('fraca', 'media', 'forte');
    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && entropia < 57) {
        forcaSenha.classList.add('media');
    } else if (entropia <= 35) {
        forcaSenha.classList.add('fraca');
    }
    const valorEntropia = document.querySelector('.entropia');
    valorEntropia.textContent = "Um computador pode levar até " + Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24)) + " dias para descobrir essa senha.";
}
