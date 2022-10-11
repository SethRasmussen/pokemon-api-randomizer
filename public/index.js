let typeSelect = document.querySelector("#type");
let genSelect = document.querySelector("#generation");
let shuffleButton = document.querySelector("#shuffleButton");
let addButton = document.querySelector("#add-Btn");
let shuffledPokemon = {};
let currentSelectedType = "";
let myTeamArr = [];
let myTeamList = document.getElementById("my-team-container");
let removeBtn = document.querySelector("#removeBtn");

let imgUrl = "";

// e is element could be pokemon if wanted
const myTeamUrl = "http://localhost:4000/api/myteam";

const shufflePokemonSite = () => {
  const genID = genSelect.value;
  const typeID = typeSelect.value;
  let pokeData = {
    genID: genID,
    typeID: typeID,
  };

  axios
    .post(myTeamUrl, pokeData)
    .then((res) => {
      shuffledPokemon = res.data;
      currentSelectedType = typeSelect.options[typeSelect.selectedIndex].text;

      shuffledPokemon.type = currentSelectedType;
      shuffledPokemon.imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${shuffledPokemon.id}.png`;
      appendPokemon(shuffledPokemon.name);
      appendPokemonImg(shuffledPokemon.imgUrl);
    })
    .catch(errCallback);
};

const appendPokemonImg = (imgUrl) => {
  let imgContainer = document.getElementById("pokeImg");
  imgContainer.innerHTML = `<img src='${imgUrl}' class="pokeImg">`;
};
const appendPokemon = (text) => {
  document.getElementById("randomPokemonPick").textContent = text;
};

const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

const addToTeam = () => {
  let alertText = document.getElementById("randomPokemonPick").textContent;
  if (alertText === "Shuffle to receive a Pokemon") {
    return alert("Please shuffle for a pokemon first");
  }
  myTeamArr.push(shuffledPokemon);
  loopingMyTeam();
};

const loopingMyTeam = () => {
  //clear list elements here
  myTeamList.innerHTML = "";
  myTeamArr.forEach((pokemon, i) => {
    let habitat = pokemon.habitat;
    let generation = pokemon.generation.name
    let convertedGen = ""
    if (generation === "generation-i") {
     convertedGen = "1"
    } else if (generation === "generation-ii"){
     convertedGen = "2"
    } else if (generation === "generation-iii"){
      convertedGen = "3"
    } else if (generation === "generation-iv"){
      convertedGen = "4"
    } else if (generation === "generation-v"){
      convertedGen = "5"
    } else if (generation === "generation-vi"){
      convertedGen = "6"
    } else if (generation === "generation-vii"){
      convertedGen = "7"
    } else if (generation === "generation-viii"){
      convertedGen = "8"
    } else {
      console.log("Error")
    }
  
    console.log(convertedGen)

    if (habitat == null) {
      habitat = { name: "Unknown" };
    }
      myTeamList.innerHTML += `
    <div class="my-team-card">
      <div>
        <img src='${pokemon.imgUrl}' class="pokeImg1">
        <h3 class="selected-pokemon-name"> ${pokemon.name} </h3> 
        <button id="remove-button"onclick="removeMyTeamPokemon(${i})">X</button>
      </div>
      <div class="poke-stats-list">
        <ul> 
          <li class='gen-list'>Generation: ${convertedGen}</li> 
          <li>Type: ${pokemon.type}</li> 
          <li>Habitat: ${habitat.name}</li>  
        </ul>  
      </div>
    </div>`;
  });

};

const removeMyTeamPokemon = (i) => {
  myTeamArr.splice(i, 1);
  loopingMyTeam();
};
const errCallback = (err) => console.log(err);

addButton.addEventListener("click", addToTeam);
shuffleButton.addEventListener("click", shufflePokemonSite);

