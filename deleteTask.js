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

//роут видалення завдання за його id.
app.delete('/tasks/:id', authMiddleware, async (req, res) => {
  const {id} = req.params; //витягуємо ID з URL(у текстовому форматі)
  try{
    //знаходимо за id і чи дійсно є завдання
    const find_task = await prisma.task.findUnique({
      where: {id: Number(id)}, //переводимо у числове значення
    });
      //перевірка якщо немає
      if(!find_task){
        return res.status(404).json({error: "Не знайдено!"});
      }
       //перевірка чи виконує запит саме той користувач що уже є у базі даних 
       if(find_task.userId !== req.user.userId){
        return res.status(403).json({error: "ви можете видаляти лише свої завдання!"});
       }
        //якщо все добре ВИДАЛЯЄМО
        await prisma.task.delete({
          where: {id: Number(id)}
        });
        res.status(200).json({message: "Завдання успішно видалено!"});
  }catch(error){
    return res.status(500).json({error});
  }
});
