//game
// --- БЛОК 1: МАСИВ ГРАВЦІВ (Кожен гравець — це окремий об'єкт) ---
let players = [
  {
    nickname: "Kiril",
    level: 17,
    isPremium: false
  },
  {
    nickname: "Olena",
    level: 3,
    isPremium: true
  },
  {
    nickname: "Taras",
    level: 9,
    isPremium: true
  }
];
// --- БЛОК 2: МАСИВ СКЛАДУ СЕРВЕРА (Кожен предмет — окремий об'єкт) ---
let inventory = [
  { title: "ax", type: "manual", polys: 2, power: 8 },
  { title: "pistol", type: "murderous", polys: 5, power: 6 },
  { title: "sniper-rifle", type: "murderous", polys: 10, power: 550 }, // Збільшимо силу, щоб перевірити античіт
  { title: "sword", type: "murderous", polys: 2, power: 7 }
];
console.log("🤖 СЕРВЕР ЗАПУЩЕНО: АНАЛІЗ ДАНИХ");
console.log("----------------------------------------");
//Гравці, які будуть обрані для секретних івенсів
const premium_person = players.filter(item => item.isPremium === true);
console.log(premium_person);
//Підняття рівня на 1📈
const upgradedPlayers = players.map(person11);
   function person11(item){
      item.level += 1;
      return item;
  };
console.log(upgradedPlayers);

//Обрахунок бойової сили кожного предмету з інвентаря
const countpover = inventory.reduce((accumulator, item) => {
  return item.power + accumulator;
}, 0);
console.log(countpover);

//вивід гравця
function dhbb(item){
    console.log(item.nickname + item.level + item.isPremium);
};
players.forEach(dhbb);

//Перевірка зброї
const checkweapon = inventory.some(item => item.power > 500);
if (checkweapon) {
    console.log(" Попередження про небезпеку! Знайдено чітера!");
} else {
    console.log(" Все в порядку!");
}
console.log("--- КІНЕЦЬ СЕРВЕРНОГО РЕПОРТУ ---");
