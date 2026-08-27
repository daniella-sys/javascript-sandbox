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
  const auth = req.headers.authorization; //витягуємо токен з заголовку
   //перевірка на токен
   if(!auth || !auth.startsWith('Bearer ')){
    return res.status(401).json({error: "Токен відсутній або має невірний формат"});
   }
   const token = auth.split(' ')[1];
   try{
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
   }catch(error){
    return res.status(401).json({error: error.message});
   }
}

//Створення користувача
app.post('/auth/register', async (req, res) => {
  const {name, email, password} = req.body; //витягунули дані
  try{
    if(!name || !email || !password){
      return res.status(400).json({error: "Необхідно вказати ці дані!"});
    }
    //дані вказано тоді створюємо 
    const hashedpassword = await bcrypt.hash(password, 12);
    const newUser = await prisma.user.create({
      data: {
        name: name, 
        email: email,
        password: hashedpassword
      },
      select: {
        name: true,
        email: true
      }
    });
     res.status(201).json({message: "Успішно створено користувача!", user: newUser});
  }catch(error){
    return res.status(500).json({error: error.message});
  }
});
//Створення події
app.post('/events', authMiddleware, async (req, res) => {
  const {name, title, location, price} = req.body;
  try{
    if(!name || !title || !location || !price){
      return res.status(400).json({error: "Необхідно вказати усі дані!"});
    }
    //Всі дані вказані тоді створюємо
    const newEvent = await prisma.event.create({
      data: {
        name: name,
        title: title,
        location: location,
        price: price,
        authorId: req.user.userId //передали id того користувача що виконує запит
      }
    });
      res.status(201).json({message: "Успішно створено подію!", event: newEvent});
  }catch(error){
    return res.status(500).json({error: error.message});
  }
});

//Отримує дані
app.get('/events', async (req, res) => {
  try{
  const events = await prisma.event.findMany({
    include: { //підтягує дані з інших таблиць
      author: {
        select: {id: true, name: true, email: true}
      }
    }
  });
   res.status(200).json(events);
}catch(error){
  return res.status(500).json({error: error.message});
}
});

//Отримує конкретні дані створені цим користувачем 
app.get('/users/my-events', authMiddleware, async (req, res) => {
  try{
    const events = await prisma.event.findMany({
      where: {authorId: req.user.userId},
      include: {
        author: {
          select: {id: true, name: true, email: true}
        }
      }
    });
     res.status(200).json(events);
  }catch(error){
    return res.status(500).json({error: error.message});
  }
});

//Видалення події
app.delete('/events/:id', authMiddleware, async (req, res) => {
  const {id} = req.params; //витягуємо id  події з URL
  try{
     //пошук події в БД
     const find_event = await prisma.event.findUnique({
      where: {id: Number(id)}
     });
       if(!find_event){
        return res.status(404).json({error: "Не знайдено!"});
       }
       //перевірка чи це той користувач що в БД з тим що з токена(здійснює запит)
       if(find_event.authorId !== req.user.userId){
        return res.status(403).json({error: "Ви не можете видаляти змінювати чужі дані!"});
       }
         await prisma.event.delete({
          where: {id: Number(id)}
         });
         res.status(200).json({message: "Успішно видалено подію!"});
  }catch(error){
    return res.status(500).json({error: error.message});
  }
});

//для розробника аби знати чи сервер працює чи ні
app.listen(PORT, () => {  
  console.log("Сервер готовий до роботи ! Відкрийте ось це посилання:" + 'http://localhost:' + PORT);
});
