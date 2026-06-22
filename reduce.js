//.reduce()
let studyHours = [2, 3, 1, 4];
let totalHours = studyHours.reduce((accumulator, item) => {
     return item + accumulator;
}, 0); //початкове значення 0 якщо не вказати візьметься початкове значення масиву
console.log(totalHours);


let models = [
  { name: "Chair", polys: 350 },
  { name: "Table", polys: 500 },
  { name: "Lamp", polys: 150 }
];
//порахувати загальну кількість полігонів
let totalPolys = models.reduce((accumulator, item) => {
    return item.polys + accumulator;
}, 0);
console.log(totalPolys);


let cart = [
  { title: "SciFi_Pack", price: 45 },
  { title: "Texture_Substance", price: 15 },
  { title: "Character_Rig", price: 80 }
];
let totalPrice = cart.reduce((accumulator, item) => {
    return item.price + accumulator;
}, 0);
console.log(totalPrice);

let tags = ["blender", "3d", "scifi", "lowpoly"];
let tagString = tags.reduce((accumulator, item) => {
    return accumulator + " #" + item;;
}, "");
console.log(tagString);


let games = [
  { title: "Witcher 3", price: 40, onSale: true },
  { title: "Cyberpunk 2077", price: 60, onSale: false },
  { title: "GTA V", price: 30, onSale: true },
  { title: "RDR 2", price: 50, onSale: false }
];
const salegame = games.filter(value => value.onSale === true);
let totalsalegame = salegame.reduce((accumulator, item) => {
   return item.price + accumulator;
}, 0);
console.log(totalsalegame);
