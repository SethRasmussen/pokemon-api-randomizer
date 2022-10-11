require("dotenv").config();
const axios = require("axios");
let allPokemonOptions = [];
let typePokemon = [];
let genPokemon = [];
const errCallback = (err) => console.log(err);
module.exports = {
  shufflePokemon: (req, res) => {
    const genID = req.body.genID;
    const typeID = req.body.typeID;
    axios
      .get(`https://pokeapi.co/api/v2/type/${typeID}/`)
      .then(async (res1) => {
        typePokemon = res1.data.pokemon;
        typePokemon.map((poke) => (poke.id = poke.pokemon.url.split("/")[6]));
        await axios
          .get(`https://pokeapi.co/api/v2/generation/${genID}/`)
          .then(async (res2) => {
            genPokemon = res2.data.pokemon_species;
            genPokemon.map((gen) => (gen.id = gen.url.split("/")[6]));
          });

        allPokemonOptions = await fetchAllPokemon();

        selectedPokemonId = allPokemonOptions[getRandomNumber(allPokemonOptions.length)];
        // selectedPokemonId = 773

        pokemonUrl = `https://pokeapi.co/api/v2/pokemon-species/${selectedPokemonId}/`;
        axios.get(pokemonUrl).then(async (res3) => {
            let selectedPokemon = res3.data
            res.status(200).send(selectedPokemon);
        });

         
      });
  },
};

function fetchAllPokemon() {
  //   return Promise.all().then((response) => {
  let applicablePokemon = [];
 

  typePokemon.forEach((poke) => {
    current_id = poke.id;
    if (genPokemon.find((o) => o.id === poke.id)) {
      applicablePokemon.push(poke.id);
    }
  });
  console.log(applicablePokemon.length);
  return applicablePokemon;
}

const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
};
