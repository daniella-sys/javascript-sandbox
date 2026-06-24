//.forEach
let sceneObjects = [
  { name: "Main_Character", isReady: true },
  { name: "SciFi_Lamp", isReady: false },
  { name: "Rock", isReady: true }
];
sceneObjects.forEach(item => {
  console.log("Об'єкт:" + item.name + "|" + "Готовий:" + item.isReady);
});

let readyCount = 0;
sceneObjects.forEach(item => {
     if(item.isReady === true){
      item.isReady++
     }else{
     }
});
console.log(readyCount);

let products = [
  { name: "SciFi_Gun", price: 25 },
  { name: "Space_Helmet", price: 15 },
  { name: "Alien_Monster", price: 40 }
];
products.forEach(item => {
   item.price -= 5;
});
console.log(products);


let modelNames = [];
products.forEach(item => {
    modelNames.push(item.name);
    modelNames.push(item.price);
});
console.log(modelNames);

const checkproduc = products.some(item => item.price < 15);
console.log(checkproduc);
