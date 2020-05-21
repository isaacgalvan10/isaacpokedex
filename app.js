
// DOM Objects
const mainScreen = document.querySelector('.main-screen');
const pokemonName = document.querySelector('.poke-name');
const pokemonId = document.querySelector('.poke-id');
const pokemonFrontImage = document.querySelector('.poke-front-image');
const pokemonBackImage = document.querySelector('.poke-back-image');
const pokemonTypeOne = document.querySelector('.poke-type-one');
const pokemonTypeTwo = document.querySelector('.poke-type-two');
const pokemonWeight = document.querySelector('.poke-weight');
const pokemonHeight = document.querySelector('.poke-height');

//Constants and Variables
const colorTypes = [
  'normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'
];

//Functions

const capitalize = (string) => string[0].toUpperCase() + string.substring(1);

const resetScreen = () => {
  mainScreen.classList.remove('hide');
  for (const type of colorTypes) {
    mainScreen.classList.remove(type);
  }
}

const fetchPokemon = () => {
  const url = `https://pokeapi.co/api/v2/pokemon/1`;
  fetch(url)
    .then( res => res.json())
    .then( data => {
      resetScreen();

      const dataTypes = data['types'];
      const dataFirstType = dataTypes[0]['type']['name'];
      const dataSecondType = dataTypes[1];
      pokemonTypeOne.textContent = capitalize(dataFirstType);
      if (dataSecondType) {
        pokemonTypeTwo.classList.remove('hide');
        pokemonTypeTwo.textContent = capitalize(dataSecondType['type']['name']);
      } else {
        pokemonTypeTwo.textContent = '';
        pokemonTypeTwo.classList.add('hide');
      }
      mainScreen.classList.add(dataFirstType);
      pokemonName.textContent = capitalize(data['name']);
      pokemonId.textContent = data['id'];
      pokemonWeight.textContent = data['weight'];
      pokemonHeight.textContent = data['height'];
      
      pokemonFrontImage.src = data['sprites']['front_default'] || '';
      pokemonBackImage.src = data['sprites']['back_default'] || '';
    });
}

fetchPokemon();