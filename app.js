
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
const pokemonListItems = document.querySelectorAll('.list-item');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');

//Constants and Variables
const colorTypes = [
  'normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'
];

let prevUrl = null;
let nextUrl = null;

//Functions

const capitalize = (string) => string[0].toUpperCase() + string.substring(1);

const resetScreen = () => {
  mainScreen.classList.remove('hide');
  for (const type of colorTypes) {
    mainScreen.classList.remove(type);
  }
};

// get data right side screen

const fetchPokemonList = url => {
  fetch(url)
  .then( res => res.json())
  .then(data => {
    const { results, previous, next } = data;
    prevUrl = previous;
    nextUrl = next;
  
    for (let i = 0; i < pokemonListItems.length; i++) {
      const pokemonListItem = pokemonListItems[i];
      const resultData = results[i];
      
      if (resultData) {
        const { name, url } = resultData;
        const urlArr = url.split('/');
        const id = urlArr[urlArr.length - 2];
        pokemonListItem.textContent = id + '. ' + capitalize(name);
      } else {
        pokemonListItem.textContent = '';
      }
    }
  });
};

// get data left side screen

const fetchPokemonData = id => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
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
      pokemonId.textContent = '#' + data['id'].toString().padStart(3, '0');
      pokemonWeight.textContent = data['weight'];
      pokemonHeight.textContent = data['height'];
        
      pokemonFrontImage.src = data['sprites']['front_default'] || '';
      pokemonBackImage.src = data['sprites']['back_default'] || '';
    })
};

const handleLeftButtonClick = () => {
  if (prevUrl) {
    fetchPokemonList(prevUrl);
  }
};

const handleRightButtonClick = () => {
  if (nextUrl) {
    fetchPokemonList(nextUrl);
  }
};

const handleListItemClick = (e) => {
  if (!e.target) return;

  const listItem = e.target;
  if (!listItem.textContent) return;
  
  const id = listItem.textContent.split('.')[0];
  fetchPokemonData(id);
}

// event listeners

leftButton.addEventListener('click', handleLeftButtonClick)
rightButton.addEventListener('click', handleRightButtonClick);
for (const pokemonListItem of pokemonListItems) {
  pokemonListItem.addEventListener('click', handleListItemClick);
}

// inialize app

fetchPokemonList(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`);