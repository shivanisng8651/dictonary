const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const historyButton = document.getElementById('history-btn');
const history = document.getElementById('history');
const result = document.getElementById('result');

let searches = JSON.parse(localStorage.getItem("searches")) || [];

searchButton.addEventListener("click", () => {
  const word = searchInput.value;
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((res) => res.json())
    .then((data) => {
      const definition = data[0].meanings[0].definitions[0].definition;
      audio = new Audio(data[0].phonetics[0].audio);
      const wordCard = `
      <div class="word">
        <div class="word-card">
          <h2>Word :${word}</h2>
          <button onclick="play()" class="fas fa-volume-up"></button>
          <audio id="audio" style="visibility:hidden;" controls src="${data[0].phonetics[0].audio}">${word}</audio>
          </div>
          <p>Defination: ${definition}</p>
        </div>
      `;
      result.innerHTML = wordCard;
      searches.push({ word: word, meaning: definition });
      localStorage.setItem("searches", JSON.stringify(searches));
    })
    .catch((error) => alert("OOPS....This word meaning not found,Try Another")
    );
});

historyButton.addEventListener("click", () => {
  history.innerHTML = "";
  history.style.display = "block";
  result.style.display = "none";
  searches.forEach((search) => {
    const wordCard = `
      <div class="word-card">
        <h2>${search.word}</h2>
        <p>${search.meaning}</p>
        <button class="delete-button" onclick="deleteWord('${search.word}')"><i class="fa-solid fa-trash"></button>
      </div>
    `;
    history.innerHTML += wordCard;
  });
});

function play(){
  var audio = document.getElementById("audio");
  audio.play();
}


function deleteWord(word) {
  searches = searches.filter((search) => search.word !== word);
  localStorage.setItem("searches", JSON.stringify(searches));
  historyButton.click();
}

