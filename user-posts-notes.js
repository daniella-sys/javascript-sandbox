//Заключний проект.Повний REST API
//імпорт біблшотек модулів 
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

//створення нотатки 
app.post('/notes', async (req, res) => {
  const {title, content} = req.body; //витягуємо дані з тіла запиту
    if(!title || !content){ //перевірка чи заповнені поля
      return res.status(400).json({error: "Необхідно заповнити усі поля!"});
    }
      //якщо все добре код йде далі
      const newNote = await prisma.note.create({
        data: {
          title,
          content,
          authorId: req.user.userId //з токену передаємо ID
        }
      });
      res.status(201).json({message: "Успішно створено нотатку!", Note: newNote});
});
//створення статті
app.post('/posts', async (req, res) => {
  const {title, content, published} = req.body;
   if(!title || !content){
    return res.status(400).json({error: "Необіхідно заповнити усі поля!"});
   }
     //створюємо статтю
     const newPost = await prisma.post.create({
      data:{
        title,
        content,
        authorId: req.user.userId
      }
     });
       res.status(201).json({message: "Успішно створено статтю!", Post: newPost});
});
