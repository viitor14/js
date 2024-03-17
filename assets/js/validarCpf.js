const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputCpf = e.target.querySelector("#cpf");
  const cpf = inputCpf.value.replace(/\D+/g, ""); // vai add em cpf somente numeros
  cpfArray = Array.from(cpf);
  let somaDosNumeros = 0;
  let primeiroDigito;
  let segundoDigito;

  const limpar = new LimparDisplay();
  limpar.inicia();

  verificarPrimeiroDigito(cpfArray);
  verificarSegundoDigito(cpfArray);

  setValidacao(primeiroDigito, segundoDigito);

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

  function LimparDisplay() {
    this.display = document.querySelector(".display");

    this.inicia = () => {
      this.capturaCliques();
    };

    this.capturaCliques = () => {
      document.addEventListener("click", (e) => {
        const el = e.target;

        if (el.classList.contains("button")) this.clear();
        return;
      });
    };

    this.clear = () => (this.display.value = "");
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
      console.log("CPF " + cpf + " VÁLIDO");
    } else {
      p.classList.add("cpfInvalido");
      msg = `CPF ${cpf} INVÁLIDO`;
      console.log("CPF " + cpf + " INVÁLIDO");
    }
    p.innerHTML = msg;
    resultado.appendChild(p);
  }
});
