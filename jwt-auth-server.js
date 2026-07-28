//jwt
//імпорт бібліщтек та модуля
import fs from 'fs';
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const SECRET_KEY = 'r86gbf hbhrhuh8h hu'; //токен нашого сервера 
const PORT = 5000;
const app = express();
app.use(express.json()); //виконується для всіх запитів
//POST(HTTP) запит
app.post('/register', (req, res) => {
   const read_file = fs.readFileSync('yggh.json', 'utf-8'); //зчитує файл але він у текстовому форматі
   const masuv = JSON.parse(read_file); //перетворили на об'єкт тепер можемо працювати
    if(!req.body.password || !req.body.login){
      return res.status(400).json({"error": "Заповніть поля!"});
    }else{
      //хешуування пароля
      const salt = 10; //скільки разів пароль буде шифруватись
      const password = req.body.password;
      const hashed_password = bcrypt.hashSync(password, salt);
      //після хешування обновлюємо нашу базу даних 
      const new_masuv = {
         id: masuv.length + 1,
         login: req.body.login,
         password: hashed_password
      };
      masuv.push(new_masuv);
      const updatefile = JSON.stringify(masuv, null, 2);
      fs.writeFileSync('yggh.json', updatefile);
      res.status(201).json({"message": "Успішне оновлення даних!"});
    }
});
//Вхід
app.post('/login', (req, res) => {
    const read_file = fs.readFileSync('yggh.json', 'utf-8'); // зчитали файл
    const masuv = JSON.parse(read_file); //тепер це масив об'єктів з яким можна працювати 
    if(!req.body.login || !req.body.password){
      return res.status(400).json({"error": "Заповніть поля!"});
    }
      const find_user = masuv.find(item => item.login === req.body.login); //пошук користувача за логіном 
      if(!find_user || !bcrypt.compareSync(req.body.password, find_user.password)){
//якщо не сходиться логін з ти що ввів користувач або не виконується умова порівнянь паролів(не правильна рівність точніше пароль не правильний)
   return res.status(401).json({"error": "Не правильний пароль або логін!"});
    }else{
      //створюємо токен користувачу 
      const token = jwt.sign({ id: find_user.id, login: find_user.login }, SECRET_KEY, {expiresIn: '1h'}); //передали дані користувача та токен сервера та час доступності
       // і віддає цей довгий рядок клієнту. А потім витягуємо його з заголовку 
       return res.status(200).json({"message": "Вхід успішний", "Token": token});
   }
});
//midlware
const checkAuth = (req, res, next) => {
    const authHeader = req.headers['authorization']; // //Беремо весь заголовок (там лежить рядок "Bearer рядок_токена")
    const token = authHeader && authHeader.split(' ')[1];
     if(!token){
       return res.status(401).json({"error": "Токен не надано"});
     }
      jwt.verify(token,SECRET_KEY, (err, decoded) => {
        if(err){
         return res.status(403).json({"error": "Помилка валідації токена"});
        }else{
         req.user = decoded;
         next();
        }
      });
};
//HTTP запит GET
app.get('/profile', checkAuth, (req, res) => {
   res.status(200).json({"message": "Ласкаво просимо у ваш кабінет!", "userId": req.user.id, "userLogin": req.user.login});
});
//для розробника//запуск сервера 
app.listen(PORT, () => {
   console.log("Сервер готовий до роботи ! Відкрийте ось це посилання:" + 'http://localhost:' + PORT);
}); 
