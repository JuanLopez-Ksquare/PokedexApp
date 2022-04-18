let pokemons = [];
let randomNumbers = randomArray();

function createCards() {

  const container = document.getElementById("grid-container");

  for (let i = 0; i < pokemons.length; i++) {
    const pokeCard = document.createElement("div");
    pokeCard.setAttribute("class", "poke-card");
    container.appendChild(pokeCard);

    //Name
    const name = document.createElement("a");
    const nodeName = document.createTextNode(pokemons[i].name);
    name.setAttribute(
      "href",
      "https://www.wikidex.net/wiki/" + pokemons[i].name
    );
    name.setAttribute("class", "poke-name");
    name.setAttribute("target", "_blank");
    name.appendChild(nodeName);
    pokeCard.appendChild(name);

    //Image
    const figureSprite = document.createElement("figure");
    figureSprite.setAttribute("class", "img-style");
    const sprite = document.createElement("img");
    sprite.src = pokemons[i].sprites.front_default;
    pokeCard.appendChild(figureSprite);
    figureSprite.appendChild(sprite);

    const types = document.createElement("p");
    pokeCard.appendChild(types);
    types.setAttribute("class", "poke-type");
    const nodeTypes = document.createTextNode(checkTypes(pokemons[i]));
    types.appendChild(nodeTypes);

    //Stat Div
    const statDiv = document.createElement("div");
    statDiv.setAttribute("class", "stats-container");
    pokeCard.append(statDiv);

    //txtStats Div
    const txtStatsDiv = document.createElement("div");
    txtStatsDiv.setAttribute("class", "txt-stats");
    statDiv.appendChild(txtStatsDiv);

    //Hp
    const hpTxt = document.createElement("p");
    txtStatsDiv.appendChild(hpTxt);
    const nodeHpTxt = document.createTextNode("HP:");
    hpTxt.appendChild(nodeHpTxt);

    //Atack
    const attackValueTxt = document.createElement("p");
    txtStatsDiv.appendChild(attackValueTxt);
    const nodeAttackTxt = document.createTextNode("Attack:");
    attackValueTxt.appendChild(nodeAttackTxt);

    //Defense
    const defenseValueTxt = document.createElement("p");
    txtStatsDiv.appendChild(defenseValueTxt);
    const nodeDefenseTxt = document.createTextNode("Defense:");
    defenseValueTxt.appendChild(nodeDefenseTxt);

    //Speed
    const speedValueTxt = document.createElement("p");
    txtStatsDiv.appendChild(speedValueTxt);
    const nodeSpeedTxt = document.createTextNode("Speed:");
    speedValueTxt.appendChild(nodeSpeedTxt);

    //NumStats Div
    const numStatsDiv = document.createElement("div");
    numStatsDiv.setAttribute("class", "num-stats");
    statDiv.appendChild(numStatsDiv);

    //Hp
    const hp = document.createElement("p");
    numStatsDiv.appendChild(hp);
    const nodeHp = document.createTextNode(pokemons[i].stats[0].base_stat);
    hp.appendChild(nodeHp);

    //Atack
    const attackValue = document.createElement("p");
    numStatsDiv.appendChild(attackValue);
    const nodeAttack = document.createTextNode(pokemons[i].stats[1].base_stat);
    attackValue.appendChild(nodeAttack);

    //Defense
    const defenseValue = document.createElement("p");
    numStatsDiv.appendChild(defenseValue);
    const nodeDefense = document.createTextNode(pokemons[i].stats[2].base_stat);
    defenseValue.appendChild(nodeDefense);

    //Speed
    const speedValue = document.createElement("p");
    numStatsDiv.appendChild(speedValue);
    const nodeSpeed = document.createTextNode(pokemons[i].stats[5].base_stat);
    speedValue.appendChild(nodeSpeed);
  }
}

const getPokemonAPI = async (id) => {
  let data;
  try {
    const url = "https://pokeapi.co/api/v2/pokemon/" + id.toString();
    data = await fetch(url);
    data = await data.json();
    return data;
  } catch {
    data = "undefined";
    return data;
  }
};

const getPokemons = async () => {
  for (let i = 0; i < 12; i++) {
    const res = await getPokemonAPI(randomNumbers[i]);
    pokemons.push(res);
  }
  createCards();
};

function randomArray() {
  let randomNumbers = [];

  for (let i = 0; i < 12; i++) {
    let number = Math.ceil(Math.random() * (898 - 1) + 1);

    if (randomNumbers.includes(number)) {
      i--;
    } else {
      randomNumbers.push(number);
    }
  }

  return randomNumbers;
}

function checkTypes(pokemon) {

  if(pokemon.types.length === 2) {
    return pokemon.types[0].type.name + "/" + pokemon.types[1].type.name;
  } else{
    return pokemon.types[0].type.name;
  }
}

const getSearchPokemon = async () => {
  const searchPokemon = document.getElementById("searchBox").value.toLowerCase();
  const container = document.getElementById("grid-container");
  container.innerHTML = "";

  const res = await getPokemonAPI(searchPokemon);

  if (res === "undefined") {
    const message = "Theres no such Pokemon";
    alert(message);
  } else {
    pokemons = [];
    pokemons.push(res);
    createCards();
  }
};

function searchPokemon() {
  if (document.getElementById("searchBox").value === "") return;
  getSearchPokemon();
}

function resetAndGetNewPokemons() {
  const container = document.getElementById("grid-container");
  document.getElementById("searchBox").value = "";

  //Reseting the arrays
  randomNumbers = [];
  pokemons = [];

  randomNumbers = randomArray();
  container.innerHTML = "";
  getPokemons();
}

getPokemons();
