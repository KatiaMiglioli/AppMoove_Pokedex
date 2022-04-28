const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  console.log("POKEMON:",pokemon)
};

const showPokemonDetails = (pokemon) => {
  getPokemon(1);
};

showPokemonDetails();
