const combinacoes = [
  [0, 1, 2], // linha 1
  [3, 4, 5], // linha 2
  [6, 7, 8], // linha 3
  [0, 3, 6], // coluna 1
  [1, 4, 7], // coluna 2
  [2, 5, 8], // coluna 3
  [0, 4, 8], // diagonal esqueda direita
  [2, 4, 6], // diagonal direita esquerda
];

const playerXSymbol = "X";
let playerXPlays = 0;
const playerOSymbol = "O";
let playerOPlays = 0;
let isPlayerX = true;

// - Crie uma função que receba de quem foi o turno e deve checar se houve algum ganhador
// - Deve passar por cada index do array de combinações
// - Checar se cada posição dentro do array contem o texto do jogador da vez ( X ou O )
// - Somar um ponto para cada posição que conter o texto do jogador da vez dentro do array
// - Checar se os pontos são maiores ou iguais a 3
// - Alterar texto com o id player para o jogador ganhador caso tenha feito 3 pontos
// - Caso nenhum jogador tenha feito 3 pontos e ja tenha checado todas as combinações, deve-se alterar o texto do player para "Deu velha"
// #3
function checkWinner() {
  for (let i = 0; i < combinacoes.length; i += 1) {
    let pointsX = 0;
    let pointsY = 0;
    for (let j = 0; j < combinacoes[i].length; j += 1) {
      if (
        document.getElementById(combinacoes[i][j]).innerText === playerXSymbol
      ) {
        pointsX += 1;
      } else if (
        document.getElementById(combinacoes[i][j]).innerText === playerOSymbol
      ) {
        pointsY += 1;
      }
    }
    if (pointsX === 3) {
      document.getElementById("player").innerText = "Player X ganhou";
      for (let j = 0; j <= 8; j += 1) {
        const divCells = document.getElementById(j);
        // eslint-disable-next-line no-use-before-define
        divCells.removeEventListener("click", play);
        return;
      }
    } else if (pointsY === 3) {
      document.getElementById("player").innerText = "Player O ganhou";
      for (let k = 0; k <= 8; k += 1) {
        const divCells = document.getElementById(k);
        // eslint-disable-next-line no-use-before-define
        divCells.removeEventListener("click", play);
        return;
      }
    }
  }
  if (playerXPlays + playerOPlays === 9) {
    document.getElementById("player").innerText = "Deu velha";
  }
}

// - Crie a função Jogar que deve receber o evento do click
//   - Deve guardar o alvo clicado
//   - Checar de qual jogador é o turno
//   - Alterar o texto com o `id player` para o texto jogador da vez ( X ou O )
//   - Alterar o texto do alvo clicado para o texto do jogador da vez ( X ou O )
//   - Alterar o turno dos jogadores
// #2:

const playerID = document.getElementById("player");
function play(event) {
  const clickedCell = event.target.id;
  const cellID = document.getElementById(clickedCell);

  if (isPlayerX !== true) {
    playerID.innerHTML = "Vez do jogador X";
    cellID.innerHTML = playerOSymbol;
    playerOPlays += 1;
    // remove event listener from clicked cell
    cellID.removeEventListener("click", play);
    // console.log("Player O", playerOCells);
    isPlayerX = true;
    checkWinner();
  } else {
    playerID.innerHTML = "Vez do jogador O";
    cellID.innerHTML = playerXSymbol;
    playerXPlays += 1;
    // remove event listener from clicked cell
    cellID.removeEventListener("click", play);
    // console.log("player X", playerXCells);
    isPlayerX = false;
    checkWinner();
  }
}

// - Crie uma função para gerar de maneira dinâmica `9 divs`
//   - Deve conter a `classe celula`
//   - Deve conter o `id` numerados de 0 a 8
//   - Deve ser filho da `div grid`
//   - Deve conter um evento de click chamando uma função com o nome Jogar
// #1:
const divGrid = document.querySelector(".grid");
function generateCells() {
  for (let i = 0; i < 9; i += 1) {
    const divCells = document.createElement("div");
    divCells.className = "celula";
    divCells.id = i;
    divCells.addEventListener("click", play);
    divGrid.appendChild(divCells);
  }
}
generateCells();

// - Crie uma função que verifique se deu empate
//   - Deve passar por todas as células verificando se não estão vazias
//   - Alterar o texto com o id player para Empatou
// - Crie uma função para resetar o jogo
//   - Deve limpar todas as celulas
// - Adicione um evento de click ao botão com o id reset passando a função resetar
// #4:
const resetButton = document.getElementById("reset");
function reset() {
  for (let i = 0; i <= 8; i += 1) {
    const divCells = document.getElementById(i);
    divCells.innerHTML = "";
    divCells.addEventListener("click", play);
  }
  playerID.innerHTML = "Vez do jogador X";
  playerXPlays = 0;
  playerOPlays = 0;
  isPlayerX = true;
}
resetButton.addEventListener("click", reset);
