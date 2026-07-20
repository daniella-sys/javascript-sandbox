//імпорт бібліотек/модуля
import express from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { decode } from 'punycode';
const PORT = 5000;
const app = express();
app.use(express.json()); //виконується для всіх запитів
const SECRET_KEY = 'r86gbf hbhrhuh8h hu'; //токен нашого сервера 
//HTTP запит POST(реєстрація )
app.post('/register', (req, res) => {
   const read_file = fs.readFileSync('yggh.json', 'utf-8'); //зчитуємо файл але він в текстовому форматі
   const masuv = JSON.parse(read_file); //наший масив готовий для роботи уже об'єктом
   if(!req.body.login || !req.body.password){
      return res.status(400).json({"error": "Заповніть поля!"});
   }else{
      //хешуємо пароль 
      const salt_for_password = 10; //скільки разів будемо шифрувати пароль
      const password = req.body.password; //те що введе користувач 
      const hashpassword = bcrypt.hashSync(password, salt_for_password); //захешований пароль
      let new_masuv = {
         id: masuv.length + 1,
         login: req.body.login, 
         password: hashpassword //захешований пароль
      };
      masuv.push(new_masuv); //додали 
      const updatemasuv = JSON.stringify(masuv, null, 2);
      fs.writeFileSync('yggh.json', updatemasuv); //записали у файл 
      res.status(201).json({"message": "Успішне оновлення даних!"});
   }
});
//вхід
app.post('/login', (req, res) => {
   const read_file = fs.readFileSync('yggh.json', 'utf-8');
   const masuv = JSON.parse(read_file); //наший масив
       if(!req.body.login || !req.body.password){
         return res.status(400).json({"error": "Відсутні дані!"});
       } 
       const find_user = masuv.find(item => item.login === req.body.login); //пошук за логіном
       //якщо не однаковий введений логін з тим що в базі або не сходиться пароль з введеним з тим що у базі 
       if(!find_user || !bcrypt.compareSync(req.body.password, find_user.password)){
          return res.status(401).json({"error": "Невірний логін або пароль"});
       }else{
         //якщо все сходиться створюємо токен користувачу
         const token = jwt.sign({id: find_user.id, login: find_user.login}, SECRET_KEY, {expiresIn: '1h'}); //сервер бере дані користувача, «загортає» їх у токен за допомогою SECRET_KEY
         // і віддає цей довгий рядок клієнту. А потім витягуємо його з заголовку 
         return res.status(200).json({"message": "Вхід успішний", "token": token});
       }
});
//midlware
const checkAuth = (req, res, next) => {
   const authHeader = req.headers['authorization']; //Беремо весь заголовок (там лежить рядок "Bearer рядок_токена")
   const token = authHeader && authHeader.split('')[1]; //отримуємо чистий токен бо вирізали Bearer
   if(!token){
      return res.status(401).json({"error": "Токен не надано"});
   }
     jwt.verify(token, SECRET_KEY, (err, decoded) => {
       if(err){
          return res.status(403).json({"error": "Помилка валідації токена"});
       }else{
         req.user = decoded;
         next();
       }
     });
}
//HTTP запит GET
app.get('/profile', checkAuth, (req, res) => {
   res.status(200).json({"message": "Ласкаво просимо у ваш кабінет!", "userId": req.user.id, "userLogin": req.user.login});
});
//для розробника//запуск сервера 
app.listen(PORT, () => {
   console.log("Сервер готовий до роботи ! Відкрийте ось це посилання:" + 'http://localhost:' + PORT);
}); 
