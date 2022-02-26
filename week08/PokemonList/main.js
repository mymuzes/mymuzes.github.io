let pokemonList = [];
let url = 'https://pokeapi.co/api/v2/';

let currentPage = 1;
let offset = 0;

let pokemonContainer = document.querySelector('#pokemonContainer');

const getPokemonList = async () => {
    
    let response = await fetch(`${url}pokemon?limit=10&offset=${offset}`);
    let pokemonList = await response.json();
    
    return pokemonList.results;
}

const getPokemon = async name => {
    let response = await fetch(`${url}pokemon/${name}`);
    let pokemonData = await response.json();

    return pokemonData;
};

const renderPokemonList = async () => {

  for (let pokemon of pokemonList) {
      let pokemonData = await getPokemon(pokemon.name);

      pokemonContainer.innerHTML += `
        <div class="pokemon-card" id="${pokemonData.name}">
        <img width="100" height="100" src="${pokemonData.sprites.front_default}">
        <p> ${pokemonData.name} </p>
        </div>
        `
  }
}

getPokemonList()
  .then(
    async response => {
      pokemonList = response;

      await renderPokemonList();
    }
  )
  .then(() => {
    for (let pokemon of pokemonList) {
        let domElement = document.querySelector(`#${pokemon.name}`);
        domElement.addEventListener('click', () => {
          window.location.href = `./pokemonDetails.html?name=${pokemon.name}`;
        })
    }
  })

let pagesList = document.querySelector(`ul`);

for(let li of pagesList.children) {
  li.addEventListener('click', () => {
    let number = li.innerText;
    currentPage = number;
    pokemonList = [];
    pokemonContainer.innerHTML = '';

    if(currentPage == 1) offset = 0;
    if(currentPage == 2) offset = 10;
    if(currentPage == 3) offset = 20;
    if(currentPage == 4) offset = 30;
    if(currentPage == 5) offset = 40;
    if(currentPage == 6) offset = 50;

    console.log(offset);
    getPokemonList()
    .then(
      async response => {
        pokemonList = response;

        await renderPokemonList();
      }
    )
    .then(() => {
      for (let pokemon of pokemonList) {
          let domElement = document.querySelector(`#${pokemon.name}`);
          domElement.addEventListener('click', () => {
            window.location.href = `./pokemonDetails.html?name=${pokemon.name}`;
          })
      }
    })
  })
}