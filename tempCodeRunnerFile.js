const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const mongoUri = 'mongodb+srv://admin:lmao@singlepage.ujckjma.mongodb.net/TTCS?retryWrites=true&w=majority&appName=SInglePage';

// Connect to MongoDB Atlas
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  imageUrl: String,
});

const Product = mongoose.model('Product', productSchema, 'ProductList');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).send('Error retrieving products');
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
