// імпорт бібліотек модулів 
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// підключення БД та Express
const { PrismaClient } = require('@prisma/client');
const { duplexPair } = require('stream');
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

//Нова тема — Пагінація + Фільтрація з dueDate
app.get('/api/tasks', autMiddleware, async (req, res) => {
  const {status} = req.query; //витягнули все що після search 
  try{
  //перетворюємо на числа або за замовчуваням виставляємо(показуємо дані порціями починаючи з 1 закінчуючи 10)
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  //обчислюємо скільки задач будемо пропускати  
  const skip = (page - 1) * limit;
  //виклик БД
  const tasks = await prisma.task.findMany({
    where: {
      userId: req.user.userId,
      status: status //пошук за статусом
    },
    take: limit, //скільки візьмемо
    skip: skip //скільки пропустимо 
  });
     res.json(tasks);
    }catch(error){
      return res.status(500).json({error: error.message});
    }
});
//Реляції 1-до-багатьох + include
app.get('/api/projects/:id/tasks', autMiddleware, checkProjectOwner, async (req, res) => {
  const {id} = req.params; //витягуємо id проєкту з url
  try{
    //пошук у БД і вивід 
    const project = await prisma.project.findUnique({
     where: {id: Number(id)},
     include: {
      user: {
        select: {id: true, name: true, email: true},
      },
      tasks: {
          select: { id: true, title: true, status: true, dueDate: true } // tasks поруч із user
        }
     }
    });
     res.status(200).json(project);
  }catch(error){
    return res.status(500).json({error: error.message});
  }
});
//Практика CRUD — Оновлення таски
app.patch('/api/tasks/:id', autMiddleware, async (req, res) => {
  const {id} = req.params; //витягнули id таски з url
  const {title, status, dueDate} = req.body; //витягнули з запиту тіла
   try{
     //шукаємо таску в Бд щоб знати чи існує взагалі
     const task = await prisma.task.findUnique({
      where: {id: Number(id)}
     });
      if(!task){
        return res.status(404).json({error: "Не знайдено!"});
      }
      if(task.userId !== req.user.userId){
        return res.status(403).json({error: "Ви можете оновлювати лише свої таски!"});
      }
       const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        // Оновлюємо поле, тільки якщо його передали в body, інакше залишаємо старе
        title: title !== undefined ? title : task.title,
        status: status !== undefined ? status : task.status,
        dueDate: dueDate ? new Date(dueDate) : task.dueDate
      }
    });
         res.status(200).json({message: "Успішно оновлено!", Task: updatedTask});
   }catch(error){
    return res.status(500).json({error: error.message});
   }
});
// запуск сервера
app.listen(PORT, () => {  
  console.log("Сервер готовий до роботи! Відкрийте посилання: http://localhost:" + PORT);
});
