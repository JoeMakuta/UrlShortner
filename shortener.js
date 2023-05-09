import Database from "./database.js"; // Assuming database.js is in the same directory

class Shortener {
  constructor() {
    this.db = new Database();
  }

  async shorten(url) {
    let shortUrl = this.generateShortUrl();
    const longUrl = await this.db.getLongUrl(url);
    if (longUrl) {
      return longUrl?.shortUrl;
    } else {
      this.db.insert(url, shortUrl);
      return shortUrl;
    }
  }

  generateShortUrl() {
    return Math.random().toString(36).substring(2, 7);
  }

  async getUrl(shortUrl) {
    const url = await this.db.getUrl(shortUrl);
    return url?.url;
  }
}

export default Shortener;
