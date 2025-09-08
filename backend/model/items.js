const items = [
  { id: 1, 
    name: "Wireless Mouse", 
    price: 599, 
    category: "Electronics", 
    description: "Wireless mouse",
    image:"https://e-commerce-1-6nfx.onrender.com/public/mouse.jpg"},

  { id: 2, 
    name: "Keyboard", 
    price: 799, 
    category: "Electronics", 
    description: "Mechanical keyboard" ,
    image:"https://e-commerce-1-6nfx.onrender.com/public/images(1).jpeg"},

  { id: 3, 
    name: "Notebook", 
    price: 49, 
    category: "Stationery", 
    description: "100-page notebook",
    image:"https://e-commerce-1-6nfx.onrender.com/public/notebook.jpg" },

  { id: 4, 
    name: "Water Bottle",   
    price: 299, 
    category: "Accessories", 
    description: "Stainless steel bottle",
    image:"https://e-commerce-1-6nfx.onrender.com/public/bottle.jpeg" },

  { id: 5, 
    name: "Headphones", 
    price: 1299, 
    category: "Electronics", 
    description: "Noise-cancelling headphones",
    image:"https://e-commerce-1-6nfx.onrender.com/public/headphone.jpg" },
];


let cart = [];

module.exports = { items, cart };
