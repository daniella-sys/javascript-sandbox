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
app.listen(PORT, () => {
  console.log("Сервер готовий до роботи ! Відкрийте ось це посилання:" + 'http://localhost:' + PORT);
});
