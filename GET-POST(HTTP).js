//імпортуємо бібліотеку 
import express from 'express';
const app = express() //виклик функціїї
const PORT = 3000;

//застосовується для всіх запитів які приходять на сервер
app.use(express.json());
//створення масиву з даними використовуємо let тому що будемо ще змінювати
let books = [
   {id: 1, title: 'Blender 3D By Example', author: 'Oscar Baechler', pages: 460},
   {id: 2, title: '1984', author: 'George Orwell', pages: 328},
   {id: 3, title: 'The Witcher: The Last Wish', author: 'Andrzej Sapkowski', pages: 380}
];

//Запит GET
app.get('/books', (req, res) => {
    res.json(books);
});
//POST запит
app.post('/books', (req, res) => {
   const newbooks = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    pages: req.body.pages
   };
   books.push(newbooks); //беремо масив з усіма об'єктами до них додаємо наший новий об'єкт який створили у запиті(без res)
   res.status(201).json(newbooks);
});

app.listen(PORT, () => {
    console.log("===Сервер успішно запущений! Відкрийте посилання у браузері===" + "https://localhost:" + PORT);
});
