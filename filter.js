//.filter()
let rotations = [0, 45, 90, 180, 360];
const largeRotations = rotations.filter(isrotation);
function isrotation(value){
    return value >= 90;
};
console.log(largeRotations);

let players = ["Admin", "Max", "SpongeBob", "Leo", "Alex"];
const longNames = players.filter(value => value.length > 4);
console.log(longNames);

let models = [
  { title: "SciFi_Door", polys: 4500 },
  { title: "LowPoly_Tree", polys: 300 },
  { title: "Character_Hero", polys: 12000 },
  { title: "Rock", polys: 850 }
];
const heavyModels = models.filter(value => value.polys > 1000);
console.log(heavyModels);


let users = [
  { name: "Andriy", isOnline: true, isVerified: false },
  { name: "Olia", isOnline: true, isVerified: true },
  { name: "Ivan", isOnline: false, isVerified: true },
  { name: "Dasha", isOnline: true, isVerified: true }
];
const activeUsers = users.filter(value => value.isOnline === true && value.isVerified === true);
console.log(activeUsers);

let items = [
  { name: "SciFi_Door", polys: 4500 },
  { name: "LowPoly_Tree", polys: 300 },
  { name: "SciFi_Helmet", polys: 2500 },
  { name: "Medieval_Wall", polys: 850 }
];
const scifiItems = items.filter(isscufi);
function isscufi(value){
  return  value.name.includes("SciFi");
};
console.log(scifiItems);

let sceneObjects = [
  { name: "Main_Character", polys: 15000, isReady: true },
  { name: "Background_Dust", polys: 45, isReady: true },
  { name: "SciFi_Lamp", polys: 850, isReady: false },
  { name: "Monster_Boss", polys: 22000, isReady: true },
  { name: "Default_Cube", polys: 12, isReady: false }
];
const renderSelection = sceneObjects.filter(value => value.isReady === true && value.polys > 100);
console.log(renderSelection);
