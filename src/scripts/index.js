// import { loadApiData } from "/src/lib/db.js";
import { createCharacterCardComponent } from "/src/lib/cards.js";

// // TODO: Filter attribute
//renderCharacters(getData());
export const renderCharacters = (data) => {
  console.log(data);
  Array.isArray(data) && data.length
    ? renderCharacterCards(data)
    : renderNoDataNotification();
};

const renderNoDataNotification = () => {
  console.log("renderNoDataNotification");
  document.querySelector("main").innerHTML = `
    <div class="ta-center">
      <h1>Sorry, mate - nothing to show here!</h1>
      <h3 class="mb-1">Looks like you didn't create any characters yet...</h3>
      <button onclick="location.href='pages/create.html';" class="btn green">Create character!</button>
      <button class="btn blue load-seed-data-btn">Load Seed Data</button>
    </div>
  `;
};

const renderFailedToloadApiDataNotification = () => {
  console.log("renderFailedToloadApiDataNotification");
  document.querySelector(
    "main"
  ).innerHTML = `<div class="ta-center"><h1>Failed to load seed data!</h1></div>`;
};

const renderCharacterCards = (data) => {
  console.log("renderCharacterCards");
  document.querySelector("main").innerHTML = "";
  data
    .map((cardData, index) => {
      return createCharacterCardComponent(cardData, index + 1);
    })
    .forEach((cardComponent) => {
      document.querySelector("main").append(cardComponent);
    });
};

const indexOnLoad = () => {
  const loadDataBtn = document.querySelector(".load-data-btn");
  if (loadDataBtn) {
    loadDataBtn.addEventListener("click", (e) => {
      fetch("https://rickandmortyapi.com/api/character")
        .then((results) => results.json())
        .then((data) => {
          renderCharacters(data.results);
        })
        .catch((error) => console.log(error));
    });
  }

  // handles all filters
  document.querySelectorAll(".character-filter").forEach((filter) => {
    let eventType = filter.name === "name" ? "input" : "change";
    filter.addEventListener(eventType, () => {
      fetch(compileApiUri())
        .then((results) => results.json())
        .then((data) => {
          renderCharacters(data.results);
        })
        .catch((error) => console.log(error));
    });
  });

  // nice: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  function compileApiUri() {
    let apiBaseUri = "https://rickandmortyapi.com/api/character";
    let apiFilterParams = new URLSearchParams({});

    document.querySelectorAll(".character-filter").forEach((filter) => {
      if (filter.value) {
        apiFilterParams.append(filter.name, filter.value);
      }
    });

    return apiFilterParams.toString()
      ? apiBaseUri + "/?" + apiFilterParams.toString()
      : apiBaseUri;
  }
};
window.addEventListener("load", indexOnLoad, false);
