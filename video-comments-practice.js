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

//додавання коментаря до конкретного відео
app.post('/videos/:videoId/comments', async (req, res) => {
  const {text} = req.body; //витягуємо з тіла запиту
  const {videoId} = req.params; //беремо айді відео з URL
    //перевірка чи передано текст 
    if(!text){
      return res.status(400).json({error: "Необхідно ввести текст коментаря!"});
    }
     //якщо все окей то код йде у try/catch
     try{
      const newComment = await prisma.comment.create({
        data: {
          text: text,
          videoId: Number(videoId), //перетворюємо з рядку на число
          authorId: req.user.userId //беремо з токену 
        }
      });
        res.status(201).json({message: "Успішно створено коментар!", Коментар: newComment});
     }catch(error){
      return res.status(500).json({error});
     }
});
