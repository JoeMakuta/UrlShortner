const sqlite3 = require("sqlite3").verbose();
/////////////////////////////////////////////////////////////
///
///You can select a database based on your specific needs.///
///
/////////////////////////////////////////////////////////////
//const MongoClient = require('mongodb').MongoClient;
//const mysql = require('mysql');

class Database {
  constructor() {}

  async insert(url, short_url) {
    //Insert url with short code
  }

  async getUrl(short_url) {
    //read url using short_url
  }
}

module.exports = Database;
