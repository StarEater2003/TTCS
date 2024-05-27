const mongoose = require('mongoose');

const mongoUri = 'mongodb+srv://admin:lmao@singlepage.ujckjma.mongodb.net/TTCS?retryWrites=true&w=majority&appName=SInglePage';

// Connect to MongoDB Atlas
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and model
const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  imageUrl: String,
});

const Product = mongoose.model('Product', productSchema, 'ProductList');

// Array of products to be added
const products = [
  {
    name: "LEGO NINJAGO 70652-Rồng Điện Stormbringer",
    price: "2.299.000đ",
    imageUrl: "https://www.dropbox.com/scl/fi/eq93su1d3yvbr0stekpvf/LEGO-NINJAGO-70652.jpg?rlkey=lc3w3cq7cq3xee7fwpq8mveak&st=ohyislyz&dl=1"
  },
  {
    name: "LEGO NINJAGO Sky Shark 70601-Phi cơ chiến đấu cá mập",
    price: "839.000đ",
    imageUrl: "https://www.dropbox.com/scl/fi/0hxigsekgz0i256yao3l9/do-choi-lego-ninjago-sky-shark-70601-1-600x600.jpg?rlkey=nc33631w3j63pxjsvgai563g5&st=rup74uw7&dl=1"
  },
  {
    name: "LEGO NINJAGO Master Wu Dragon 70734",
    price: "2.099.000đ",
    imageUrl: "https://www.dropbox.com/scl/fi/l6gsz65k3dqu6nkri3dce/Do-choi-Lego-Ninjago-Master-Wu-Dragon-70734.png?rlkey=f7iwvee6psu746hiyateaeq0q&st=w0ahrpd9&dl=1"
  },
  {
    name: "LEGO BIONICLE 71307-Thần nước Gali",
    price: "699.000đ",
    imageUrl: "https://www.dropbox.com/scl/fi/22gp4n9qyy20drl5702d2/do-choi-lego-bionicle-71307-1-1.png?rlkey=bp9xl0btsuzg3aookaxoh1joa&st=ftuqxr73&dl=1"
  },
  {
    name: "LEGO BIONICLE 70789-Thần đất Onua",
    price: "699.000đ",
    imageUrl: "https://www.dropbox.com/scl/fi/j5pac0yqm7frinqgwzaho/do-choi-lego-bionicle-70789-1.jpg?rlkey=1tf8hm6r9ussbru461pqjq7xs&st=1o4o9de6&dl=1"
  },
  {
    name: "LEGO BIONICLE 70787-Thần lửa Tahu",
    price: "699.000đ",
    imageUrl: "https://www.dropbox.com/scl/fi/2mh4p5p36dgmzzx1dhqx2/do-choi-lego-bionicle-70787.jpg?rlkey=djaoay65c82f0r6fv5tk066an&st=gopc217v&dl=1"
  },
  {
    name: "LEGO BIONICLE 70785-Thần đá Pohatu",
    price: "699.000đ",
    imageUrl: "https://www.dropbox.com/scl/fi/s2h1ba5tk3fmhe5p41hq8/do-choi-lego-bionicle-70785.jpg?rlkey=2vi1heos781y9bp1yfuzuwdqq&st=70ju8rc6&dl=1"
  },
  {
    name: "LEGO BIONICLE 70783-Hộ vệ lửa",
    price: "399.000đ",
    imageUrl: "https://www.dropbox.com/scl/fi/5f8xwwl2niuni6kvl6xgj/do-choi-lego-bionicle-70783-1-1024x1024.jpg?rlkey=mu4lr2swkcpwpkbrqx1kgz0yi&st=fow1270v&dl=1"
  },
  {
    name: "LEGO BIONICLE 70782-Hộ vệ băng",
    price: "399.000đ",
    imageUrl: "https://www.dropbox.com/scl/fi/u0tpyx5qze0ms513ce851/do-choi-lego-bionicle-70782.jpg?rlkey=wvgwkavsrtci0141vgek18icg&st=6jl0zoqi&dl=1"
  },
  {
    name: "Mô hình LBX ZENON MODEL BANDAI",
    price: "270.000đ",
    imageUrl: "https://www.dropbox.com/scl/fi/j3gu0rsn7eceaj9pii4yh/b052d25c-58e0-4bb0-aac8-8a3b1233f0e3.webp?rlkey=zx6an7zkgxzg3hwfzp1ov9cc2&st=lr8e4coa&dl=1"
  },
  {
    name: "Mô hình LBX DESTROYER MODEL BANDAI",
    price: "279.000đ",
    imageUrl: "https://www.dropbox.com/scl/fi/qemusa3em2fbs2zn8vhtu/ac84667c-24b3-4439-9b05-e2aa44f6fbb4.webp?rlkey=guj9mx9ek6qa6xcs4jnlko0h4&st=8tg3qcrt&dl=1"
  },
  {
    name: "Mô hình LBX GENERAL MODEL BANDAI",
    price: "279.000đ",
    imageUrl: "https://www.dropbox.com/scl/fi/7kv2r58mqtsdvbo67dyj8/ab2fcc09-ed84-4685-ab6d-ed12862fdd5b.webp?rlkey=8q033777zf2dmvjzxpqrqwyl0&st=j5tdq8mt&dl=1"
  }
];

Product.insertMany(products)
  .then(() => {
    console.log('Products added successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error adding products:', err);
    mongoose.connection.close();
  });
