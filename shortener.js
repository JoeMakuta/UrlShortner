const Database = require("./database"); // Assuming database.js is in the same directory

class Shortener {
  constructor() {
    this.db = new Database();
  }

  async shorten(url) {
    let shortUrl = this.generateShortUrl();
    this.db.insert(url, shortUrl);
    return shortUrl;
  }

  generateShortUrl() {
    return Math.random().toString(36).substring(2, 7);
  }

  async getUrl(shortUrl) {
    await this.db.getUrl(shortUrl);
    return this.db.data?.url;
  }
}

module.exports = Shortener;
