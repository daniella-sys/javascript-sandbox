// імпорт бібліотек модулів 
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// підключення БД та Express
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const PORT = 3000;
const SECRET_KEY = 'ygjdghehgy7t2637eyudghjiwsndn983877e78uhdjn';


// МІДЛВАР АВТОРИЗАЦІЇ
const autMiddleware = async (req, res, next) => {
  const auth = req.headers.authorization;
   if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({error: "Токен відсутній!"});
   }
   const token = auth.split(' ')[1]; //чистий токен
   try{
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
   }catch(error){
    return res.status(500).json({error: error.message});
   }
}
//Створюємо мідлвар який перевіряє чи належить завдання конкретному користувачу 
const checkTaskOwner = async (req, res, next) => {
  const {id} = req.params; //витягуємо id завдання з URL
  try{
    //шукаємо завдання за id 
    const task = await prisma.task.findUnique({
      where: {id: Number(id)}
    });
     //перевірка чи існує взагалі завдання
     if(!task){
      return res.status(404).json({error: "Не знайдено завдання!"});
     }
     //перевіряє чи це той користувач що треба виконує запит чи ні
     if(task.userId !== req.user.userId){
      return res.status(403).json({error: "Ви можете редаговувати лише свої завдання!"});
     }
     //все добре тоді зберігаємо задачу в req і йдемо далі
     req.task = task;
     next();
  }catch(error){
    return res.status(401).json({error: error.message});
  }
}
//Зміна пароля
app.patch('/api/auth/change-password', autMiddleware, async (req, res) => {
  const {oldPassword, newPassword} = req.body; //витягуємо дані
  try{
    //перевірка чи передали задані поля
    if(!oldPassword || !newPassword){
      return res.status(400).json({error: "Необхідно вказати дані!"});
    }
    //шукаємо користувача і перевіряємо чи він є чи ні
    const user = await prisma.user.findUnique({
      where: {id: req.user.userId}
    });
     if(!user){
      return res.status(404).json({error: "Користувача не знайдено!"});
     }
     //Якщо користувач є порівнюємо його старий пароль з захешованим у БД
     const isMatch = await bcrypt.compare(oldPassword, user.password);
     //якщо пароль не сходиться
     if(!isMatch){
      return res.status(400).json({error: "Неправильний пароль або email!"});
     }
     //якщо пароль правильний тоді хешуємо пароль і зберігаємо у БД
     const hashedpassword = await bcrypt.hash(newPassword, 12);
     const newUser = await prisma.user.update({
      where: {id: req.user.userId},
      data: {password: hashedpassword}
     });
      res.status(200).json({message: "Успішно оновлено пароль!"});
  }catch(error){
    return res.status(500).json({error: error.message});
  }
});
//Створення проєкту
app.post('/api/projects',autMiddleware,  async (req, res) => {
  const {title, description} = req.body; //витягуємо дані
  try{
    //перевірка на заповнені поля
    if(!title){
      return res.status(400).json({error: "Необхідно заповнити усі поля!"});
    }
    const newproject = await prisma.project.create({
      data: {
        title: title,
        description: description,
        userId: req.user.userId
      }
    });
      res.status(201).json({message: "Успішно створено проєкт!", project: newproject});
  }catch(error){
    return res.status(500).json({error: error.message});
  }
});
//Видалення задачі
app.delete('/api/tasks/:id', autMiddleware, checkTaskOwner, async (req, res) => {
  const {id} = req.params; //витягуємо id з url
//Оскільки checkTaskOwner уже перевірив існування задачі та права доступу 
//Видаляємо
try{
await prisma.task.delete({
  where: {id: Number(id)}
});
   res.status(200).json({message: "Успішно видалено!"});
  }catch(error){
    return res.status(500).json({error: error.message});
}
});

// запуск сервера
app.listen(PORT, () => {  
  console.log("Сервер готовий до роботи! Відкрийте посилання: http://localhost:" + PORT);
});
