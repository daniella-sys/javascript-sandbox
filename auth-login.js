//імпорт бібліотек/модуля
import express from 'express';
import bcrypt from 'bcrypt';
import fs from 'fs';
const PORT = 4000;
const app = express();
app.use(express.json()); //виконується для всіх запитів.
//HTTP запит POST вхід
app.post('/signin', (req, res) => {
   const read_file = fs.readFileSync('yggh.json', 'utf-8'); //зчитали файл але він у текстовому форматі
   const masuv = JSON.parse(read_file); //наш масив готовий до роботи
   if(!req.body.login || !req.body.password){
    return res.status(400).json({"error": "Усі поля обов'язкові!"});
   }
     //знаходження користувача за логіном 
     const founduserlogin = masuv.find(item => item.login === req.body.login);
     if(!founduserlogin || !bcrypt.compareSync(req.body.password, founduserlogin.password)){
      return res.status(401).json({"error": "Невірні дані для входу!"});
     }else{
      return res.status(200).json({"message": "Доступ дозволено", "user": req.body.login});
     }
});
//midlware 
const authGuard = (req, res, next) => {
   const readKey = req.headers['x-dev-token']; //Перевіряє заголовок
   if(readKey === 'allow-vlad'){
    next();
   }else{
    return res.status(403).json({"error": "Немає токена розробника!"});
   }
};
//підключення мідлвар до всіх запитів 
app.use(authGuard);
//HTTP запит GET 
app.get('/notes', (req, res) => {
   res.status(200).json({"notes": ["Виправити баг із дужками", "Закинути код на GitHub"]});
});
//для розробника//запуск сервера
app.listen(PORT, () => {
   console.log("Сервер готовий до роботи! Відкрийте ось це посилання:" + "http://localhost:" + PORT);
});
