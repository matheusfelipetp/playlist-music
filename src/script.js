import SearchMusic from "./modules/SearchMusic.js";
import { Playlist } from "./modules/Playlist.js";

const btnCreate = document.getElementById("btn-create");
const inputBox = document.querySelector(".input-box");
const playerMusic = document.getElementById("player");
const duration = document.querySelector(".duration");

btnCreate.addEventListener("click", (event) => {
  event.preventDefault();
  btnCreate.classList.add("btn-hidden");

  setTimeout(() => {
    inputBox.classList.add("input-show");
    playerMusic.classList.add("input-show");
    duration.classList.add("input-show");
    inputBox.style.display = "block";
    playerMusic.style.display = "block";
    duration.style.display = "block";
    btnCreate.style.display = "none";
  }, 800);
});

const playlist = new Playlist();
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const input = document.getElementById("inputMusic");
  await SearchMusic.buscaMusica(input.value);
  input.value = "";

  playlist.addMusic(SearchMusic.musicaAtual);
  listMusic(playlist);
  durationTotal();
});

const list = document.getElementById("musicList");

list.addEventListener("click", playMusic);
list.addEventListener("click", removeMusic);

function listMusic(playlist) {
  list.innerHTML = "";

  for (let key in playlist) {
    playlist[key].forEach((elem) => {
      const music = document.createElement("li");
      const musicTitle = document.createElement("h3");
      const artist = document.createElement("p");
      const btnPlay = document.createElement("button");
      const imgPlay = document.createElement("img");
      const btnRemove = document.createElement("button");
      const imgDelete = document.createElement("img");

      musicTitle.innerText = elem.name;
      artist.innerText = elem.artists[0].name;
      btnPlay.innerText = "Play";
      btnRemove.innerText = "X";
      btnPlay.classList.add("btn-play");
      btnPlay.setAttribute("id", "play");
      imgPlay.src = "./img/play.svg";
      imgPlay.alt = "Play";
      btnRemove.classList.add("btn-remove");
      btnRemove.setAttribute("id", "remove");
      imgDelete.src = "./img/delete.svg";
      imgDelete.alt = "Delete";

      btnPlay.appendChild(imgPlay);
      btnRemove.appendChild(imgDelete);
      music.append(musicTitle, artist, btnPlay, btnRemove);
      list.appendChild(music);
    });
  }
  return list;
}

const audio = document.querySelector("#player audio");

function playMusic(event) {
  const target = event.target;
  if (target.tagName === "BUTTON" && target.id === "play") {
    for (let key in playlist) {
      playlist[key].forEach((elem) => (audio.src = elem.url));
    }
    audio.play();
  }
}

function removeMusic(event) {
  const target = event.target;
  const music = target.closest("li");
  if (target.tagName === "BUTTON" && target.id === "remove") {
    for (let key in playlist) {
      playlist[key].splice(music, 1);
      audio.src = "";
      listMusic(playlist);
      durationTotal();
    }
  }
}

function durationTotal() {
  let total = 0;
  for (let key in playlist) {
    total = playlist[key].reduce((acc, act) => {
      return acc + act.duration;
    }, 0);
  }
  duration.innerText = `Duração total: ${(total / 1000 / 60)
    .toFixed(2)
    .replace(".", ":")}`;
}
