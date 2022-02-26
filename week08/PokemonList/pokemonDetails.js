const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pokemonName = urlParams.get('name');

let url = 'https://pokeapi.co/api/v2/';

let pokemonData = {};

const getPokemon = async name => {
  let response = await fetch(`${url}pokemon/${name}`);
  let pokemonData = await response.json();

  return pokemonData;
};

pokemonData = new Promise((res, rej) => {
  let result = getPokemon(pokemonName);
  res(result);
})
.then(response => {
  let domElement = document.querySelector('#pokemonDetails');
  pokemonData = response;

  domElement.innerHTML = `
  <img width="100" height="100" src="${pokemonData.sprites.other['official-artwork'].front_default}">
  <h1>Name: ${pokemonData.name}</h1>
  <p>Id: ${pokemonData.id}</p>
  <p>Weight: ${pokemonData.weight}</p>
  <p>Height: ${pokemonData.height}</p>
  <p>Type: ${pokemonData.types[0].type.name}</p>
  `
})