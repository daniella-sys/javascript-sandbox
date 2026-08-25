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
//Мідлвар авторизації
const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization; //витягуємо токен з заголовку
   //перевірка
   if(!auth || !auth.startsWith('Bearer ')){
    return res.status(401).json({ error: "Токен відсутній або має невірний формат" });
   }
   const token = auth.split(' ')[1]; //обрізаємо все лишнє аби мати чистий токен
    try{
      const decoded = jwt.verify(token, SECRET_KEY); //перевіряти токен
      req.user = decoded; //розшифровувати дані
      next(); //і пускати код далі
    }catch(error){
      return res.status(401).json({error: error.message});
    }
}

//Зміна пароля поточного авторизованого користувача
app.patch('/users/change-password', authMiddleware, async (req, res) => {
  const {oldPassword, newPassword} = req.body;
  try{
   //перевірка
   if(!oldPassword || !newPassword){
    return res.status(400).json({error: "Необіхдно заповнити усі поля!"});
   }
   //якщо дані передані то...
    //шукаємо користувача який виконує запит(бажає змінити пароль)
    const find_user = await prisma.user.findUnique({
      where: {id: req.user.userId}
    });
     const isMatch = await bcrypt.compare(oldPassword, find_user.password); //перевіряємо чи збігається пароль 
      if(!isMatch){
        return res.status(401).json({error: "Невірний старий пароль"});
      }
      //якщо збігається оновлюємо пароль і хешуємо 
      const hashedpassword = await bcrypt.hash(newPassword, 12);
      await prisma.user.update({
        where: {id: req.user.userId}, //шукаємо користувача який виконує запит за id
        data: {password: hashedpassword }
      });
        res.status(200).json({message: "Успішно змінено пароль!"});
    }catch(error){
      return res.status(500).json({error: error.message});
    }
});

//оновлення імені та email користувачa
app.put('/users/profile', authMiddleware, async (req, res) => {
  const {email, name} = req.body; 
  // перевірка чи передані усі дані
  try{
  if(!email && !name){
    return res.status(400).json({error: "Необхідно вказати усі поля!"});
  }
   //якщо усі поля передані то оновлюємо
    const update = await prisma.user.update({
      where: {id: req.user.userId},
      data: {email, name},
      select: {id: true, email: true, name: true}
    });
      //повертаємо користувачу
      res.status(200).json({message: "Успішно оновлено дані!", user: update});
  }catch(error){
    return res.status(500).json({error: error.message});
  }
});

//Cтворення нового курсу для користувача
app.post('/courses', authMiddleware, async (req, res) => {
  const {title, description} = req.body;
   //перевірити на наявність 
   if(!title || !description){
    return res.status(400).json({error: "Необіхідно заповнити усі поля!"});
   }
     //Перевірку пройдено тоді = СТВОРЮЄМО КУРС
     const create = await prisma.course.create({
      data: {
        title: title,
        description: description,
        authorId: req.user.userId //той хто здійснює наразі запит
      }
     });
        res.status(201).json({message: "Успішно створено курс!", Course: create});
});

//отримання списку всіх курсів із даними про їх авторів
app.get('/courses', async (req, res) => {
  try{
  const coursesfind = await prisma.course.findMany({
    include: {
      author: { select: {id: true, name: true}}
    }
  });
   res.status(200).json(coursesfind);
}catch(error){
  return res.status(500).json({error: error.message});
}
});

//видалення курсу за його ID
app.delete('/courses/:id', authMiddleware, async (req, res) => {
  const {id} = req.params; 
    try{
      //пошук курсу в БД
      const find = await prisma.course.findUnique({
        where: {id: Number(id)}
      });
        //перевірка чи існує взагалі курс
        if(!find){
          return res.status(404).json({error: "Не знайдено!"});
        }
        //перевіряємо чи це той користувач що треба робить запит
        if(find.authorId !== req.user.userId){
          return res.status(403).json({error: "Ви можете видаляти лише власні курси!"});
        }
        //ЯКЩО ВСЕ ОКЕЙ тоді DELETE
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
