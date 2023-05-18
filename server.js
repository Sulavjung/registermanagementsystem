const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
const db = new sqlite3.Database("./sqlitedb.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database successfully!");
});

app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get("/categories", (req, res) => {
  const sql = "SELECT DISTINCT category FROM products";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }
    const categories = rows.map((row) => row.category);
    res.json(categories);
  });
});

app.get("/products/category/:category", (req, res) => {
  const category = req.params.category;
  const sql = "SELECT * FROM products WHERE category = ?";
  db.all(sql, [category], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get("/products/search", (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Missing query parameter" });
  }
  const sql = "SELECT * FROM products WHERE name LIKE ?";
  const searchValue = `%${query}%`;
  db.all(sql, [searchValue], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// parse incoming requests with JSON payloads
app.use(bodyParser.json());

// parse incoming requests with urlencoded payloads
app.use(bodyParser.urlencoded({ extended: true }));

// define route to receive form data sent via HTTP POST method
app.post("/submit-data", (req, res) => {
  const { name, category, price, barcode, taxPercentage } = req.body;

  if (!name || !category || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql =
    "INSERT INTO products (name, category, price, barcode, taxrate) VALUES (?, ?, ?, ?, ?)";
  const values = [name, category, price, barcode, taxPercentage];

  db.run(sql, values, function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: `Product added with id ${this.lastID}` });
  });
});

app.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const { name, category, price, barcode, taxPercentage } = req.body;

  if (!name || !category || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql =
    "UPDATE products SET name = ?, category = ?, price = ?, barcode = ?, taxrate = ? WHERE id = ?";
  const values = [name, category, price, barcode, taxPercentage, id];

  db.run(sql, values, function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: `Product updated with id ${id}` });
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
