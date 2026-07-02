//fs module
import fs from "fs/promises";
async function addPlayerToFile(newNickname){
  try{
   const dodat = await fs.appendFile('online.txt', '\n' + newNickname);
   console.log("Гравець" + newNickname + "успішно доданий до бази! ");
} catch(error){
  console.log('Помилка запису у файл');
}
}
addPlayerToFile('Cyber_Cat');

import fs from "fs/promises";
async function logAction(username, action){
  try{
    const data = new Date().toISOString().slice(0, 10);
    const bddh = "\n" + data + "Користувач" + username + action;
    const efj = await fs.appendFile("server.log", bddh);
  }catch(error){
    console.log(error);
  }
}
logAction("bhk_9", "download...");

import fs from "fs/promises";
async function ensureConfigExists(){
  try{
    const readfile1 = await fs.readFile('config.json', 'utf-8');
    console.log(readfile1);
   }catch(error){
    const fhhf = await fs.writeFile('config.json', "{ status: 'active' }");
   }
}
ensureConfigExists();

import fs from 'fs/promises';
async function cleanChat(){
  //chat.txt текст якийсь його потрібно очистити
  try{
  const step1 = await fs.readFile('chat.txt', 'utf-8');
  const step2 = step1.split(' ');
  const step3 = step2.filter((item) => item !== "SPAM");
  const step4 = step3.join('');
  await fs.writeFile("chat.txt", step4);
}catch(error){
  console.log(error);
}
}
cleanChat();

import fs from 'fs/promises';
async function countSymbols(){
  try{
    const step_1 = await fs.readFile("input.txt", "utf-8");
    //дізнатись скільки у прочитаному файлі символів
    const step_2 = step_1.length;
    const step_3 =  await fs.writeFile('res.txt', step_2); //перед fs потрібно await!!
   }catch(error){
    console.log(error);
   }
}
countSymbols();

import fs from "fs/promises";
async function checkIfFileEmpty(){
  try{
    const read = await fs.readFile("user_bio.txt", "utf-8");
    const ob = read.trim();
    const dov = ob.length;
    if(dov === 0){
      console.log("Файл порожній!");
    }else if(dov > 0){
      console.log("Файл містить дані.");
    }
  }catch(error){
    console.log(error);
  }
}
checkIfFileEmpty();

import fs from "fs/promises";
async function checkFeedback(){
  try{
    const read1 = await fs.readFile("feedback.txt", "utf-8");
    const includes1 = read1.includes("ERROR");
    if(includes1 === true){
      console.log("Знайдено помилку в системі!");
    }else{
      console.log("Відгук чистий, помилок немає.");
    }
}catch(error){
  console.log(error);
}
}
checkFeedback();
