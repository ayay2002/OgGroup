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
// if (cardNumber.split(",").length > 1) {
//   cardNumber = cardNumber.split(",")[0]
// }


    cardImage.setAttribute("data-number", cardNumber);

    // Add a click event listener to each card image
    cardImage.addEventListener("click", () => {
      fetchPokemonStatistics(cardNumber); // Fetch additional information
      window.location.href = "#poketop"
    });

    cardList.appendChild(cardImage);
  });
}

// Function to fetch Pokémon statistics from PokeAPI
async function fetchPokemonStatistics(cardNumber) {
  
  try {
    console.log(cardNumber)
    const pokeApiUrl = `https://pokeapi.co/api/v2/pokemon/${cardNumber[0]}`;
    const response = await fetch(pokeApiUrl);
    if (!response.ok) {
      throw new Error("Unable to fetch Pokémon statistics.");
    }

    const data = await response.json();

    const spriteElement = document.createElement("img");
    spriteElement.src = data.sprites.front_default;
    spriteElement.alt = `Sprite of ${data.name}`;
    spriteElement.setAttribute("height", "240px");

    //Update the size of the spriteElement based on window width
    const updateSpriteSize = document.createElement("img");


    // Create elements to display Pokémon information
    const nameElement = document.createElement("h2");
    nameElement.textContent = `Name: ${data.name}`;

    const typesElement = document.createElement("p");
    typesElement.textContent = `Types: ${data.types
      .map((type) => type.type.name)
      .join(", ")}`;

    const statsElement = document.createElement("p");
    statsElement.textContent = "Stats:";
    data.stats.forEach((stat) => {
      statsElement.textContent += `\n${stat.stat.name}: ${stat.base_stat}`;
    });

    // Clear the previous information if any
    infoContainer.innerHTML = "";

    // Append the elements to the info container
    infoContainer.appendChild(nameElement);
    infoContainer.appendChild(spriteElement);
    infoContainer.appendChild(typesElement);
    infoContainer.appendChild(statsElement);
  } catch (error) {
    console.error(error);
  }
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
