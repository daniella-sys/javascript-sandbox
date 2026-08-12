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

//midlware
const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization; //витягнули 
  if(!auth || !auth.startsWith("Bearer ")){
    return res.status(401).json({ error: 'Відсутній токен авторизації' });
  }
  //витягуємо чистий токен 
  const token = auth.split(" ")[1];
  try{
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  }catch(error){
    return res.status(403).json({ error: 'Недійсний або застарілий токен' });
  }
}
//http запит get
app.get('/profile', authMiddleware, async (req, res) => {
  try{
   const user = await prisma.user.findUnique({
    where: {
      id: req.user.userId
    },
    select: {
      id: true,
      name: true,
      email: true
    }
   });
   if(!user){
    return  res.status(404).json({ error: 'Користувача не знайдено' });
  }
   res.status(200).json({message: "Успішно показано деталі профілю!"});
  }catch(error){
     return res.status(500).json({error});
  }
});
//http get
app.get('/status', authMiddleware, async (req, res) => {
  try{
    res.status(200).json({id: req.user.userId, email: req.user.email});
  }catch(error){
    return res.status(500).json({error});
  }
});
//для розробника аби знати чи сервер працює чи ні
app.listen(PORT, () => {
  console.log("Сервер готовий до роботи ! Відкрийте ось це посилання:" + 'http://localhost:' + PORT);
});
