var cartas = [
  {
    nome: "Bulbassauro",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png",
    atributos: {
      ataque: 7,
      defesa: 9,
      magia: 5
    }
  },
  {
    nome: "Charmander",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
    atributos: {
      ataque: 9,
      defesa: 7,
      magia: 6
    }
  },
  {
    nome: "Squirtle",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
    atributos: {
      ataque: 6,
      defesa: 5,
      magia: 9
    }
  },
  {
    nome: "Pikachu",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
    atributos: {
      ataque: 10,
      defesa: 5,
      magia: 8
    }
  },
  {
    nome: "Psyduck",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/054.png",
    atributos: {
      ataque: 6,
      defesa: 4,
      magia: 9
    }
  },
  {
    nome: "Mewtwo",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png",
    atributos: {
      ataque: 10,
      defesa: 10,
      magia: 10
    }
  }
];

var cartaMaquina;
var cartaJogador;

function sortearCarta() {
  document.getElementById("hidden").hidden = false;

  var numeroCartaMaquina = parseInt(Math.random() * cartas.length);
  cartaMaquina = cartas[numeroCartaMaquina];

  var numeroCartaJogador = parseInt(Math.random() * cartas.length);
  while (numeroCartaMaquina == numeroCartaJogador) {
    numeroCartaJogador = parseInt(Math.random() * cartas.length);
  }
  cartaJogador = cartas[numeroCartaJogador];
  console.log(cartaJogador);

  document.getElementById("btnSortear").disabled = true;
  document.getElementById("btnJogar").disabled = true;

  exibirCartaJogador();
  document.getElementById("form").scrollIntoView({ behavior: "smooth" });
}

function obtemAtributoSelecionado() {
  var radioAtributos = document.getElementsByName("atributo");

  for (var i = 0; i < radioAtributos.length; i++) {
    if (radioAtributos[i].checked == true) {
      return radioAtributos[i].value;
    }
  }
}

function jogar() {
  var atributoSelecionado = obtemAtributoSelecionado();
  var divResultado = document.getElementById("resultado");

  if (
    cartaJogador.atributos[atributoSelecionado] >
    cartaMaquina.atributos[atributoSelecionado]
  ) {
    htmlResultado = "<p class='resultado-final'>Você venceu!!!</p>";
  } else if (
    cartaMaquina.atributos[atributoSelecionado] >
    cartaJogador.atributos[atributoSelecionado]
  ) {
    htmlResultado = "<p class='resultado-final'>Você perdeu!</p>";
  } else {
    htmlResultado = "<p class='resultado-final'>Empate</p>";
  }
  divResultado.innerHTML = htmlResultado;

  // document.getElementById("btnJogar").disabled = true;
  document.getElementById("btnJogar").hidden = true;
  exibirCartaMaquina();

  document.getElementById("cartas").scrollIntoView({ behavior: "smooth" });

  divResultado.innerHTML +=
    "<button onclick='window.scroll(0,0); history.go(0)'>Jogar novamente</button>";
}

function exibirCartaJogador() {
  var divCartaJogador = document.getElementById("carta-jogador");
  divCartaJogador.style.backgroundImage = `url(${cartaJogador.imagem})`;
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
  var tagHTML = "<div id='opcoes' class='carta-status'>";

  var opcoesTexto = "";

  for (var atributo in cartaJogador.atributos) {
    opcoesTexto +=
      "<input type='radio' name='atributo' value='" +
      atributo +
      "'>" +
      atributo +
      " " +
      cartaJogador.atributos[atributo] +
      "<br/>";
  }
  var nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`;

  divCartaJogador.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";

  document
    .getElementsByName("atributo")
    .forEach((atributo) =>
      atributo.addEventListener(
        "click",
        () => (document.getElementById("btnJogar").disabled = false)
      )
    );
}

function exibirCartaMaquina() {
  var divCartaMaquina = document.getElementById("carta-maquina");
  divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.imagem})`;
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
  var tagHTML = "<div id='opcoes' class='carta-status'>";

  var opcoesTexto = "";

  for (var atributo in cartaMaquina.atributos) {
    opcoesTexto +=
      "<p type='text' name='atributo' value='" +
      atributo +
      "'>" +
      atributo +
      " " +
      cartaMaquina.atributos[atributo] +
      "</p>";
  }
  var nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`;

  divCartaMaquina.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";
}