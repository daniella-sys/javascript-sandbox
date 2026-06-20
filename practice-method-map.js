//.map()
let currentScales = [1, 3, 5, 8];
const doubleScales = currentScales.map(multiply);
function multiply(value,index,arr){
  return value * 2;
};
console.log(doubleScales);

let models = ["Well", "Bucket", "Roof"];
const taggedModels = models.map(push1);
function push1(value, index, arr){
  return "3D_" + value;
};
console.log(models, taggedModels);

let assets = [
  { name: "Well", price: 10 },
  { name: "Roof", price: 25 }
];
const expensiveAssets = assets.map(item => ({
  name: item.name,
  price: item.price * 2,

}));
console.log(assets, expensiveAssets);


let users = [
  { username: "ADMIN", level: 99 },
  { username: "BOB_SPONGE", level: 42 }
];
const checkedUsers = users.map(item => ({
  username: item.username,
  level: item.level,
  isPro: item.level > 50 // якщо level > 50, запишеться true, інакше false
}));
console.log(checkedUsers);


let cart = [
  { title: "Keyboard", qty: 1 },
  { title: "Mouse", qty: 3 }
];
const updatedCart = cart.map(item => ({
title: item.title,
qty: item.qty,
gift: item.qty > 2
}));
console.log(updatedCart);


let textures = ["Brick", "Wood", "Metal", "Glass"];
const textureLengths = textures.map(item => item.length);
console.log(textureLengths);

let menuItems = ["Home", "Gallery", "About"];
const jjnfn = menuItems.map(item => '<li>' + item + '</li>');
console.log(jjnfn);

let games = [
  { title: "Cyberpunk", price: 60 },
  { title: "Witcher", price: 40 }
];
const saleGames = games.map(item => ({
     title: item.title,
     price: item.price - 5,
}));
console.log(saleGames);

let ids = [101, 202, 303];
//перетворити масив на об'єкт
const hdbndo = ids.map(item => ({
  id: item,
}));
console.log(hdbndo);

let names = ["Max", "Leo"];
//перетворити на об'єкт
const obj1 = names.map(item => ({
    name: item,
}));
console.log(obj1);

let storeItems = [
  { name: "Well", price: 20 },
  { name: "Bucket", price: 5 }
];
let valueid = storeItems.map(item => ({
    title: "Model" + item.name,
    salePrice: item.price -2,
    isCheap: (item.price -2) < 10,
}));
console.log(valueid);


let myModels = [
  { name: "Well", polygons: 1200 },
  { name: "Roof", polygons: 450 }
];
let lll = myModels.map(item => ({
  fileName: item.name + ".blend",
  isOptimized: item.polygons < 1000,
  status: "ready",
}));
console.log(lll);

