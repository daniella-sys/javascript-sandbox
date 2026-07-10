//Task Queue System
import fs from 'fs/promises';
//батьківський клас
class Task{
  constructor(id){
    this.id = id;
  }
  execute(){
    throw new Error("Метод execute() має бути реалізований!");
  }
}
//дочірній клас
class DownloadTask extends Task{
  constructor(id, fileName){
    super(id);
    this.fileName = fileName;
  }
  execute(){
    return "Task " + this.id + "  Завантаження файлу: " + this.fileName;
  }
}
//дочірній клас
class UpdateTask extends Task{
  constructor(id, version){
    super(id);
    this.version = version;
  }
  execute(){
    return "[Task " + this.id + "] Оновлення системи до версії: " + this.version;
  }
}
//звичайна функція
function delayTaskProcessing(taskInstance, ms){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
     const step = taskInstance.execute();
     resolve(step);
    }, ms);
  });
}
//виклик методів/функцій
async function runSystem(){
  try{
  const dowloadtask = new DownloadTask(1, "noname-txt");
  const update =  new UpdateTask(783, "Windows-127.8");
  const step1 = await delayTaskProcessing(downloadTask, 2000); 
    console.log("Перше завдання виконано!");
    const step2 = await delayTaskProcessing(update, 3000);
    console.log("Друге завдання виконано!");
    const finalText = step1 + "\n" + step2;
   const write = await fs.writeFile('queue.txt', finalText);
   const write1 = await fs.writeFile('queue.txt', finalText);
   console.log("Усі завдання оброблені та збережені!");
}catch(error){
  console.log("Причина:" + error);
}
}
//виклик функції
runSystem();
