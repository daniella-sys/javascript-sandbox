//.push()
let serverLogs = [];
let action = window.prompt("Enter your action:");
if (action !== null && action !== "") {
    let editaction = action.trim().toUpperCase();
    serverLogs.push(editaction);
  } else {
    console.log("Помилка: Дія не вказана або скасована!");
}
console.log(serverLogs);

let renderQueue = ["SCENE.OBJ"];
let q = window.prompt("Enter your new file name:");
      if(q === null || q === ""){
         console.log("Помилка: Назву файлу не вказано!");
    }else{
         let clean = q.trim().toUpperCase();
         renderQueue.push(clean);
         console.log("Файл успішно додано до черги!");
  }
console.log(renderQueue);

let myPromocodes = [];
let enterpromocodes = window.prompt("Введіть ваш промокод:");
    if(enterpromocodes === null || enterpromocodes === ""){
     console.log("Помилка: Промокод не вказано!");
    }else{
    let finalCode = enterpromocodes.trim().toUpperCase();
     myPromocodes.push(finalCode);
      console.log("Промокод успішно додано!");
  }
console.log(myPromocodes);


let registeredUsers = ["ADMIN", "NEO", "PLAYER1"];
let nickname = window.prompt("Введіть ваш нікнейм для реєстрації:");
    if(nickname === null || nickname === ""){
      console.log("Помилка: Нікнейм не може бути порожнім!");
    }else{
      let cleanNickname = nickname.trim().toUpperCase();
         if(registeredUsers.includes(cleanNickname)){
          console.log("Помилка: Цей нікнейм уже зайнятий!");
         }else{
          registeredUsers.push(cleanNickname);
          console.log("Реєстрація успішна! Ласкаво просимо" + cleanNickname);
         }
    }
    console.log(registeredUsers);

let usersDatabase = [
    { username: "ADMIN", role: "superuser" },
    { username: "NEO", role: "player" }
];
let takenNames = ["ADMIN", "NEO"];
let newentername = window.prompt("Enter nickname:");
if(newentername === null || newentername === ""){
  console.log("Mistake!");
}else{
  let finalName = newentername.trim().toUpperCase();
  if(takenNames.includes(finalName)){
    console.log("Помилка ім'я зайняте.");
  }else{
    let newPlayer = { username: finalName, role: "player" };
    usersDatabase.push(newPlayer);
    takenNames.push(finalName);
    console.log("Успішно!");
  }
}
console.log(usersDatabase, takenNames);


let cloudStorage = [
    { fileName: "CAR.OBJ", sizeMb: 45 },
    { fileName: "SPHERE.FBX", sizeMb: 12 }
];
let takenFiles = ["CAR.OBJ", "SPHERE.FBX"];
let newfile = window.prompt("Введіть назву файлу для завантаження:");
 if(newfile === null || newfile === ''){
  console.log("Помилка!");
 }else{
  let finalFileName = newfile.trim().toUpperCase();
       
       if(takenFiles.includes(finalFileName)){
          console.log("Помилка: Файл з такою назвою вже завантажено!");
       }else{
        let newFile = { fileName: finalFileName, sizeMb: 25 };
        cloudStorage.push(newFile);
        takenFiles.push(finalFileName);
        console.log("Файл успішно завантажено в хмару!");
       }
 }
 console.log(cloudStorage, takenFiles);
 
