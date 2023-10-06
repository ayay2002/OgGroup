async function fetchPokemonData() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=1021'; // Adjust the limit as needed
  try {
      const response = await fetch(url);
      const data = await response.json();
      return data.results;
  } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      return [];
  }
}
// Filter Pokémon list by name
async function fetchPokemonDetails(pokemonUrl) {
  try {
      const response = await fetch(pokemonUrl);
      return await response.json();
  } catch (error) {
      console.error('Error fetching Pokémon details:', error);
      return null;
  }
}
// Fetch Pokémon details and filter by type
async function searchByType() {
  const selectedType = document.getElementById("typeSelect").value;

  const pokemonList = await fetchPokemonData();
  const filteredPokemon = [];

  for (const pokemon of pokemonList) {
      const pokemonData = await fetchPokemonDetails(pokemon.url);

      // Check if the Pokémon has the selected type
      if (pokemonData.types.some(typeObj => typeObj.type.name === selectedType)) {
          filteredPokemon.push(pokemonData);
      }
  }

  displayResults(filteredPokemon);
}
// Display search results
function displayResults(results) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";
// Clear existing results
  if (results.length === 0) {
      resultsDiv.textContent = "No Pokémon found of the selected type.";
  } else {
      results.forEach(pokemon => {
          const div = document.createElement("div");
          div.classList.add("pokemon-card");
          
          const name = document.createElement("h2");
          name.textContent = pokemon.name;
          
          const types = document.createElement("p");
          types.textContent = "Types: " + pokemon.types.map(typeObj => typeObj.type.name).join(", ");
          
          const image = document.createElement("img");
          image.src = pokemon.sprites.front_default;
          image.alt = pokemon.name;
          
          div.appendChild(name);
          div.appendChild(types);
          div.appendChild(image);
          
          resultsDiv.appendChild(div);
      });
  }
}
//