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

//Нова тема — Пагінація + Фільтрація
app.get('/api/tasks', autMiddleware, async (req, res) => {
  const {status} = req.query; //витягнули все що після search
  try{
    //перетворюємо на числа або за замовчуваням виставляємо(показуємо дані порціями починаючи з 1 закінчуючи 10)
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
     //обчислюємо скільки задач будемо пропускати  
     const skip = (page - 1) * limit;
     //виклик БД
     const tasks = await prisma.task.findMany({
      where: {
        userId: req.user.userId,
        status: status
      },
       take: limit,
       skip: skip
     });
      res.json(tasks);
  }catch(error){
    return res.status(500).json({error: error.message});
  }
});

//Реляції 1-до-багатьох + include
app.get('/api/projects/:id', autMiddleware, checkProjectOwner, async (req, res) => {
  const {id} = req.params; //витягуємо id з URL
   try{
    //оскільки один з мідлварів виконує перевірку над проєктом тоді просто виводимо 
    const project = await prisma.project.findUnique({
      where: {id: Number(id)},
      include: {
        user: {
          select: {id:true, name: true, email: true}
        }, 
        tasks: {
          select: { id: true, title: true, status: true, dueDate: true}
        }
      }
    });
     res.status(200).json(project);
   }catch(error){
    return res.status(500).json({error: error.message});
   }
});

//Практика CRUD — Оновлення проекту
app.patch('/api/projects/:id', autMiddleware, async (req, res) => {
  const {id} = req.params; //витягнули id проекту з url
  const {title, description, isArchived} = req.body; //витягнули з запиту тіла
   try{
     //шукаємо проект в Бд щоб знати чи існує взагалі
     const project = await prisma.project.findUnique({
      where: {id: Number(id)}
     });
      if(!project){
        return res.status(404).json({error: "Не знайдено!"});
      }
      if(project.userId !== req.user.userId){
        return res.status(403).json({error: "Ви можете оновлювати лише свої проекти!"});
      }
       const updatedproject = await prisma.project.update({
      where: { id: Number(id) },
      data: {
        // Оновлюємо поле, тільки якщо його передали в body, інакше залишаємо старе
        title: title !== undefined ? title : project.title,
        description: description !== undefined ? description : project.description,
        isArchived: isArchived !== undefined ? isArchived : project.isArchived
      }
    });
         res.status(200).json({message: "Успішно оновлено!", project: updatedproject});
   }catch(error){
    return res.status(500).json({error: error.message});
   }
});
// запуск сервера
app.listen(PORT, () => {  
  console.log("Сервер готовий до роботи! Відкрийте посилання: http://localhost:" + PORT);
});
