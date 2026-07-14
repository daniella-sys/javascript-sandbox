// імпорт бібліoтеки
import express from 'express';
//імпорт модуля
import fs from 'fs';
const PORT = 2000;
const app = express();
app.use(express.json()); //виконується для всіх запитів

//HTTP запит GET
app.get('/repos', (req, res) => {
   const readFile = fs.readFileSync("yggh.json", "utf-8"); //зчитує файл
   const transformation = JSON.parse(readFile); //перетворення з тексту на масив
   res.json(transformation);
});
//HTTP запит POST
app.post('/repos', (req, res) => {
   const read = fs.readFileSync('yggh.json', 'utf-8');
   const transf = JSON.parse(read); //це і є наший масив до якого звертатись
   if(!req.body.title){
    res.status(400).json({"error": "Виникла помилка !"});
   }else{
    let object = {
      id: transf.length + 1,
      title: req.body.title,
      description: req.body.description,
      language: req.body.language
    };
    //додаємо масив
    transf.push(object);
   const updatedText = JSON.stringify(transf, null, 2);
    fs.writeFileSync('yggh.json', updatedText);
    res.status(201).json(object);
   }
});
//HTTP запит DELETE
app.delete('/repos/:id', (req, res) => {
    const text = fs.readFileSync('yggh.json', 'utf-8');
    const reposArray = JSON.parse(text); // Зберігаємо масив сюди
    const takesId = Number(req.params.id);
    const found_index = reposArray.findIndex(item => item.id === takesId); 
    if(found_index === -1){
      res.status(404).json({"error": "Not Found"});
    }else{
      reposArray.splice(found_index, 1);
      const updatedText = JSON.stringify(reposArray, null, 2); // Перетворюємо МАСИВ у текст
      fs.writeFileSync('yggh.json', updatedText); // Записуємо ТЕКСТ у файл
      res.status(200).json({"message": "Успішне видалення!"});
    }
 });
 //HTTP запит PUT
 app.put('/repos/:id', (req, res) => {
   const readffile = fs.readFileSync('yggh.json', 'utf-8'); //зчитує дані з файла + масив
   const reposArray = JSON.parse(readffile);
   const taked_ID = Number(req.params.id);
   const foundobject = reposArray.find(item => item.id === taked_ID);
   if(!foundobject){
    res.status(404).json({"error": "Not Found"});
   }else{
    //оновлює поля
    foundobject.title = req.body.title || foundobject.title;
        foundobject.description = req.body.description !== undefined ? req.body.description : foundobject.description;
    foundobject.language = req.body.language !== undefined ? req.body.language : foundobject.language
    const updatedText = JSON.stringify(reposArray, null, 2);
    fs.writeFileSync('yggh.json', updatedText);
    res.status(200).json(foundobject);
   }
});
 //для розробника
app.listen(PORT, () => {
  console.log("===Сервер успішно запущено! Введіть посилання в браузер===" + "http://localhost:" + PORT);
});
//GET та POST — на http://localhost:2000/repos
//DELETE та PUT — на http://localhost:2000/repos/1 (або інше ID наприкінці).
