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
        // name.textContent = data.results[i].name;
        // list.appendChild(name)
      }
    });
}
getApi()
// Dropdown for the Pokemon Type selector line 27 HTML

var pokemontype 
document.addEventListener("DOMContentLoaded",function(){
checkboxpokemon.addEventListener("change",
  function(){
pokemontype= dropdown.value
console.log (pokemontype)

  if(this.checked){
dropdown.style.display="block"
  }
  else{
    dropdown.style.display="none"
  }

})
document.addEventListener("change", function(){
  const selectedvalue=dropdown.value
  console.log(selectedvalue)
})
})

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
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
              <img src="${card.images.small}">
          `;
      } else {
          cardResult.innerHTML = "Pokémon card not found.";
      }
  }
});

// // Dropdown for the Rarity Type selector line 54 HTML
// var RarityType
// document.addEventListener("DOMContentLoaded",function(){
// checkboxpokemon.addEventListener("change",
// function(){
//   RarityType= dropdown.value
//   console.log (RarityType)

//   if(this.checked){
// dropdown.style.display="block"
//    }
//    else{
// dropdown.style.display="none"
//  }
// })

// Dropdown for the Evolution Type selector line 68 HTML

// var EvolutionType
// document.addEventListener("DOMContentLoaded",function(){
// checkboxpokemon.addEventListener("change",
//   function(){
// EvolutionTypeype= dropdown.value
// console.log (EvolutionType)

//   if(this.checked){
// dropdown.style.display="block"
//   }
//   else{
//     dropdown.style.display="none"
//   }
// })
// // Dropdown for the HP Type selector line 80 HTML
// var HPType
// document.addEventListener("DOMContentLoaded",function(){
// checkboxpokemon.addEventListener("change",
//   function(){
// HPType= dropdown.value
// console.log (HPType)

//   if(this.checked){
// dropdown.style.display="block"
//   }
//   else{
//     dropdown.style.display="none"
//   }
// })
// // Dropdown for the Attack Type selector line 93 HTML
// var AttackType
// document.addEventListener("DOMContentLoaded",function(){
// checkboxpokemon.addEventListener("change",
//   function(){
// AttackTypeype= dropdown.value
// console.log (AttackType)

//   if(this.checked){
// dropdown.style.display="block"
//   }
//   else{
//     dropdown.style.display="none"
//   }
