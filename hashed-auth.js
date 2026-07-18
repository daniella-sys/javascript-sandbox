//імпорт бібліотек/модуля
import express from 'express';
import bcrypt from 'bcrypt';
import fs from 'fs';
const PORT = 2000;
const app = express();
app.use(express.json()); //виконується для всіх запитів 
//HTTP запит POST хешування 
app.post('/register', (req, res) => {
   const read_file = fs.readFileSync('yggh.json', 'utf-8'); //зчитування файла тут текстовий формат 
   const nash_masuv = JSON.parse(read_file);
   if(!req.body.username || !req.body.password){
    res.status(400).json({"error": "Введіть логін та пароль!"});
   }else{
    //хешування пароля 
    const salt = 10; // скільки разів буде відбуватись шифрування
    const password = req.body.password; //треба брати пароль той що користувач введе 
    const hashedPassword = bcrypt.hashSync(req.body.password, salt); //password-наший пароль що хочемо шифрувати, salt-скільки разів буде відбуватись шифрування
    let new_masuv = {
      id: nash_masuv.length + 1,
      username: req.body.username,
      password: hashedPassword //зашифрованний пароль
    };
    nash_masuv.push(new_masuv); //додаємо до нашого масиву 
    const updatedText = JSON.stringify(nash_masuv, null, 2);
    fs.writeFileSync('yggh.json', updatedText);
    res.status(201).json({"message": "Успішно додано інформацію !"});
   }
});

//midlware
const apiGuard = (req, res, next) => {
  const userKey = req.headers['x-api-key']; //бере ключ із заголовків запиту 
  if(userKey === 'developer-vlad'){
    next();
  }else{
    return res.status(401).json({"error": "Невірний або відсутній API ключ!"});
  }
}
//підключення мідлвару 
app.use(apiGuard); //виконується для всіх запитів 
//запускаємо сервер(суто для розробника)
app.listen(PORT, () => {
   console.log("Сервер готовий до роботи! Відкрийте це посилання:" + 'http://localhost:' + PORT);
});
