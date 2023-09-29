var list = document.getElementById("main")

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
        name.textContent = data.results[i].name;
        list.appendChild(name)
      }
    });
}
getApi()
