const sqlite3 = require("sqlite3").verbose();
/////////////////////////////////////////////////////////////
///
///You can select a database based on your specific needs.///
///
/////////////////////////////////////////////////////////////
//const MongoClient = require('mongodb').MongoClient;
//const mysql = require('mysql');

class Database {
  constructor() {
    this.db = new sqlite3.Database("db.sqlite", (err) => {
      if (!err) {
        console.log("Connected to the SQLite database.");
        this.db.run(
          `CREATE TABLE IF NOT EXISTS links ( id INTEGER PRIMARY KEY AUTOINCREMENT, url text,shortUrl text UNIQUE)`,
          (err) => {
            if (!err) {
              console.log("Table created successfully !");
            } else {
              console.log("Table already exist!", err);
            }
          }
        );
      } else {
        console.log("An error occured when creating the DB");
      }
    });
  }

  async insert(url, short_url) {
    //Insert url with short code

    let insert = "INSERT INTO links (url, shortUrl) VALUES (?,?)";
    this.db.run(insert, [url, short_url], (error) => {
      if (!error) {
        console.log("Data Inserted Successfully");
      } else {
        console.log("Error trying to insert Data", error);
      }
    });
  }

  async getUrl(short_url) {
    //read url using short_url
    return new Promise(async (resolve, rejected) => {
      let find = "SELECT * FROM links WHERE shortUrl=?";
      await this.db.get(find, [short_url], (error, row) => {
        if (!error) {
          console.log("Got Data from DB Successfully : ", row);
          resolve(row);
        } else {
          console.log("Got error when trying to get Data from DB : ", error);
          rejected();
        }
      });
    });
  }
}

module.exports = Database;
