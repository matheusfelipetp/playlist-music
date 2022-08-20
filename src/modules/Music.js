const Music = class {
  constructor(id, name, artists, duration, url) {
    this.id = id;
    this.name = name;
    this.artists = artists;
    this.duration = duration;
    this.url = url;
  }
};

export { Music };
