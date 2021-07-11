// import { seedData } from "/lib/seedData.js";

// read db
export function getData() {
  return JSON.parse(localStorage.getItem("characters")) || [];
}
// read Api
export function loadApiData() {
  // return JSON.parse(localStorage.getItem("characters")) || [];

  fetch("https://rickandmortyapi.com/api/character")
    .then((results) => results.json())
    .then((data) => {
      comsole.log(data.results);
      return data.results;

      // return apiData;
      //  data.results.map(character => {
      //      var div = document.createElement('div')
      //      div.classList.add('single-character')
      //      div.innerHTML = `<img src=${character.image} alt=${character.name} /><h3>${character.name}</h3>`
      //      document.getElementById('characters').append(div)
      //  })
    })
    .catch((error) => console.log(error));
}

// update db
export function setData(newData) {
  let data = getData();
  newData["id"] = Date.now();
  // newData["isBookmarked"] = false;
  data.push(newData);

  try {
    localStorage.setItem("characters", JSON.stringify(data));
  } catch (error) {
    alert(
      "There was an error while saving. Did you exceed your local storage quota?"
    );
  }
}

// export function bookmarkedcharacters() {
//   return getData().filter((character) => {
//     return character.isBookmarked;
//   });
// }

// export function loadApiData() {
//   try {
//     localStorage.setItem("characters", JSON.stringify(seedData));
//     return getData();
//   } catch (error) {
//     alert(
//       "There was an error while saving seed data. Either you exceeded your local storage quota or you didn't provide any seed data at all in lib/seedData.js..."
//     );
//     return [];
//   }
// }
