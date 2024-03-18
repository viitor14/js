const input = document.querySelector(".input-Text");

document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const btn = document.querySelector(".button");
    btn.click();
  }
});

function receberValor() {
  const inputCpf = document.querySelector(".input-display");
  const cpf = inputCpf.value.replace(/\D+/g, ""); // vai add em cpf somente numeros
  cpfArray = Array.from(cpf);
  let somaDosNumeros = 0;
  let primeiroDigito;
  let segundoDigito;

  if (verificarInput(inputCpf.value)) {
    verificarPrimeiroDigito(cpfArray);
    verificarSegundoDigito(cpfArray);
    setValidacao(primeiroDigito, segundoDigito);
  } else {
    let msgError;
    if (inputCpf.length !== 11) {
      msgError = "Digite os 11 numeros do cpf";
    }
    formatoErrado(msgError);
  }

  LimparDisplay();

  function verificarInput(inputCpf) {
    if (!isNaN(inputCpf)) {
      if (inputCpf.length === 11) {
        return true;
      }
    } else {
      return false;
    }
  }

  function verificarPrimeiroDigito(cpfArray) {
    for (let i in cpfArray) {
      if (i > 8) break;
      somaDosNumeros += cpfArray[i] * (cpfArray.length - i - 1);
    }
    primeiroDigito = 11 - (somaDosNumeros % 11);
    primeiroDigito = String(primeiroDigito > 9 ? "0" : String(primeiroDigito));

    return primeiroDigito;
  }

  function verificarSegundoDigito(cpfArray) {
    somaDosNumeros = 0;
    for (let i in cpfArray) {
      if (i > 9) break;
      somaDosNumeros += cpfArray[i] * (cpfArray.length - i);
    }

    segundoDigito = 11 - (somaDosNumeros % 11);
    segundoDigito = String(segundoDigito > 9 ? 0 : segundoDigito);

    return segundoDigito;
  }

  function criarTag() {
    const p = document.createElement("p");
    return p;
  }

  function setValidacao(primeiroDigito, segundoDigito) {
    const resultado = document.querySelector("#resultado");
    resultado.innerHTML = "";

    const p = criarTag();

    let msg = `"`;
    if (cpfArray[9] === primeiroDigito && cpfArray[10] === segundoDigito) {
      msg = `CPF ${cpf} VÁLIDO`;
      p.classList.add("cpfValido");
    } else {
      p.classList.add("cpfInvalido");
      msg = `CPF ${cpf} INVÁLIDO`;
    }
    p.innerHTML = msg;
    resultado.appendChild(p);
  }

  function formatoErrado(msgError) {
    const resultado = document.querySelector("#resultado");
    resultado.innerHTML = "";

    const p = criarTag();
    let msg = "Informa somente numeros";

    if (!isNaN(inputCpf.value) && inputCpf.length !== 11) {
      msg = msgError;
    }
    p.classList.add("cpfInvalido");
    p.innerHTML = msg;
    resultado.appendChild(p);
  }
}

function LimparDisplay() {
  const input = document.querySelector(".input-display");
  input.value = "";
}
