import { CharacterCard } from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBar = document.querySelector('[data-js="search-bar"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

let maxPage = 20;
let pageIndex = 1;
let searchQuery = "";

async function fetchCharacters(pageIndex, query = "") {
  let url = `https://rickandmortyapi.com/api/character/?page=${pageIndex}`;
  if (query) {
    url = `https://rickandmortyapi.com/api/character/?name=${query}&page=${pageIndex}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    cardContainer.innerHTML = "";

    if (data.results) {
      data.results.forEach((character) => {
        const card = CharacterCard(character);
        cardContainer.append(card);
      });
    } else {
      cardContainer.innerHTML = `<p>No characters found</p>`;
    }

    maxPage = data.info.pages;
    updatePaginationDisplay(pageIndex);
  } catch (error) {
    cardContainer.innerHTML = `<p>Error fetching characters: ${error.message}</p>`;
  }
}

fetchCharacters(pageIndex);

searchBar.addEventListener("input", (event) => {
  searchQuery = event.target.value.trim().toLowerCase();

  if (searchQuery) {
    pageIndex = 1;
    fetchCharacters(pageIndex, searchQuery);
  } else {
    fetchCharacters(pageIndex);
  }
});

prevButton.addEventListener("click", () => {
  if (pageIndex > 1) {
    pageIndex--;
    fetchCharacters(pageIndex, searchQuery);
    updatePaginationDisplay(pageIndex);
  }
});

nextButton.addEventListener("click", () => {
  if (pageIndex < maxPage) {
    pageIndex++;
    fetchCharacters(pageIndex, searchQuery);
    updatePaginationDisplay(pageIndex);
  }
});

function updatePaginationDisplay(pageIndex) {
  pagination.textContent = `${pageIndex} / ${maxPage}`;
}
