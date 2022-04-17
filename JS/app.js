let pokemons = [];
let randomNumbers = randomArray();

function createCards() {
  let mainDivContainer = document.getElementById("full-container");
  let container = document.getElementById("grid-container");
  //let pokeCard = document.getElementById("poke-card");

  for (let i = 0; i < pokemons.length; i++) {
    let pokeCard = document.createElement("div");
    pokeCard.setAttribute("class", "poke-card");
    container.appendChild(pokeCard);

    //Name
    let name = document.createElement("a");
    let nodeName = document.createTextNode(pokemons[i].name);
    name.setAttribute(
      "href",
      "https://www.wikidex.net/wiki/" + pokemons[i].name
    );
    name.setAttribute("class", "poke-name");
    name.setAttribute("target", "_blank");
    name.appendChild(nodeName);
    pokeCard.appendChild(name);

    //Image
    let figureSprite = document.createElement("figure");
    figureSprite.setAttribute("class", "img-style");
    let sprite = document.createElement("img");
    sprite.src = pokemons[i].sprites.front_default;
    pokeCard.appendChild(figureSprite);
    figureSprite.appendChild(sprite);

    let types = document.createElement("p");
    pokeCard.appendChild(types);
    types.setAttribute("class", "poke-type");
    let nodeTypes = document.createTextNode(checkTypes(pokemons[i]));
    types.appendChild(nodeTypes);

    //Stat Div
    let statDiv = document.createElement("div");
    statDiv.setAttribute("class", "stats-container");
    pokeCard.append(statDiv);

    //txtStats Div
    let txtStatsDiv = document.createElement("div");
    txtStatsDiv.setAttribute("class", "txt-stats");
    statDiv.appendChild(txtStatsDiv);

    //Hp
    let hpTxt = document.createElement("p");
    txtStatsDiv.appendChild(hpTxt);
    let nodeHpTxt = document.createTextNode("HP:");
    hpTxt.appendChild(nodeHpTxt);

    //Atack
    let attackValueTxt = document.createElement("p");
    txtStatsDiv.appendChild(attackValueTxt);
    let nodeAttackTxt = document.createTextNode("Attack:");
    attackValueTxt.appendChild(nodeAttackTxt);

    //Defense
    let defenseValueTxt = document.createElement("p");
    txtStatsDiv.appendChild(defenseValueTxt);
    let nodeDefenseTxt = document.createTextNode("Defense:");
    defenseValueTxt.appendChild(nodeDefenseTxt);

    //Speed
    let speedValueTxt = document.createElement("p");
    txtStatsDiv.appendChild(speedValueTxt);
    let nodeSpeedTxt = document.createTextNode("Speed:");
    speedValueTxt.appendChild(nodeSpeedTxt);

    //NumStats Div
    let numStatsDiv = document.createElement("div");
    numStatsDiv.setAttribute("class", "num-stats");
    statDiv.appendChild(numStatsDiv);

    //Hp
    let hp = document.createElement("p");
    numStatsDiv.appendChild(hp);
    let nodeHp = document.createTextNode(pokemons[i].stats[0].base_stat);
    hp.appendChild(nodeHp);

    //Atack
    let attackValue = document.createElement("p");
    numStatsDiv.appendChild(attackValue);
    let nodeAttack = document.createTextNode(pokemons[i].stats[1].base_stat);
    attackValue.appendChild(nodeAttack);

    //Defense
    let defenseValue = document.createElement("p");
    numStatsDiv.appendChild(defenseValue);
    let nodeDefense = document.createTextNode(pokemons[i].stats[2].base_stat);
    defenseValue.appendChild(nodeDefense);

    //Speed
    let speedValue = document.createElement("p");
    numStatsDiv.appendChild(speedValue);
    let nodeSpeed = document.createTextNode(pokemons[i].stats[5].base_stat);
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
  try {
    return pokemon.types[0].type.name + "/" + pokemon.types[1].type.name;
  } catch {
    return pokemon.types[0].type.name;
  }
}

getPokemons();
