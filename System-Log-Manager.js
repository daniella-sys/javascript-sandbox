//Log Manager
import fs from 'fs/promises';
import { cache } from 'react';
//батьківський клас
class Log{
  constructor(type){
    this.type = type;
  }
  formatMessage(){
    throw new Error("Метод formatMessage() має бути реалізований!");
  }
}
class ServerLog extends Log{
  constructor(type, message){
    super(type);
    this.message = message;
  }
  formatMessage(){
    return this.type + "Повідомлення:" + this.message;
  }
}
class SecurityLog extends Log{
  constructor(type, user, action){
    super(type);
    this.user = user;
    this.action = action;
  }
  formatMessage(){
    return this.type + "Користувач" + this.user + "виконав дію:" + this.action;
  }
}
//асинхронна функція
async function writeLogToFile(logInstance, filePath){
  try{
    //виклик методу
    const vukluc = logInstance.formatMessage();
    const write = await fs.writeFile(filePath, vukluc);
    console.log(write + "Успішний запис!");
  }catch(error){
    console.log("Причина:" + error);
  }
}
//функція для зчитування даних
async function readLogFromFile(filePath){
  try{
    const read = await fs.readFile(filePath, 'utf-8');
    console.log("Зчитаний файл:" + read);
  }catch(error){
    console.log("Причина:" + error);
  }
}
//функція для викликів
async function startLogging(){
  const serverlog = new ServerLog('txt', "...");
  const secur = new SecurityLog('png', "user-10", "enter password" );
  serverlog.formatMessage();
  secur.formatMessage();
  writeLogToFile(serverlog, 'server.txt');
  writeLogToFile(secur, 'server.txt');
  readLogFromFile(serverlog, 'server.txt');
  readLogFromFile(secur, 'server.txt');
}
//виклик головної функції
startLogging();
