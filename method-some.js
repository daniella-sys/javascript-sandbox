//.some();
 let blenderScene = [
    { meshName: "Well_Base", texture: "Stone_Diffuse.png" },
    { meshName: "Roof_Wood", texture: null },
    { meshName: "Bucket", texture: "Wood_Old.png" }
];
let hasUntexturedObjects =blenderScene.some((item) => item.texture === null);
if(hasUntexturedObjects === true){
  console.log("Увага: Деякі 3D-моделі ще не мають текстур!");
}else{
  console.log("Чудово! Усі моделі розфарбовані.");
}

let my3dScene = [
    { meshName: "Stylized_Well", polygons: 420 },
    { meshName: "Bucket", polygons: 150 },
    { meshName: "Tree_Pine", polygons: 650 } 
];
let k = my3dScene.some((item) => item.polygons > 500);
if(k === true){
  console.log("Увага: У сцені є занадто важкі моделі! Треба зробити редукцію полігонів.");
}else{
  consoole.log("Оптимізація ідеальна. Усі моделі в межах норми.");
}


let exportedFiles = [
    { name: "well_final.fbx", format: "FBX" },
    { name: "bucket_old.obj", format: "OBJ" },
    { name: "untitled.blend", format: "BLEND" } 
];
let hasRawFiles = exportedFiles.some((item) => item.format === "BLEND");
if(hasRawFiles === true){
  console.log("Помилка: Знайдено сирі файли .blend! Очистіть папку перед завантаженням.");
}else{
  console.log("Все чотко! Усі файли готові до експорту.");
}


let renderCheck = [
    { meshName: "Well_Roof", polygons: 450 },
    { meshName: null, polygons: 120 }, 
    { meshName: "Ground_Plane", polygons: 1200 } 
];
let mistake = renderCheck.some((item) => item.meshName === null || item.polygons > 1000);
if(mistake === true){
  console.log("Експорт скасовано: Знайдено критичні помилки в мешах!");
}else{
  console.log("Сцена повністю валідна. Рендеринг дозволено!");
}


let onlinePlayers = [
    { nickname: "ADMIN", level: 99 },
    { nickname: "X_REAPER_X", level: 15 },
    { nickname: "BOB_SPONGE", level: 42 }
];
let enter___hh = window.prompt("Enter your name:");
if(enter___hh === null){
  console.log("Помилка: Нікнейм не вказано!");
}else{
  let searchedNickname = enter___hh.trim().toUpperCase();
  let isPlayerOnline = onlinePlayers.some((item) => item.nickname === searchedNickname);
              if(isPlayerOnline === true){
                console.log("Користувача" + searchedNickname + "знайдено на сервері. Запускаємо бан!");
              }else{
                console.log("Гравець з таким нікнеймом зараз офлайн.");
              }
     
}

