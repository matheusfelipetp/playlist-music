const Playlist = class {
  constructor() {
    this.musics = [];
  }
  addMusic(music) {
    const find = this.musics.find((elem) => elem.id === music.id);

    if (!find && music.id !== undefined) {
      this.musics.push(music);
    } else if (find) {
      alert("A música já foi adicionada a playlist!");
    }
  }
};

export { Playlist };
