//var list = document.getElementById("main")
//var dropdown= document.getElementById("PokemonType")
// var RarityType= document.getElementById("RarityType")
// var EvolutionType= document.getElementById("EvolutionType")
// var HPType= document.getElementById("HPType")
// var AttackType= document.getElementById ("AttackType")
//var checkboxpokemon =document.getElementById ("checkboxpokemon")

// Define the API endpoint and your API key (you need to obtain your own API key)
// Define the API endpoint and your API key (you need to obtain your own API key)
var loader;

function loadNow(opacity) {
  if (opacity <= 0) {
    displaycontent();
  } else {
    loader.style.opacity = opacity;
    window.setTimeout(function () {
      loadNow(opacity - 0.05);
    }, 50);
  }
}

function displaycontent() {
  loader.style.display = "none"; // Hide the loader
  document.getElementById("content").style.display = "block"; // Show the content
}

document.addEventListener("DOMContentLoaded", function () {
  loader = document.getElementById("loader");
  loadNow(1);
});

const apiUrl = "https://api.pokemontcg.io/v2/cards";
const apiKey = "a5277141-4d06-429e-9252-9160e8abfc7f";

// Select elements from the HTML
const typeSelect = document.getElementById("typeSelect");
const fetchButton = document.getElementById("fetchButton");
const cardList = document.getElementById("cardList");
const infoContainer = document.getElementById("pokemonInfo"); // Container to display Pokémon info

// Function to fetch Pokémon cards by type
async function fetchPokemonCardsByType(type) {
  document.getElementById("loader").style.display = "block"; // Show the loader
  try {
    const response = await fetch(`${apiUrl}?q=types:${type}`, {
      headers: {
        "X-Api-Key": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    document.getElementById("loader").style.display = "none"; // Hide the loader
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to display cards and add click event listeners
function displayCards(cards) {
  cardList.innerHTML = ""; // Clear the previous cards

  cards.forEach((card) => {
    const cardImage = document.createElement("img");
    cardImage.src = card.images.small;
    const cardNumber = card.nationalPokedexNumbers; // Get the card number
    cardImage.setAttribute("data-number", cardNumber);

    // Add a click event listener to each card image
    cardImage.addEventListener("click", () => {
      fetchPokemonStatistics(cardNumber); // Fetch additional information
    });

    cardList.appendChild(cardImage);
  });
}

// Function to fetch Pokémon statistics from PokeAPI
async function fetchPokemonStatistics(cardNumber) {
  try {
    const pokeApiUrl = `https://pokeapi.co/api/v2/pokemon/${cardNumber}`;
    const response = await fetch(pokeApiUrl);
    if (!response.ok) {
      throw new Error("Unable to fetch Pokémon statistics.");
    }

    const data = await response.json();

    // Display the retrieved information in the UI
    displayPokemonInfo(data);
  } catch (error) {
    console.error(error);
  }
}

// Function to display Pokémon information in the UI
function displayPokemonInfo(data) {
  // Clear the previous information if any
  infoContainer.innerHTML = "";

  // Create elements to display Pokémon information
  const nameElement = document.createElement("h2");
  nameElement.textContent = `Name: ${data.name}`;

  const typesElement = document.createElement("p");
  typesElement.textContent = `Types: ${data.types
    .map((type) => type.type.name)
    .join(", ")}`;

  // Add more information elements as needed

  // Append the elements to the info container
  infoContainer.appendChild(nameElement);
  infoContainer.appendChild(typesElement);
}

// Event listener for the "Fetch Cards" button
fetchButton.addEventListener("click", async () => {
  const selectedType = typeSelect.value;
  const cards = await fetchPokemonCardsByType(selectedType);
  if (cards) {
    displayCards(cards);
  }
});

// Populate the type select dropdown (optional)
const types = [
  "Colorless",
  "Darkness",
  "Dragon",
  "Fairy",
  "Fighting",
  "Fire",
  "Grass",
  "Lightning",
  "Metal",
  "Psychic",
  "Water",
];
types.forEach((type) => {
  const option = document.createElement("option");
  option.value = type;
  option.textContent = type;
  typeSelect.appendChild(option);
});
