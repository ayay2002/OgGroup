<<<<<<< HEAD
var list = document.getElementById("main")
var dropdown= document.getElementById("PokemonType")
// var RarityType= document.getElementById("RarityType")
// var EvolutionType= document.getElementById("EvolutionType")
// var HPType= document.getElementById("HPType")
// var AttackType= document.getElementById ("AttackType")
var checkboxpokemon =document.getElementById ("checkboxpokemon")

function getApi() {
  var requestUrl = 'https://pokeapi.co/api/v2/pokemon';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.results);
      for (var i = 0; i < data.results.length; i++) {
        console.log(data.results[i].name)
        var name = document.createElement("div")
        //name.textContent = data.results[i].name;
        //list.appendChild(name)
      }
    });
=======
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
>>>>>>> main
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

<<<<<<< HEAD
// Define the API endpoint and your API key (you need to obtain your own API key)
const apiUrl = 'https://api.pokemontcg.io/v2/cards';
const apiKey = 'a5277141-4d06-429e-9252-9160e8abfc7f';

/// Select elements from the HTML
const typeSelect = document.getElementById('typeSelect');
const fetchButton = document.getElementById('fetchButton');
const cardList = document.getElementById('cardList');

// Function to fetch Pokémon cards by type
async function fetchPokemonCardsByType(type) {
  try {
      const response = await fetch(`${apiUrl}?q=types:${type}`, {
          headers: {
              'X-Api-Key': apiKey
          }
      });

      if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.data;
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

// Function to display cards
function displayCards(cards) {
  cardList.innerHTML = ''; // Clear the previous cards

  cards.forEach(card => {
      const cardImage = document.createElement('img');
      cardImage.src = card.images.small;
      var name=card.nationalPokedexNumbers;
      cardImage.setAttribute('data-number', name);
      cardList.appendChild(cardImage);
  });
}

// Event listener for the "Fetch Cards" button
fetchButton.addEventListener('click', async () => {
  const selectedType = typeSelect.value;
  const cards = await fetchPokemonCardsByType(selectedType);
  if (cards) {
      displayCards(cards);
=======
  for (const pokemon of pokemonList) {
      const pokemonData = await fetchPokemonDetails(pokemon.url);

      // Check if the Pokémon has the selected type
      if (pokemonData.types.some(typeObj => typeObj.type.name === selectedType)) {
          filteredPokemon.push(pokemonData);
      }
>>>>>>> main
  }

<<<<<<< HEAD
// Populate the type select dropdown (optional)
const types = ["Colorless", "Darkness", "Dragon", "Fairy", "Fighting", "Fire", "Grass", "Lightning", "Metal", "Psychic", "Water"];
types.forEach(type => {
  const option = document.createElement('option');
  option.value = type;
  option.textContent = type;
  typeSelect.appendChild(option);
});
  
=======
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
>>>>>>> main
