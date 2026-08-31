//modules
 export function validateModel(filename){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(filename.includes(".blend") || filename.includes(".fbx")){
        resolve("Файл" + filename + "успішно пройшов валідацію!");
      }else{
        reject("Помилка: Непідтримуваний формат файлу!");
      }
    }, 800);
  });
}


export function calculateDiscount(price, discount){
  return price - discount;
};

export function processPayment(finalPrice){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
     if(finalPrice < 0 || finalPrice === 0){
      reject("Сума оплати має бути більшою за нуль! ");
     }else{
      resolve("Оплата на суму " + finalPrice + " грн пройшла успішно! ");
     }
    }, 1000);
  });
}


export function filterHeavyModels(modelsArray, maxPolygons){
  return modelsArray.filter((model) => {
            return model.polygons > maxPolygons;
  });
}
export function optimizeScene(heavyModels){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(heavyModels.length === 0 ){
        resolve("Сцена ідеальна! Оптимізація не потрібна.");
      }else{
        resolve("Знайдено важкі моделі! Оптимізуємо масив з " + heavyModels.length + " елементів...");
      }
    }, 1200);
  });
}

export function hasBannedUsers(nicknamesArray){
  return nicknamesArray.some((item) => {
     if(item.includes("Admin")){
      return true;
     }else{
      return false;
     }
  });
}
export function generateSession(){
  return new Promise((resolve, reject) => {
     setTimeout(() => {
      resolve("Сесію створено! ID:" + Math.random());
     }, 500);
  });
}

export function buildSceneName(theme, style){
  //поєднуємо через дефіс потім робимо всі літери великими 
  return (theme + " - " + style).toUpperCase();
}

export function checkRenderPerformance(polygonCount){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(polygonCount > 10000){
        reject("Забагато полігонів для рендеру!");
      }else{
        resolve("Продуктивність в нормі, рендер успішний.");
      }
    }, 700);
  });
}


export function formatSaveName(nickname){
  return "save_file_" + nickname.toLowerCase() + ".json";
}
export function uploadToCloud(saveData){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
       if(saveData.level <= 0){
        reject("Помилка: Некоректний рівень для збереження!");
       }else{
        resolve("Прогрес успішно завантажено в хмару!");
       }
    }, 900);
  });
}
