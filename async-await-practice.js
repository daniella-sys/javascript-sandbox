//asyns/await and Promise
 function checkWeaponAsync(power){
  return new Promise((resolve, reject) => {
     setTimeout(() => {
        if(power > 500){
          reject("Помилка: Виявлено читерську зброю!");
        }else{
          resolve("Успішно: Зброя пройшла перевірку");
        }
     }, 1500);
  });
}

async function runServerCheck(){
     console.log("Скан системи запущено...");
      let result = await checkWeaponAsync(300);
      console.log(result);
}
runServerCheck();
 
function loadTexture(){
      return new Promise((resolve, reject) => {
         setTimeout(() => {
          resolve("Текстура_Меча_SciFi.png"); //відбудеться після того як спливе час
      }, 2000);
   });
 }
async function initScene(){
  console.log("Завантаження текстури розпочато...");
  let texture = await loadTexture();
  console.log(texture);
  }
initScene();


function loadModels(){
  return new Promise((resolve, reject) => {
     setTimeout(() => {
       resolve(["sword.fbx", "shield.fbx", "armor.fbx"]);
     }, 1000);
  });
}

async  function showInventory(){
  console.log("Отримання списку моделей...");
  let modelsList = await loadModels();
  console.log(modelsList);

}
showInventory();

function fetchPlayerName(id){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
     if(id === 1){
      resolve("Kiril");
     }else if(id === 2){
      resolve("Olena");
     }else{
      resolve('Невідомий гость');
     }
    }, 1200);
  });
}

async function welcomePlayer(){
   console.log("Сервер: Пошук гравця в базі...");
   let playerName = await fetchPlayerName(2);
   console.log('Ласкаво просимо,' + playerName);
}
welcomePlayer();


function getPlayerLevel(nickname){
  return new Promise((resolve, reject) => {
     setTimeout(() => {
       if(nickname === "Kiril"){
        resolve(18); //його рівень
       }else{
        resolve(1);
       }
     }, 1000);
  });
}

function getWeaponByLevel(level){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(level > 10){
        resolve("Різака Края (Sci-Fi Sword)");
      }else{
        resolve("Іржавий ніж");
      }
    }, 1000);
  });
}

async function loadPlayerEquipment(){
  console.log("Сервер: Початок повної авторизації...");
  let level = await getPlayerLevel("Kiril");
  console.log(level);
  let weapon = await getWeaponByLevel(level);
  console.log("Гравець Kiril" + level + " рівень" + "озброєний: " + weapon);
}
loadPlayerEquipment();
