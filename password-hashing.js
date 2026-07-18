//імпорт бібліотек/модуля
import express from 'express';
import bcrypt from 'bcrypt';
import fs from 'fs';
const PORT = 4000;
const app = express();
app.use(express.json()); //виконується для всіх запитів.
//HTTP запит POST хешування 
app.post('/signup', (req, res) => {
   const read_file = fs.readFileSync('yggh.json', 'utf-8'); //тут лише текстовим форматом треба об'єкт.
   const masuv = JSON.parse(read_file); //наший масив 
   if(!req.body.login || !req.body.password){
    return res.status(400).json({"error": "Заповніть усі поля"});
   }else{
    //хешування паролю 
    const salt = 10; //скільки разів відбудеться хешування.
    const password_user = req.body.password; //пароль користувача те що вні ввів.
    const haskedpassword = bcrypt.hashSync(password_user, salt);
    let new_masuv = {
      id: masuv.length + 1,
      login: req.body.login,
      password: haskedpassword
    };
    masuv.push(new_masuv);
    const updatefile = JSON.stringify(masuv, null, 2); 
    fs.writeFileSync('yggh.json', updatefile); //записуємо у файл, який текстовий.
    res.status(201).json({"message": "Користувача створено"});
  }
});
//HTTP запит POST вхід теж метод з бібліотеки bcrypt
app.post('/signin', (req, res) => {
   const read = fs.readFileSync('yggh.json', 'utf-8');  //зчитали файл
   const masuv = JSON.parse(read);  //тепер файл об'єкт
   if (!req.body.login || !req.body.password) {
      return res.status(400).json({"error": "Заповніть усі поля"});
   }
   const foundUser = masuv.find(user => user.login === req.body.login);
   // Перевіряємо користувача та пароль
   if (!foundUser || !bcrypt.compareSync(req.body.password, foundUser.password)) {  
      return res.status(401).json({"error": "Невірний логін або пароль"});
   }
   //  Якщо перевірки пройшли = успішний вхід
   res.status(200).json({"message": "Успішний вхід"});
});
//midlware
const checkToken = (req, res, next) => {
  const userKey = req.headers['x-access-token']; //Перевіряє заголовок
  if(userKey === "secret-admin-2026"){
    next();
  }else{
    return res.status(403).json({"error": "Доступ заборонено"});
  }
}
//підключення мідлвару
app.use(checkToken);
//HTTP запит GET
app.get('/data', (req, res) => {
   const read = fs.readFileSync('yggh.json', 'utf-8');
   const masuv = JSON.parse(read);
   res.status(200).json(masuv);
});
//для розробника//запуск сервера 
app.listen(PORT, () => {
   console.log("Сервер готовий до роботи ! Відкрийте ось це посилання:" + 'http://localhost:' + PORT);
});
