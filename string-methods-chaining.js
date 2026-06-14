//Method Chaining
let userPassword = window.prompt("Enter your password: ");
let finalPassword = userPassword.trim().length;
console.log(finalPassword);

let rawNickname = window.prompt("Enter your name: ");
 let smallFirstLetter = rawNickname.trim().charAt(0).toLowerCase();
 console.log(smallFirstLetter);

let rawModelName = window.prompt("Enter your 3D project: ");
let cleanCapsName = rawModelName.slice(6).toUpperCase();
console.log(cleanCapsName);

let dirtyName = window.prompt("Enter your name: ");
let normalName = dirtyName.trim().charAt(0).toUpperCase() + dirtyName.trim().slice(1).toLowerCase();
console.log(normalName);

let rawMessage = window.prompt("Enter your text: ");
let cleanMessage = rawMessage.trim().toUpperCase();
if(cleanMessage === "РЕКЛАМА"){
  console.log("Повідомлення заблоковано: Спам!");
}else if(cleanMessage.length > 10){
console.log("Повідомлення занадто довге!");
}else{
  console.log("Повідомлення збережено");
}
console.log(cleanMessage);

                                                          //slice(-3) починає рахувати з кінця
let fileName = window.prompt("Enter your expansion");
let fileExtension = fileName.trim().slice(-3).toUpperCase();
if(fileExtension === "OBJ"){
  console.log("Файл прийнято! Завантажуємо 3D-модель...");

}else{
  console.log("Помилка: Непідтримуваний формат файлу!");
}
console.log(fileExtension);



let userLogin = window.prompt("Enter your login: ");
let tempPassword = userLogin.trim().toLowerCase() + 2026;
console.log(tempPassword);

let secretCipher = window.prompt("Enter your password:");
let cleanWord = secretCipher.trim().slice(5, 11).toLowerCase();
if(cleanWord === "secret"){
  console.log("Доступ до 3D-сховища надано!");
}else{
  console.log("Шифр невірний! Тікайте з городу!");
}
console.log(cleanWord);
