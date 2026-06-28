// 3D Production Pipeline
function checkUserBalance(userId, price){
   return new Promise((resolve, reject) => {
     setTimeout(() => {
      let userBalance = 150;
       if(userId !== 121){
        reject("Помилка: Користувача не знайдено в базі.");
       }else if(price > userBalance){
        reject("Недостатньо коштів");
       }else{
        resolve("Баланс перевірено. Гроші заморожено ");
       }
     }, 800);
   });
}

function loadModelTemplate(modelName){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
     if(modelName === "cat" || modelName === "chair"){
      resolve("Базову сітку моделі [" + modelName + "] завантажено з сервера ");
     }else{
      reject("Помилка: Такої моделі немає в каталозі шаблонів!");
     }
    }, 1000);
  });
}

function optimizeMesh(polygonCount){
  return new Promise((resolve, reject) => {
     setTimeout(() => {
       if(polygonCount > 5000){
        reject("Помилка оптимізації: Занадто високий полігонаж для мобільної гри! Scene Crash.");
       }else{
        resolve("Полігони оптимізовано під ліміт (Поточний count: " + polygonCount + ") ");
       }
     }, 1200);
  });
}

function renderScene(quality){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
     if(quality === "4K"){
       reject("Помилка рендеру: Серверна відеокарта перегрілася від 4К! ");
     }else if(quality === "1080p" || quality === "720p"){
       resolve("Рендер завершено у якості " + quality + " 🖼️");
     }else{}
    }, 2000);
  });
}

function saveToGitHubRepository(fileName){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Файл [" + fileName + "] успішно задеплоєно в репозиторій студії! ");
    }, 1100);
  });
}

async function runProductionPipeline(userId, modelName, polygons, quality, price, fileName){
   try{
    console.log("--- 🎬 ЗАПУСК АВТОМАТИЗОВАНОГО КОНВЕЄРА СТУДІЇ ---");
    //викликаю 5 функцій і передаю відповідні аргументи
    let step1 = await checkUserBalance(userId, price);
    console.log(step1);
      let step2 = await loadModelTemplate(modelName);
      console.log(step2);
      let step3 = await optimizeMesh(polygonCount);
      console.log(step3);
      let step4 = await renderScene(quality);
      console.log(step4);
      let step5 = await saveToGitHubRepository(fileName);
      console.log(step5);
      console.log("Проєкт успішно завершено! Клієнт задоволений.");
   }catch(error){
     console.log("КОНВЕЄР ЗУПИНЕНО ЧЕРЕЗ АВАРІЮ!");
     console.log("Причина збою:" + error);
   }
}
runProductionPipeline();
