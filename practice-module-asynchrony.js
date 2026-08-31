//import/export
import { calculateDiscount, validateModel } from "./indexmain.js";
async function startServer(){
  try{
    let step_1 = await validateModel("scifi_gate.fbx");
    console.log(step_1);
  }catch(error){
    console.log("Помилка виникла через:" + error);
  }
}
startServer();

import { processPayment, calculateDiscount } from "./indexmain.js";
async function checkout(){
  try{
    let total = calculateDiscount(100, 20);
    let paymentStatus = await processPayment(total);
    console.log(paymentStatus);
  }catch(error){
   console.log(error);
  }
}
checkout();


import { filterHeavyModels, optimizeScene } from "./indexmain.js";
async function processGraphics(){
  try{
    let scene = [
  { name: "Sci-Fi Door", polygons: 4500 },
  { name: "Box", polygons: 150 },
  { name: "Character Mesh", polygons: 8000 }
];
let badModels = filterHeavyModels(scene, 3000);
let status = await optimizeScene(badModels);
console.log(status);
  }catch(error){
    console.log(error);
  }
}
processGraphics();


import { generateSession, hasBannedUsers } from "./indexmain.js";
async function connectPlayers(){
  try{
    let players = ["Bot_1", "GamerX", "Admin_Ivan"];
    let isDangerous = hasBannedUsers(players);
    if(isDangerous === true){
      console.log("Доступ заблоковано! Виявлено спробу входу під адмінським нікнеймом.");
    }else{
      let sessionToken = await generateSession();
      console.log(sessionToken);
    }
    }catch(error){
      console.log(error);
  }
}
connectPlayers();


import { buildSceneName, checkRenderPerformance } from "./indexmain.js";
async function generateMap(){
  try{
    let sceneName = buildSceneName("Cyberpunk", "City");
    console.log(sceneName);
    let renderResult = await checkRenderPerformance(12000);
    console.log(renderResult);
  }catch(error){
    console.log(error);
  }
}
generateMap();


import { formatSaveName, uploadToCloud } from "./indexmain.js";
async function saveGameProgress(){
  try{
    let fileName = formatSaveName("GamerPro");
    let progress = { file: fileName, level: 5 };
    let cloudStatus = await uploadToCloud(progress);
    console.log(cloudStatus);

  }catch(error){
    console.log(error);
  }
}
saveGameProgress();
