const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;
const generatePokemonPromises = () =>
  Array(150)
    .fill()
    .map((_, index) =>
      fetch(getPokemonUrl(index + 1)).then((response) => response.json())
    );

const generateHTML = (pokemons) => {
  return pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map((typeInfo) => typeInfo.type.name);

    accumulator += `
    <div class="col-12 .col-sm-6 col-md-4 .col-xl-3">
    <div class="card text-center card-pokemon">
      <img src="001.png" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Pokemon</h5>
        <div>
          <span class="badge pokemon_badge">Grama</span>
          <span class="badge pokemon_badge">AGUA</span>
        </div>
      </div>
    </div>
  </div>
    `;
    return accumulator;
  }, "");
};

const insertPokemonsIntoPage = (pokemons) => {
  const ul = document.querySelector('[data-js="pokedex"]');
  ul.innerHTML = pokemons;
};

const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises).then(generateHTML).then(insertPokemonsIntoPage);

// ---- JS - DETALHES DO POKEMON ----
// const getPokemon = async (id) => {
//   const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
//   const res = await fetch(url);
//   const pokemon = await res.json();
//   console.log("POKEMON:",pokemon)
// };

// const showPokemonDetails = (pokemon) => {

//   getPokemon(1);
// };

// showPokemonDetails();
