const Database = require('./database'); // Assuming database.js is in the same directory

class Shortener {
  constructor() {
    this.db = new Database();
  }

  async shorten(url) {
    return null;
  }

  generateShortUrl() {
    return null;
    
  }

  async getUrl(shortUrl) {
    return null;
  }
}

module.exports = Shortener;