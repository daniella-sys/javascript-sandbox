//імпорт бібліотек модулів 
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
//підключення 
const {PrismaClient} = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();
app.use(express.json());
const PORT = 3000;
const SECRET_KEY = 'ygjdghehgy7t2637eyudghjiwsndn983877e78uhdjn';

//practic
//мідлвар авторизації
const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization; //витягуємо токен із заголовку
   if(!auth || !auth.startsWith('Bearer ')){
    return res.status(401).json({error: "Токен відсутній або має невірний формат!"});
   }
   //якщо все добре обрізаємо і робимо чистий токен
   const token = auth.split(' ')[1];
    try{
      const decoded = jwt.verify(token, SECRET_KEY); //перевіряємо токен
      req.user = decoded;
      next();
    }catch(error){
      return res.status(401).json({error: error.message});
    }
}

//Реєстрація користувача
app.post('/auth/register', async (req, res) => {
  const {email, password, name} = req.body; //витягуємо дані
  try{
   if(!email || !password || !name){
    return res.status(400).json({error: "Необіхідно вказати усі дані!"});
   }
    //Тоді хешуємо пароль і створюємо користувача
    const hashedpassword = await bcrypt.hash(password, 12);
    const newUser = await prisma.user.create({
      data: {
        email: email, 
        name: name, 
        password: hashedpassword
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });
       res.status(201).json({message: "Успішно створено користувача!", user: newUser});
  }catch(error){
    return res.status(500).json({error: error.message});
  }
});

//Авторизація користувача
app.post('/auth/login', async (req, res) => {
  const {email, password} = req.body;
  try{
    //перевірка на наявність заповнених полів
    if(!email || !password){
      return res.status(400).json({error: "Необхідно заповнити усі поля! "});
    }
    //шукаємо користувача за email
    const user = await prisma.user.findUnique({
      where: {email}
    });
     //якщо користувача не знайдено 
     if(!user){
      return res.status(400).json({error: "Не існує такого користувача!"});
     }
     //перевірка пароля
     const ispassword = await bcrypt.compare(password, user.password);
     if(!ispassword){
      return res.status(400).json({error: "Не правильний пароль або email!"});
     }
     //якщо все добре генеруємо токен
     const token = jwt.sign({userId: user.id}, SECRET_KEY, {expiresIn: "1h"});
      res.status(200).json({message: "Успішно авторизовано користувача!", token: token});
  }catch(error){
    return res.status(500).json({error: error.message});
  }
});

//Створення курсу
app.post('/courses', authMiddleware, async (req, res) => {
  const {title, description, price} = req.body;
  try{
    if(!title || !description || !price){
      return res.status(400).json({error: "Необхідно заповнити усі поля!"});
    }
    const newcourse = await prisma.course.create({
      data: {
        title: title,
        description: description,
        price: price,
        authorId: req.user.userId
      }
    });
      res.status(201).json({message: "Успішно створено курс!", course: newcourse});
  }catch(error){
    return res.status(500).json({error: error.message});
  }
});

//Отримує список усіх курсів, створених поточним авторизованим користувачем
app.get('/courses/my-courses', authMiddleware, async (req, res) => {
  try{
    const courses = await prisma.course.findMany({
      where: {authorId: req.user.userId},
      include: {
        author: {
          select: {id: true, name: true, email: true}
        }
      }
    });
     res.status(200).json(courses);
  }catch(error){
    return res.status(500).json({error: error.message});
  }
});

//Видалення курсу за id
app.delete('/courses/:id', authMiddleware, async (req, res) => {
  const {id} = req.params; //достає id курсу з url
  try{
    //пошук курсу і перевірка чи існує взагалі
    const course = await prisma.course.findUnique({
      where: {id: Number(id)}
    });
     if(!course){
      return res.status(404).json({error: "Не знайдено курс!"});
     }
     //перевіряємо чи це один і ой самий користувач робить запит
     if(course.authorId !== req.user.userId){
      return res.status(403).json({error: "Ви можете видаляти лише свої курси!"});
     }
     await prisma.course.delete({
      where: {id: Number(id)}
     });
      res.status(200).json({message: "Успішно видалено!"});
  }catch(error){
    return res.status(500).json({error: error.message});
  }
});

//для розробника аби знати чи сервер працює чи ні
app.listen(PORT, () => {  
  console.log("Сервер готовий до роботи ! Відкрийте ось це посилання:" + 'http://localhost:' + PORT);
});
