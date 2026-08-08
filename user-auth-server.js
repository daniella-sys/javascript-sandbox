//імпорт бібліотек та модуля
const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');
//підключення в файл сервера
const express = require('express'); //завантажує фреймворк для обробки http запитів
const {PrismaClient} = require('@prisma/client');// імпортує клас PrismaClient
const app = express();
const prisma = new PrismaClient(); //створює підключення до бази даних
app.use(express.json());
const PORT = 3000;
const SECRET_KEY = 'e6gsyu7287hc3456789iuhgfdxcvbnm, n';

app.post('/register', async (req, res) => {
  try{
  //отримання даних з тіла запиту
  const {email, name, password} = req.body;
  //хешуємо пароль
  const hashedPassword = await bcrypt.hash(password, 10);
  //зберігаємо користувача в БД  
  const newUser = await prisma.user.create({
    data: {
      email: email,
      name: name,
      password: hashedPassword
    }
  });
   // відправляємо відповідь клієнту
   res.status(201).json({
    message: "Успішно створено користувача!",
    user: {id: newUser.id, email: newUser.email, name: newUser.name}
  });
  }catch(error){
    res.status(400).json({error: 'Користувач із таким email вже існує'});
}
});

app.post('/login', async (req, res) => {
  try{
    //отримання даних 
    const {email, name, password} = req.body;
    //Перевірка на відсутність 
     if(!password || !email){
      return res.status(400).json({ error: 'Заповніть усі поля' });
     }
       //в іншому випадку будемо шукати за вказаною поштою в БД
       const finduser = await prisma.user.findUnique({
        where: {
          email: email
        }
       });
        if(!finduser){
          return res.status(400).json({ error: 'Невірний email або пароль' });
        }
         //перевірка пароля
         const isPasswordValid = await bcrypt.compare(password, finduser.password);
            if(!isPasswordValid){
                return res.status(400).json({ error: 'Невірний email або пароль' });
            }
              const token = jwt.sign({userId: finduser.id, email: finduser.email},SECRET_KEY, {expiresIn: '1h'});
              res.status(200).json({message: 'Успішне створення токену!', token});

            
  }catch(error){
    res.status(500).json({error});
  }
});
app.listen(PORT, () => {
  console.log("Сервер готовий до роботи ! Відкрийте ось це посилання:" + 'http://localhost:' + PORT);
});
