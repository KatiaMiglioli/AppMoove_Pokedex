const localStotage_name = "pokemosCapturados";

const container_detalhes = document.querySelector('[id="details"]'),
  container_card = document.querySelector('[id="cards"]'),
  item_card = document.querySelector('[id="item-card"]'),
  container_paginaVazia = document.querySelector('[id="pagina-vazia"]');

const colours = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

const getPokemonByName = (query) => {
  fetch("https://pokeapi.co/api/v2/pokemon/" + query)
    .then((response) => response.json())
    .then((data) => {
      console.log("COMEÇOU A PUTARIA!!!");
      montarHtml_detalhesPokemon(data);
    })
    .catch((err) => setHTML_pokemonNaoEncontrado(err));
};

const setHTML_pokemonNaoEncontrado = (err) => {
  console.error(err);
  const html_pokemonNaoEncontrado = `<p>NAO ACHOU NINGUEM TRUTA</p>`;
  inserirHTMLContainer(html_pokemonNaoEncontrado);
};

const gerarCardPokemos = (pokemons) => {
  const html = pokemons.reduce((accumulator) => {
    accumulator += `
    <div class="col-12 .col-sm-6 col-md-3">
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
  //Se encaixaria uma promisse?
  setTimeout(() => {
    container_paginaVazia.style.display = "none";
    inserirHTMLContainer(html);
  }, 1000);
};

const inserirHTMLContainer = (html) => {
  item_card.innerHTML = html;
};

document
  .querySelector('[id="search-button"]')
  .addEventListener("click", (event) => {
    event.preventDefault();
    var querySearchInput = document
      .querySelector('[id="search-input"]')
      .value.toLowerCase();
    if (querySearchInput.length) {
      getPokemonByName(querySearchInput);
    } else {
      //SEM ENTRADA
    }
  });

const setPokemons_localStorage = (pokemonAdicional) => {
  var arrayPokemons = Array();
  var pokemosCapturados = window.localStorage.getItem(localStotage_name);

  if (pokemosCapturados != null) {
    arrayPokemons = JSON.parse(pokemosCapturados);
  }
  arrayPokemons.push(pokemonAdicional);
  window.localStorage.setItem(localStotage_name, JSON.stringify(arrayPokemons));
};

const getPokemons_localStorage = () => {
  var pokemosCapturados = JSON.parse(
    window.localStorage.getItem(localStotage_name)
  );

  if (pokemosCapturados != null) {
    gerarCardPokemos(pokemosCapturados);
  }
};

document.querySelector('[id="apagar').addEventListener("click", (event) => {
  event.preventDefault();
  window.localStorage.clear();
  var pokemosCapturados = JSON.parse(
    window.localStorage.getItem(localStotage_name)
  );
  console.log("ESTORAGE VAZIO?", pokemosCapturados);
});
getPokemons_localStorage();

//Desabilita a tela de possiveis telas anteriores e habilita a tela de detalhes
const montarHtml_detalhesPokemon = (pokemon) => {
  container_paginaVazia.style.display = "none";
  container_card.style.display = "none";
  container_detalhes.style.display = "block";

  var tipoPokemon = pokemon.types[0].type.name;

  setBackgroundColor_pokemonType(container_detalhes, tipoPokemon);

  montarHtml_detalhesPokemon_intro(pokemon);
};

const montarHtml_detalhesPokemon_intro = (pokemon) => {
  //monta os itens de HTML que são a introdução ao pokemon que são Nome, numero e tipo
  var elemento_intro = document.querySelector('[id="pokemon-details_intro"]');
  console.log("POKEMON",pokemon)
  const html = `
  <div>
  <h1>${pokemon.species.name}#${pokemon.order}</h1>
  <div>
    <span class="badge">Grass</span>
    <span class="badge">Poison</span>
  </div>
</div>
<img src="001.png" class="img-fluid" alt="" />
  `;
  elemento_intro.innerHTML = html;
};

const setBackgroundColor_pokemonType = (elemento, typePokemon) => {
  elemento.style.backgroundColor = colours[typePokemon];
};

//

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
