let banList = [102, 305, 404];
let currentUserId = +window.prompt("Enter your ID:");
if(banList.includes(currentUserId) === true){
  console.log("Доступ заблоковано! Ви в чорному списку!");
}else{
  console.log("Ласкаво просимо! Доступ надано.");
}
console.log(banList);

let allowedExtensions = ["OBJ", "FBX", "GLTF"];
let file = window.prompt("Enter your name file:");
let cleanExtension = file.trim().toUpperCase();
if(allowedExtensions.includes(cleanExtension)){
  console.log("Файл прийнято на сервер! Починаємо рендеринг...");
}else{
  console.log("Помилка: Формат не підтримується!");
}

let activePromocodes = ["SUMMER2026", "3DART", "BROCODE"];
let activefile = window.prompt("Введіть промокод на знижку:");
let editfile = activefile.trim().toUpperCase();
if(activePromocodes.includes(editfile)){
  console.log("Знижку активовано успішно!");
}else{
  console.log("Промокод недійсний або його термін дії закінчився.");
}

let availableServers = ["EUROPE", "USA", "ASIA"];
let region = window.prompt("Enter your  regin:");
let cleanregion = region.trim().toUpperCase();
if(availableServers.includes(cleanregion)){
  console.log("Підключення успішне! Пінг стабільний.");
}else{
  console.log("Помилка: Сервер у цьому регіоні недоступний або на технічному обслуговуванні.");
}


let adminNames = ["ADMIN", "MODERATOR", "SUPPORT"];
let entername = window.prompt("Enter your nickname:");
let checkname = entername.trim().toUpperCase();
if(adminNames.includes(checkname)){
  console.log("Цей нікнейм зайнятий системою! Оберіть інший.");
}else{
  console.log("Нікнейм вільний! Реєстрацію завершено.");
}

