document.body.innerHTML = `
  <div class="container">
  <h1>AUtitude - Leitor de textos com voz!</h1>

  <h3>Escolha o tipo de voz!</h3>
  <select></select>

  <button class="btn btn-toggle">Inserir texto</button>

  <label for="switch"> Dark Mode
    <input type="checkbox" id="switch" />
  </label>


  <div class="text-box">
    <div class="close">X</div>

    <textarea placeholder="Insira o texto a ser lido..."></textarea>
    <button class="btn" id="read">Ler texto</button>
  </div>
</div>

<menu></menu>

<nav></nav>

<article></article>

<main></main>

<nav></nav>
  `;

const main = document.querySelector("main");
const buttonInsertText = document.querySelector(".btn-toggle");
const buttonReadText = document.querySelector("#read");
const divTextBox = document.querySelector(".text-box");
const closeDivTextBox = document.querySelector(".close");
const selectElement = document.querySelector("select");
const textArea = document.querySelector("textArea");

const humanExpressions = [
  { img: "./img/drink.png", text: "Estou com sede" },
  { img: "./img/angry.png", text: "Estou bravo" },
  { img: "./img/grandma.png", text: "Quero a vovó" },
  { img: "./img/outside.png", text: "Quero ir lá fora" },
  { img: "./img/sad.png", text: "Estou triste" },
  { img: "./img/scared.png", text: "Estou assustado" },
  { img: "./img/school.png", text: "Quero ir para a escola" },
  { img: "./img/tired.png", text: "Estou cansado" },
  { img: "./img/food.png", text: "Estou com fome" },
  { img: "./img/happy.png", text: "Estou feliz" },
  { img: "./img/home.png", text: "Quero ir para casa" },
  { img: "./img/hurt.png", text: "Estou machucado" },
  { img: "./img/sleep.png", text: "Estou com sono" },
  { img: "./img/restroom.png", text: "Quero ir ao banheiro" },
  { img: "./img/pipa.png", text: "Quero soltar pipa" },
  { img: "./img/hugg.png", text: "Quero um abraço" },
];

const utterance = new SpeechSynthesisUtterance();

const setTextMessage = (text) => {
  utterance.text = text;
};

const speakText = () => {
  speechSynthesis.speak(utterance);
};

const setVoice = (event) => {
  const selectedVoice = voices.find(
    (voice) => voice.name === event.target.value
  );
  utterance.voice = selectedVoice;
};

const addExpressionBoxesIntoDOM = () => {
  main.innerHTML = humanExpressions
    .map(
      ({ img, text }) => `
   <div class= "expression-box" data-js="${text}"> 
      <img src="${img}" alt="${text}" data-js="${text}">
      <p class="info" data-js="${text}">${text}</p>
   </div>
  `
    )
    .join("");
};
addExpressionBoxesIntoDOM();

const setStyleOfClickedDiv = (dataValue) => {
  const div = document.querySelector(`[data-js="${dataValue}"]`);
  div.classList.add("active");
  setTimeout(() => {
    div.classList.remove("active");
  }, 1000);
};

main.addEventListener("click", (event) => {
  const clickedElement = event.target;
  const clickedElementText = clickedElement.dataset.js;
  const clickedElementTextMustBeSpoken = ["img", "p"].some(
    (elementName) =>
      clickedElement.tagName.toLowerCase() === elementName.toLowerCase()
  );

  if (clickedElementTextMustBeSpoken) {
    setTextMessage(clickedElementText);
    speakText();
    setStyleOfClickedDiv(clickedElementText);
  }
});

const insertOptionElementsIntoDOM = (voices) => {
  selectElement.innerHTML = voices.reduce((accumulator, { name, lang }) => {
    accumulator += `<option value="${name}">${lang}' | ${name}</option>`;
    return accumulator;
  }, "");
};

const setUtteranceVoice = (voice) => {
  utterance.voice = voice;
  const voiceOptionElement = selectElement.querySelector(
    `[value="${voice.name}"]"`
  );
  voiceOptionElement.selected = true;
};

const setPTBRVoices = (voices) => {
  const googleVoice = voices.find(
    (voice) => voice.name === "Google português do Brasil"
  );
  const microsoftVoice = voices.find(
    (voice) => voice.name === "Microsoft Maria Desktop - Portuguese(Brazil)"
  );

  if (googleVoice) {
    setUtteranceVoice(googleVoice);
  } else if (microsoftVoice) {
    ssetUtteranceVoice(microsoftVoice);
  }
};

let voices = [];

speechSynthesis.addEventListener("voiceschanged", () => {
  voices = speechSynthesis.getVoices();

  insertOptionElementsIntoDOM(voices);
  setPTBRVoices(voices);
});

buttonInsertText.addEventListener("click", () => {
  divTextBox.classList.add("show");
});

closeDivTextBox.addEventListener("click", () => {
  divTextBox.classList.remove("show");
});

selectElement.addEventListener("change", setVoice);

buttonReadText.addEventListener("click", () => {
  setTextMessage(textArea.value);
  speakText();
});

const nav = document.createElement("nav");

nav.innerHTML = `
      <div classname="links">    
          <a href="#Home">Home</a>
      
          <a href="Sobre Nós">Sobre Nós</a>

          <a href="#Contato">Contato</a>
        </div>

  
`;

const container = document.querySelector(".container");

container.before(nav);

const footer = document.createElement("footer");

const upButton = document.createElement("button");

upButton.id = "upButton";

upButton.innerHTML = `
  <img src="./scrolltop.png" /> 
`;

footer.appendChild(upButton);

document.body.appendChild(footer);

upButton.addEventListener("click", () => {
  window.scrollTo(0, 0);
});

const $html = document.querySelector("html");
const $checkbox = document.querySelector("#switch");

$checkbox.addEventListener("change", function () {
  $html.classList.toggle("dark-mode");
});
