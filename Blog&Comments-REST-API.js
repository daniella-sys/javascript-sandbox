//Фінальний проєкт «Blog & Comments API»
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

//Роути Авторизації (Auth)
app.post('/register', async (req, res) => {
  //витягуємо дані
  const {name, email, password, bio} = req.body;
   //перевірка чи передав користувач усі дані
   if(!name || !email || !password){
    return res.status(400).json({error: "Необіхдно ввести усі дані!"});
   }
    try{
      const hashedPassword = await bcrypt.hash(password, 12); //захешували пароль
       //зберігаємо користувача в БД
       const newUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          bio: bio
        }
       });
       //відправляємо користувачу відповідь
       res.status(201).json({message: "Успішно створено користувача!", user: newUser});
    }catch(error){
      return res.status(500).json({error: error.message});
    }
});
app.post('/login', async (req, res) => {
  try{
  const {email, password} = req.body; //витягуємо дані з того що вказав користувач у тілі запиту
     if(!email || !password){
      return res.status(400).json({error: "Необіхдно вказати усі поля!"});
     }
       //пошук користувача в БД(за email)
       const poshyk = await prisma.user.findUnique({
        where: {email}
       }); //шукаємо користувача за таким email у БД
        if(!poshyk){
          return res.status(400).json({error: "Не знайдено користувача з таким email!"});
        }
          //перевірка пароля
          const isPasswordValid = await bcrypt.compare(password, poshyk.password);
          if(!isPasswordValid){
            return res.status(400).json({error: "Не правильний пароль!"});
          }
          //Якщо все добре генеруємо JWT-токен
          const token = jwt.sign({userId: poshyk.id}, SECRET_KEY, {expiresIn: "1h"});
          //повернення токену
          res.status(200).json({message: "Успішно створено токен!", token: token});
    }catch(error){
      return res.status(500).json({error: error.message});
    }
});

//мідлвар
const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization; //витягуємо токен з заголовку
   if(!auth || !auth.startsWith('Bearer')){ //якщо немає токену з заголовком 
    return res.status(401).json({error: "Немає доступу, відсутній токен"});
   }
   const token = auth.split(' ')[1];
    try{
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      next();
} catch(error) {
  return res.status(401).json({ error: "Недійсний або прострочений токен" });
}
}

//Управління Профілем Користувача (User Profile & Security)
app.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        posts: true,      // пости користувача
        comments: true    // коментарі користувача
      }
    });
    res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Оновлення даних name, bio
app.patch('/me', authMiddleware, async (req, res) => {
  const {name, bio} = req.body; //користувач має передати дані аби змінити 
  try{
    const updateUser = await prisma.user.update({
      where: {id: req.user.userId},
      data: {
        ...(name && {name}), //якщо імя чи біо передали то оновлюємо якщо не передали то ні
        ...(bio && {bio})
      },
       select: {
        id: true,
        name: true,
        bio: true
       }
    });
     res.status(200).json({message: "Успішно оновлено!", user: updateUser});
  }catch(error){
    return res.status(500).json({error: error.message});
  }
});

//зміна пароля
app.patch('/me/password', authMiddleware, async (req, res) => {
  const {oldPassword, newPassword} = req.body;//шукаємо користувача який виконує запит
  try {
    const user = await prisma.user.findUnique({
      where: {id: req.user.userId}
    });
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if(!isMatch){
      return res.status(400).json({error: "Не правильно введений пароль!"});
    }
     //якщо все ок хешуємо пароль 
     const hashedmnewpassword = await bcrypt.hash(newPassword, 12);
     //збергіємо у БД
     await prisma.user.update({
      where: {id: req.user.userId}, //знаходимо в БД користувача який виконав цей запит
      data: {password: hashedmnewpassword}
     });
     res.status(200).json({message: "Успішно оновлено пароль!"});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

//Роути Статей (Posts CRUD)
app.post('/posts', authMiddleware, async (req, res) => {
  const {title, content} = req.body;
  try {
    const newPOst = await prisma.post.create({
      data: {
        title: title,
        content: content,
        authorId: req.user.userId //передаємо ID користувача аби знати хто створює статтю
      }
    });
     res.status(201).json({message: "Успішно створено статтю!", post: newPOst});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

//Оновлення статті
app.patch('/posts/:id', authMiddleware, async (req, res) => {
  const {title, content} = req.body;
  const {id} = req.params;
  try{
    const post = await prisma.post.findUnique({
      where: {id: Number(id)}
    });
      if(!post){
        return res.status(404).json({error: "Не знайдено!"});
      }
       if(post.authorId !== req.user.userId){
        return res.status(403).json({error: "Можеш редагувати лише свою статтю!"});
       }
        const updatePost = await prisma.post.update({
          where: {id: Number(id)},
          data: {title, content}
        });
         res.status(200).json(updatePost);
  }catch(error){
    return res.status(500).json({error: error.message});
  }
});
//Видалення статті
app.delete('/posts/:id', authMiddleware, async (req, res) => {
  const {id} = req.params;
  try{
    const find = await prisma.post.findUnique({
      where: {id: Number(id)}
    });
     if(!find){
      return res.status(404).json({error: "Не знайдено статтю!"});
     }
      if(find.authorId !== req.user.userId){
        return res.status(403).json({error: "Можеш видаляти лише свої статті!"});
      }
        await prisma.post.delete({
          where: {id: Number(id)}
        });
         res.status(200).json({message: "Успішно видалено!"});
  }catch(error){
    return res.status(500).json({error: error.message});
  }
});

//Роути Коментарів (Comments CRUD) Оновлення тексту коментаря
app.patch('/comments/:id', authMiddleware, async (req, res) => {
  const {id} = req.params;
  const {text} = req.body;
   try{
    const comment = await prisma.comment.findUnique({
      where: {id: Number(id)}
    });
     if(!comment){
      return res.status(404).json({error: "Не знайдено!"});
     }
      if(comment.authorId !== req.user.userId){
        return res.status(403).json({error: "Ви можете вносити зміни лише у свої коментарі!"});
      }
       const updatecomment = await prisma.comment.update({
        where: {id: Number(id)},
        data: {text}
       });
        res.status(200).json({message: "Успішно оновлено!"});
   }catch(error){
    return res.status(500).json({error: error.message});
   }
});
//Видалення коментаря
app.delete('/comments/:id', authMiddleware, async (req, res) => {
  const {id} = req.params;
  try{
    const find = await prisma.comment.findUnique({
      where: {id: Number(id)}
    });
     if(!find){
      return res.status(404).json({error: "Не знайдено!"});
     }
      if(find.authorId !== req.user.userId){
        return res.status(403).json({error: "Ви можете видаляти лише свій коментарь!"});
      }
      await prisma.comment.delete({
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
