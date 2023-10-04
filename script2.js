document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const cardResult = document.getElementById("cardResult");

    searchButton.addEventListener("click", () => {
        const pokemonName = searchInput.value.trim().toLowerCase();
        if (pokemonName !== "") {
            fetch(`https://api.pokemontcg.io/v2/cards?q=name:${pokemonName}`)
                .then(response => response.json())
                .then(data => {
                    displayCard(data.data);
                })
                .catch(error => {
                    console.error("Error fetching data: ", error);
                    cardResult.innerHTML = "An error occurred while fetching data.";
                });
        }
    });

    function displayCard(cards) {
        if (cards.length > 0) {
            const card = cards[0];
            cardResult.innerHTML = `
                <h2>${card.name}</h2>
                <img src="${card.images.small}" alt="${card.name}">
            `;
        } else {
            cardResult.innerHTML = "Pokémon card not found.";
        }
    }
});

