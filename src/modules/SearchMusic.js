import { Music } from "./Music.js";

const SearchMusic = class {
  static musicaAtual = {};
  static async buscaMusica(nomeMusica) {
    if (nomeMusica.trim() === "") {
      alert("Digite o nome de alguma música.");
    }
    await fetch(`https://simple-spotify-api.herokuapp.com?search=${nomeMusica}`)
      .then((res) => res.json())
      .then((res) => {
        const musica = res.data[0];
        if (!musica) {
          alert("Música não encontrada!");
          this.musicaAtual = {};
        } else {
          this.musicaAtual = new Music(
            musica.id,
            musica.name,
            musica.artists,
            musica.duration_ms,
            musica.music_url
          );
        }
      });
  }
};

export default SearchMusic;
