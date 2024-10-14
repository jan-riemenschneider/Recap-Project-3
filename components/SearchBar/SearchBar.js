export default function SearchBar(onSubmit, suggestions) {
    const searchBar = document.createElement("form");
    searchBar.classList.add("search-bar");
  
    searchBar.innerHTML = `
      <input name='query' class='search-bar__input' type="text" placeholder="search characters">
      <button class='search-bar__button' type="submit"><img class='search-bar__icon' src="assets/magnifying-glass.png" alt=""></button>
      <ul class="suggestions-list" style="position: absolute; list-style: none; padding: 0; margin: 0; background: white;"></ul>
    `;
  
    const inputField = searchBar.querySelector(".search-bar__input");
    const suggestionsList = searchBar.querySelector(".suggestions-list");
  
    searchBar.addEventListener("submit", function (event) {
      event.preventDefault();
      onSubmit(inputField.value);
      suggestionsList.innerHTML = ""; 
    });
  
    inputField.addEventListener("input", function () {
      const query = inputField.value.toLowerCase();
  
      const filteredSuggestions = suggestions.filter(function (item) {
        return item.toLowerCase().includes(query);
      });
  
      updateSuggestionsList(filteredSuggestions);
    });
  
    function updateSuggestionsList(filteredSuggestions) {
      suggestionsList.innerHTML = "";
  
      filteredSuggestions.forEach(function (suggestion) {
        const listItem = document.createElement("li");
        listItem.textContent = suggestion;
       
  