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
//evento do botão de procura por Pokemons
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
      getPokemons_localStorage();
    }
  });

// evento do botão que 'fecha' detalhe do pokemon
document
  .querySelector('[id="btn-close"]')
  .addEventListener("click", (event) => {
    event.preventDefault();
    getPokemons_localStorage();
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

const displayNoneEmMassa = (telaExibida) => {
  container_detalhes.style.display = telaExibida == 'detalhes' ? '' : 'none';
  container_card.style.display = telaExibida == 'cards' ? 'block' : 'none';
  container_paginaVazia.style.display = telaExibida == 'nada' ? 'flex' : 'none';
}

const getPokemons_localStorage = () => {
  var pokemosCapturados = JSON.parse(
    window.localStorage.getItem(localStotage_name)
  );

  if (pokemosCapturados != null) {
    gerarCardPokemos(pokemosCapturados);
  }else{
    displayNoneEmMassa('nada');
  }
};

//Desabilita a tela de possiveis telas anteriores e habilita a tela de detalhes
const montarHtml_detalhesPokemon = (pokemon) => {
  container_paginaVazia.style.display = "none";
  container_card.style.display = "none";
  container_detalhes.style.display = "block";

  var tipoPokemon = pokemon.types[0].type.name;

  setBackgroundColor_pokemonType(container_detalhes, tipoPokemon);

  montarHtml_detalhesPokemon_intro(pokemon);
  montarHtml_detalhesSobre(pokemon);
  montarHtml_detalhesEstatisticas(pokemon);
  montarHtml_detalhesEvolucao(pokemon);
};

const montarHtml_detalhesSobre = (sobre) => {
  montarHtml_detalhesSobre_heigth_Width(sobre);
  montarHtml_detalhesSobre_habilidades(sobre);
};

const montarHtml_detalhesSobre_habilidades = (sobre) => {
  var elemento_sobre = document.querySelector(
    '[id="pokemon-sobre-habilidades"]'
  );
  const html = `
  ${sobre.abilities
    .map((hab) =>
      hab.is_hidden
        ? `
  <div class="col">
    <button type="button" class="btn btn-secondary w-100" >${hab.ability.name}</button>
  </div>
  `
        : ""
    )
    .join("")}
  `;
  elemento_sobre.innerHTML = html;
};

const montarHtml_detalhesSobre_heigth_Width = (sobre) => {
  var elemento_sobre = document.querySelector(
    '[id="pokemon-sobre-heigth_Width"]'
  );
  const html = `
  <div>
  <span>Altura:</span>
  <span>${sobre.height * 10}cm</span>
</div>
<div>
  <span>Peso:</span>
  <span>${sobre.weight / 10}kg</span>
</div>
  `;
  elemento_sobre.innerHTML = html;
};
const montarHtml_detalhesEstatisticas = (pokemon) => {
  var v_hp =  v_defesa =  v_ataque = v_velocidade = 0;

  v_hp = pokemon.stats.find((i) => i.stat.name == "hp");
  v_defesa = pokemon.stats.find((i) => i.stat.name == "defense");
  v_ataque = pokemon.stats.find((i) => i.stat.name == "attack");
  v_velocidade = pokemon.stats.find((i) => i.stat.name == "speed");
  
  montarHtml_estatisticas_progressBar("HP","est-hp",v_hp.base_stat)
  montarHtml_estatisticas_progressBar("Defesa","est-defesa",v_defesa.base_stat)
  montarHtml_estatisticas_progressBar("Ataque","est-ataque",v_ataque.base_stat)
  montarHtml_estatisticas_progressBar("Velocidade","est-velocidade",v_velocidade.base_stat)

};

const montarHtml_detalhesEvolucao = (pokemon) => {
var listaPokemos_evolucao = [];
 montarEvolucaoPokemon(pokemon).catch(console.error)//ERRO
 .then((r) => {
   var ctrl_insecao = 0;
  getEvolutionChair(listaPokemos_evolucao,[r.chain],ctrl_insecao).then(()=>{
    montarHtml_ItemEvolucao(listaPokemos_evolucao);
  })
 });
};

const montarHtml_ItemEvolucao = (listaPokemos) => {
  const html = listaPokemos.reduce((accumulator) => {
    accumulator += `
    <div class="col-12 .col-sm-6 col-md-3">
    html
  </div>
    `;
    return accumulator;
  }, "");
}

const montarEvolucaoPokemon = async(pokemon) => {
  const especie_pokemon_fetch = await fetch(pokemon.species.url);
  if(especie_pokemon_fetch.status == 200) {
    var data_especie_pokemon = await especie_pokemon_fetch.json();
    const evolucao_pokemon = await fetch(data_especie_pokemon.evolution_chain.url);
    if(evolucao_pokemon.status == 200){
      var data_evolucao_pokemon = await evolucao_pokemon.json();
      return data_evolucao_pokemon;
    }
  }
    throw new Error(res.status); 
}

const getEvolutionChair = async(listaFinal_pokemon, chain_pokemon, ctrl_insecao) => {
  ctrl_insecao++;
  //ref.:https://stackoverflow.com/questions/39112862/pokeapi-angular-how-to-get-pokemons-evolution-chain
  
  //adiciona os dados interessados em um array de melhor acesso
  var nomePokemon = chain_pokemon[0].species.name;
  var idPokemon = 0;

  var resp_pokemon = await fetch("https://pokeapi.co/api/v2/pokemon/" + nomePokemon);
  if(resp_pokemon.status == 200){
    var data_pokemon = await resp_pokemon.json();
    idPokemon = data_pokemon.id;
  }else{
    throw new Error(res.status); 
  }

  await listaFinal_pokemon.push({ name: nomePokemon,id : idPokemon, ordem:ctrl_insecao });

  //valida se o pokemon atual possui evolucao posterior
  if (chain_pokemon[0].evolves_to.length > 0) {
    // no objeto de pokemon possui item 'evolves_to' identico ao anterior formando uma cadeia até o pokemon não possui uma evolucao
    await getEvolutionChair(listaFinal_pokemon,chain_pokemon[0].evolves_to,ctrl_insecao);
  } else {
   // listaFinal_pokemon.push(chain_pokemon[0].species.name);
    return 0;
  }
};

const montarHtml_detalhesPokemon_intro = (pokemon) => {
  //monta os itens de HTML que são a introdução ao pokemon que são Nome, numero e tipo
  var elemento_intro = document.querySelector('[id="pokemon-details_intro"]');
  const id_pokemon = pokemon.order.toString().padStart(3, "0");
  const html = `
  <div>
  <h1>${pokemon.species.name}#${id_pokemon}</h1>
  <div>
   ${pokemon.types
     .map((t) => `<span class="badge"> ${t.type.name}</span>`)
     .join(" ")}
  </div>
</div>
<img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id_pokemon}.png"" class="img-fluid" alt="imagem do pokemon ${
    pokemon.species.name
  }" />
  `;
  elemento_intro.innerHTML = html;
};

const montarHtml_estatisticas_progressBar = (titulo,id_elemento, valor) => {
  var elemento_estatisticas = document.querySelector(
    '[id="' + id_elemento + '"]'
  );
  const html = `
  <div class="row" style="padding-top:10px"> 
  <span class="col col-lg-3">${titulo}</span>
  <div class="progress col" style="padding-left: 0; margin: 4px;">
    <div  class="progress-bar ${valor > 60 ? 'bg-success': 'bg-warning'}" role="progressbar" aria-valuenow="${valor}" aria-valuemin="0" aria-valuemax="100" style="width: ${valor}%;">${valor}%</div>
  </div>
  </div>
  `;
  elemento_estatisticas.innerHTML = html;
};

const setBackgroundColor_pokemonType = (elemento, typePokemon) => {
  elemento.style.backgroundColor = colours[typePokemon];
};

getPokemons_localStorage();
