//імпортуємо бібліотеку 
import express from 'express';
const PORT = 2000;
const app = express(); //виклик
//виконується для всіх запитів
app.use(express.json());

//створення масиву для зберігання даних
let scenes = [
    { id: 1, name: "cyberpunk_city", objectsCount: 150, renderEngine: "Cycles" },
    { id: 2, name: "lowpoly_forest", objectsCount: 45, renderEngine: "Eevee" },
    { id: 3, name: "sci_fi_corridor", objectsCount: 80, renderEngine: "Cycles" }
];

//GET
app.get('/scenes', (req, res) => {
  if(req.query.engine){
    let fil = scenes.filter(item => item.renderEngine === req.query.engine);
    return res.json(fil); //щоб відправити дані людині 
  }else{
    return res.json(scenes);
  }
});
//POST
app.post('/scenes', (req, res) => {
   if(!req.body.name){
    return res.status(400).json({ error: "Назва сцени обов'язкова!" });
     }else{
    let newscenes = {
      id: scenes.length +1,
      name: req.body.name,
      objectsCount: req.body.objectsCount,
      renderEngine: req.body.renderEngine
    };

    scenes.push(newscenes);
     res.status(201).json(newscenes);
   }
});
//для розробника
app.listen(PORT, () =>{
   console.log("===Сервер успішно запущено! Введіть посилання в браузер===" + "http://localhost:" + PORT);
});
