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

//GET — Отримати всі відгуки для книги
app.get('/books/:bookId/reviews', async (req, res) => {
  const {bookId} = req.params; //витягуємо айді книги з URL
  try{
    const Reviews = await prisma.review.findMany({
      where: {
        bookId: Number(bookId) //перетворює на число 
      },
       include: { //підтягує дані з таблиці
        author: {
          select: {
            id: true, //дозволює безпечно повернути дані
            name: true
          }
        }
       }
    });
     res.status(200).json({message: "Успішно отримано відгуки!", reviews: Reviews});
  }catch(error){
    return res.status(500).json({error});
  }
});
//PATCH — Оновити відгук
app.patch('/reviews/:id', authMiddleware, async (req, res) => {
  const {id} = req.params; //отримання айді з URL
  const {text, rating} = req.body; //отримання даних з тіла запису 
     try{
       //шукаємо відгук у бд аби дізнатись чи взагалі він є
       const reviewww = await prisma.review.findUnique({
        where: {
          id: Number(id)
        }
       });
         if(!reviewww){
          return res.status(404).json({error: "Не знайдено!"});
         }
           //ще одна перевірка чи сходиться айді з тим що в базі даних 
           if(reviewww.authorId !== req.user.userId){
            return res.status(403).json({error: "Ви можете редагувати лише власні коментарі!"});
           }
             //якщо все добре код йде далі
             const update = await prisma.review.update({
              where: {
                id: Number(id)
              },
              data: {
                text,
                rating
              }
             });
             res.json({message: "Успішно оновлено!", reviews: update});
     }catch(error){
      return res.status(500).json({error});
     }
});
