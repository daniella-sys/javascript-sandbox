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

//потрібно отримати всі таски юзера
app.get('/users/:userId/tasks', async (req, res) => {
  const {userId} = req.params; //витягуємо з URL
  try{
    //знайти всі таски юзера
    const taskss = await prisma.task.findMany({
      where: {
        userId: Number(userId) //перетворили на число 
      },
       include: { //підтягувати дані з інших таблиць 
        author: {
          select: {
            id: true,
            name: true
          }
        }
       }
    });
     res.status(200).json({message: "Успішно передано усі таски, які належать відповідному користувачеві!", TASKS: taskss});
  }catch(error){
    return res.status(500).json({error});
  }
});
//оновлення task
app.patch('/tasks/:id', authMiddleware, async (req, res) => {
  const {id} = req.params;
  const {title, isCompleted} = req.body;
    try{
      //пошук завдання за id
      const find_task = await prisma.task.findUnique({
        where: {
          id: Number(id)
        }
      });
       //перевірка на наявність
        if(!find_task){
          return res.status(404).json({error: 'Не знайдено!'});
        }
        //якщо є завдання тоді
        //перевірка користувача за айді з БД і з токена
        if(find_task.userId !== req.user.userId){
          return res.status(403).json({error: "Внести зміни можеш лише собі!"});
        }
        //пройшла перевірка тоді ОНОВЛЕННЯ
        const update_task = await prisma.task.update({
          where: {
            id: Number(id)
          },
          data: {
            title,
            isCompleted
          }
        });
         res.json({message: "Успішно оновлено завдання!", Task: update_task});
    }catch(error){
      return res.status(500).json({error});
    }
});

