let promises = [];
for(let i = 0; i < 151; i++) {
  promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i+1}`)
  .then(response => response.json()));
}

promises.all(promises)
.then(results => results.forEach(pokemonObj => {
  let pokemon = {
    name: pokemonObj.name,
    id: pokemonObj.id,
    image: pokemonObj.sprites.front_default,
    caught: false,
    nickname: ""}}
))
  card.querySelector(".caught-btn").addEventListner("click", () => {
    pokemon.caught = true;
  updatePokemon(pokemon, {
    "caught": pokemon.caught
  })
    .then((pokemonData) => {
      card.querySelector(".caught-btn").disabled = true;
      card.querySelector(".caught-btn").innerText = "Caught!"
card.style["background-color"] = "#caedcc";
    });
    
    

  });
  FormData.addEventListner("submit", (e) => {
    e.preventDefault();

updatePokemon(pokemon, {
  "nickname": e.target.nickname.value})
  .then((pokemonData)=> {
    setNickname(pokemonData, pokeNickname, form, removeHyperlink, addHyperlink);
  })
})
