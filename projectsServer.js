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

//створюємо мідлвар який перевіряє чи належить проєкт конкретному користувачу
const checkProjectOwner = async (req, res, next) => {
  const {id} = req.params; //витягуємо id з Url 
  try{
    //шукаємо проєкт за id і перевіряємо 
    const projec = await prisma.project.findUnique({
      where: {id: Number(id)}
    });
    //перевірка чи взагалі існує проект
    if(!projec){
      return res.status(404).json({error: "Проєкт не знайдено!"});
    }
    //перевіряємо чи той користувач що виконує запит
    if(projec.userId !== req.user.userId){
      return res.status(403).json({error: "Ви можете вносити зміни лише у свої дані!"});
    }
    //все добре зберігаємо задачу і йдемо далі
    req.projec = projec;
    next();
  }catch(error){
    return res.status(401).json({error: error.message});
  }
}
//Отримати всі проєкти поточного користувача
app.get('/api/projects/my-projects', autMiddleware, async (req, res) => {
  try{
    const projects = await prisma.project.findMany({
      where: {userId: req.user.userId},
      include: {
        user: { select: {id: true, name: true, email: true}}, tasks: true
        }
    });
    res.status(200).json(projects);
  }catch(error){
    return res.status(500).json({error: error.message});
  }
});
//Фільтрація задач за статусом
app.get('/api/tasks/search', autMiddleware, async (req, res) => {
  const { status } = req.query;
  try{
    const tasks = await prisma.task.findMany({
      where: {userId: req.user.userId,
        status: status
      }
    });
    res.status(200).json(tasks);
  }catch(error){
    return res.status(500).json({error: error.message});
  }
});
//Оновлення проекту 
app.patch('/api/projects/:id', autMiddleware, checkProjectOwner, async (req, res) => {
   const {title, description} = req.body; //витягуємо дані
   const {id} = req.params;
   //оскільки підключено мідлвар checkProjectOwner то перевіряти не треба одразу оновлюємо 
   try{
    const update = await prisma.project.update({
      where: {id: Number(id)},
      data: {
        title: title,
        description: description
      }
    });
      res.status(200).json({message: "Успішно оновлено!", project: update});
   }catch(error){
    return res.status(500).json({error: error.message});
   }
});

// запуск сервера
app.listen(PORT, () => {  
  console.log("Сервер готовий до роботи! Відкрийте посилання: http://localhost:" + PORT);
});
