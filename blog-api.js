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
  const auth = req.headers.authorization; //витягує токен із заголовка 
   //перевірка
   if(!auth || !auth.startsWith('Bearer ')){
    return res.status(401).json({error: "Токен відсутній або має невірний формат"});
   }
    //пройшла перевірка тоді робимо чистий токен
    const token = auth.split(' ')[1];
     //перевірка токену 
     try{
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      next();
     }catch(error){
      return res.status(401).json({error: error.message});
     }
}
//ЗМІНА ПАРОЛЯ
app.patch('/auth/change-password', authMiddleware, async (req, res) => {
  try{
  const {oldPassword, newPassword} = req.body;
    //знайти користувача в БД
    const user = await prisma.user.findUnique({
      where: {id: req.user.userId}
    });
     //дістаємо користувача який здійснуює запит за допомогою токена 
     //звіряємо введений старий пароль із тим що у БД
     const iSMatch = await bcrypt.compare(oldPassword, user.password);
      if(!iSMatch){
        return res.status(400).json({error: "Не правильно введений пароль!"});
      }
        //якщо все правильно код йде далі і хешує новий пароль
        const hashedPassword = await bcrypt.hash(newPassword, 10);
         //зберігємо пароль у БД
         await prisma.user.update({
          where: {id: req.user.userId},
          data: {password: hashedPassword}
         });
           res.status(200).json({message: "Успішно змінено пароль!"});
        }catch(error){
          return res.status(500).json({error: error.message});
        }
});
//ОНОВЛЕННЯ ДАНИХ
app.put('/profile', authMiddleware, async (req, res) => {
  try{
  const {name, email} = req.body; //витягуємо дані
    if(!name && !email){
      return res.status(400).json({error: "Необхідно вказати ці дані!"});
    }
      //Якщо все добре йдемо оновлювати
      const updateUser = await prisma.user.update({
        where: {id: req.user.userId},
        data: {name: name, email: email},
        select: {id: true, name: true, email: true}
      });
        res.status(200).json({message: "Успішно оновлено!", user: updateUser});
    }catch(error){
       return res.status(500).json({error: error.message});
    }
});
//CREATE
app.post('/posts', authMiddleware, async (req, res) => {
  try{
  const {title, content} = req.body; //витягуємо дані
   const newPost = await prisma.post.create({
     data: {
      title: title,
      content: content,
      authorId: req.user.userId //той хто виконує запит наразі
     }
   });
     res.status(201).json({message: "Успішно створено!", post: newPost});
  }catch(error){
     return res.status(500).json({error: error.message});
  }
});

//Отримує всі пости з БД разом із даними користувача
app.get('/posts', async (req, res) => {
  try{
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {id: true, name: true}
      }
    }
  });
   res.status(200).json(posts);
}catch(error){
  return res.status(500).json({error: error.message});
}
});

app.delete('/posts/:id', authMiddleware, async (req, res) => {
  const {id} = req.params; //витягуємо кокретне id статті
   try{
     //пошук в БД чи існує стаття
     const find = await prisma.post.findUnique({
      where: {id: Number(id)}
     });
       if(!find){
        return res.status(404).json({error: "Статтю незнайдено!"});
       }
        //перевірка чи належить даний пост кокретному користувачу що здійснює запит із тим що є в БД
        if(find.authorId != req.user.userId){
          return res.status(403).json({error: "Можеш видаляти лише свої статті!"});
        }
          //якщо все добре видаляємо 
          await prisma.post.delete({
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

