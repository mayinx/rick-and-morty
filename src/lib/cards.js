export function createCharacterCardComponent(cardData, index) {
  const parent = document.createElement("section");
  parent.className = `character card ${cardData.status.toLowerCase()}`;
  parent.id = cardData.id;
  parent.innerHTML = `
    <p class="character__avatar-wrapper">
      <img id="character__avatar" class="avatar" src="${cardData.image}" alt="Character Avatar Image">
    </p>
    <div class="character__meta">
      <h2>${cardData.name}</h2>
      <div>Character ID#${cardData.id}</div>
      <div>Species: ${cardData.species}</div>
      <div>Status: ${cardData.status}</div>
    </div>`;

  return parent;
}
