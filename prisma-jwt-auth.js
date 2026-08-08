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

//реєстрація
app.post('/register', async (req, res) => {
  try{
  const {email, name, password} = req.body;
     if(!email || !name || !password){  //якщо поля дійсно заповнені код піде далі якщо ні то зупиниться
      return res.status(400).json({error: "Необхідно заповнити усі поля!"});
     }
        //код пішов далі хешуємо пароль і зберігаємо дані до БД
        const hashedPassword = await bcrypt.hash(password, 12);
        //збережемо дані 
        const newUser = await prisma.user.create({
          data: {
            email: email,
            name: name,
            password: hashedPassword
          }
        });
        //повертаємо дані користувачу
        res.status(201).json({message: 'Успішно створено користувача', user: {id: newUser.id, email: newUser.email, name: newUser.name}});
      }catch(error){
        return res.status(400).json(error);
      }
});
//авторизація
app.post('/login', async (req, res) => {
  try{
  const {email, password} = req.body;
  //перевірка на наявність полів
     if(!email || !password){
      return res.status(400).json({error: 'Необхідно заповнити поля!'});
     }
       //якщо все вірно і поля заповнені код йде далі
       //шукаємо користувача за email
       const user = await prisma.user.findUnique({
        where: {
          email: email
        }
       });
        if(!user){
          return res.status(400).json({error: 'Невірний email або пароль'});
        }
           //перевірка вказаного пароля
           const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
              return res.status(400).json({error: 'Невірний email або пароль'});
            }
              //якщо все правильно і все є і введено код йде далі
              //створюємо токен
              const token = jwt.sign({userId: user.id, email: user.email}, SECRET_KEY, {expiresIn: '1h'});
              res.status(200).json({ message: 'Успішно авторизовано!', token });
      }catch(error){
        return res.status(500).json(error);
      }
});
//для розробника аби знати чи сервер працює чи ні
app.listen(PORT, () => {
  console.log("Сервер готовий до роботи ! Відкрийте ось це посилання:" + 'http://localhost:' + PORT);
});
