//try/catch
function checkStock(drink){
  return new Promise((resolve, reject) => {
     setTimeout(() =>{
       if(drink === "coca-cola"){
        reject("Кола закінчилася! Замовлення скасовано.");
       }else{
        resolve("Напій готовий");
       }
     }, 2000);
  });
}

async  function orderDrink(){
   try{
    console.log("Сервер: Перевірка наявності напою...");
    let result = await checkStock("coca-cola");
    console.log(result);
   }catch (error){
   console.log("⚠️ Оповіщення: " + error); //якщо сталась помилка
   }
}
orderDrink();

function loadMesh(format){
  return new Promise((resolve, reject) => {
     setTimeout(() => {
       if(format === ".blend"){
        reject("Помилка: Браузер не підтримує файли .blend! Потрібен .fbx");
       }else{
        resolve("Сітку .fbx завантажено ");
       }
     }, 1000);
  });
}

function loadTexture(isOptimized){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(isOptimized === false){
        reject("Помилка: Текстура занадто велика! Scene Crash.");
      }else{
        resolve("Текстуру 2К оптимізовано та завантажено ");
      }
    }, 1200);
  });
}

function loadAnimation(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Анімацію бігу підключено ");
    }, 800);
  });
}

async function init3DScene(){
  try{
    console.log("Ініціалізація 3D сцени...");
    let mesh = await loadMesh("fbx");
    let texture = await loadTexture(true);
    let anim = await loadAnimation();
    console.log("Успіх! Модель готова: " + mesh + " + " + texture + " + " + anim);
  }catch(error){
    console.log("Завантаження сцени зупинено! Причина: " + error);
  }
}
init3DScene();

function checkPolycount(polygons){
  return new Promise((resolve, reject) => {
   setTimeout(() => {
     if(polygons > 5000){
      reject("Перевищення ліміту!");
     }else{
      resolve("Все добре!");
     }
   }, 1000);
  });
}

function bakeTextures(isUnwrapped){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(isUnwrapped === false){
        reject("Помилка!");
      }else{
        resolve('Все добре!');
      }
    }, 1200);
  });
}

async function exportSceneProcess(){
  try{
    let step1 = await checkPolycount(2000);
    console.log(step1);
    let step2 = await bakeTextures(true);
    console.log(step2);
  }catch(error){
    console.log("Помилка підготовки локації до експорту! Причина:" + error);
  }
}
exportSceneProcess();
