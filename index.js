const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(bodyParser.json());

// Hardcoded products
const products = [
  { id: 1, name: "Bottle", price: 250 },
  { id: 2, name: "Bag", price: 500 },
  { id: 3, name: "Notebook", price: 150 },
];

// GET /products - return all products
app.get("/products", (req, res) => {
  res.json(products);
});

// POST /cart - calculate total price
app.post("/cart", (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ error: "productId and quantity are required" });
  }

  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const totalPrice = product.price * quantity;
  res.json({
    productId: product.id,
    name: product.name,
    quantity,
    totalPrice
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
