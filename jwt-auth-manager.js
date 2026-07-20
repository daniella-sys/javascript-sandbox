//імпорт бібліотек/модуля
import express from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const PORT = 4000;
const app = express();
app.use(express.json()); //виконується для всіх запитів 
const JWT_SECRET_KEY = "my-token-key32ye8dtgxbhw"; //знає лише сервер і придумує сам розробник 
//HTTP запит POST
app.post('/signup', (req, res) => {
   const read_file = fs.readFileSync('yggh.json', 'utf-8'); //зчитаний файл але у текстовому форматі
   const masuv = JSON.parse(read_file); //наший масив для роботи 
   if(!req.body.login || !req.body.password ){
      return res.status(400).json({"error": "Заповніть поля"});
   }else{
      const salt = 10; //скільки разів буде вібуватись хешування
      const password = req.body.password; //наш пароль який треба захешувати
      const hashpassword = bcrypt.hashSync(password, salt); //захешований пароль
      let new_masuv = {
         id: masuv.length + 1,
         login: req.body.login,
         password: hashpassword 
      };
      masuv.push(new_masuv); //додали 
      const stringmasuv = JSON.stringify(masuv, null, 2);
      fs.writeFileSync('yggh.json', stringmasuv); ////записуємо у файл, який текстовий.
      res.status(201).json({"message": "Успішна реєстрація!"});   
   }
});
//Вхід та генерація JWT
app.post("/signin", (req, res) => {
    const read_file = fs.readFileSync('yggh.json', 'utf-8');
    const masuv = JSON.parse(read_file);
    if(!req.body.login || !req.body.password){
      return res.status(400).json({"error": "Відсутні дані!"});
    }
      const find_user = masuv.find(item => item.login === req.body.login);
      if(!find_user || !bcrypt.compareSync(req.body.password, find_user.password)){
         return res.status(401).json({"error": "Невірний логін або пароль"});
      }else{
         const token = jwt.sign({ login: find_user.login }, JWT_SECRET_KEY, {expiresIn: '30m'}); //метод sing() створює новий токен примйає дані користувача секретний ключ та час дії токена
         return res.status(200).json({"message": "Вхід успішний", "token": token});
      }
});
//midlware
const verifyToken = (req, res, next) => {
   //Беремо весь заголовок (там лежить рядок "Bearer рядок_токена")
   const authHeader = req.headers['authorization']; 
   
   // Вирізаємо слово Bearer і беремо лише чистий токен
   const token = authHeader && authHeader.split(' ')[1];

   // Якщо токена взагалі немає у заголовках
   if(!token){
     return res.status(401).json({"error": "Токен не надано"});
   }

   // Перевіряємо наш штамп (JWT_SECRET_KEY)
   jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
         // Якщо токен підроблений або час вийшов
         return res.status(403).json({"error": "Помилка валідації токена"});
      }
      
      // Якщо штамп правильний, записуємо дані користувача в req.user
      req.user = decoded;
      next(); // Пропускаємо до роуту /my-tasks
   });
}
//HTTP запит GET 
app.get('/my-tasks', verifyToken, (req, res) => {
    res.status(200).json({"tasks": ["Повторити JWT", "Написати мідлвар без помилок"], "forUser": req.user.login});
});
//для розробника//запуск сервера 
app.listen(PORT, () => {
   console.log("Сервер готовий до роботи ! Відкрийте ось це посилання:" + 'http://localhost:' + PORT);
});
