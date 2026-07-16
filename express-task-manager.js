//імпорт бібліотеки 
import express from 'express';
import fs from 'fs'; //імпорт модуля
const PORT = 3000;
const app = express(); 
app.use(express.json()); //виконується для всіх запитів
//HTTP запит GET
app.get('/tasks', (req, res) => {
  if(req.query.priority){
    const readfile = fs.readFileSync('yggh.json', 'utf-8'); //зчитує файл
    const parseefile = JSON.parse(readfile) //наший файл не текстом 
    const filtherfile = parseefile.filter(item => item.priority === req.query.priority); //профільтрував масив 
    res.json(filtherfile);
  }else{
    const read = fs.readFileSync('yggh.json', 'utf-8');
    const parse = JSON.parse(read);
    res.json(parse);
  }
});
//HTTP запит POST
app.post('/tasks', (req, res) => {
  const masuv_read = fs.readFileSync('yggh.json', 'utf-8');
  const Masuv = JSON.parse(masuv_read);
   if(!req.body.title){
    res.status(400).json({"error": "Назва задачі обов'язкова!"});
   }else if(Masuv.some(item => item.title === req.body.title)){
    res.status(400).json({"error": "Задача з такою назвою вже існує!"});
   }else{
    let new_masuv = {
      id: Masuv.length + 1,
      title: req.body.title,
      status: req.body.status !== undefined ? req.body.status : "pending"
    };
    const dodav = Masuv.push(new_masuv); //додається в масив
    const nsn = JSON.stringify(Masuv, null, 2);
    fs.writeFileSync('yggh.json', nsn);
    res.status(201).json(new_masuv);
   }
});
//HTTP запит DELETE 
app.delete('/tasks/:id', (req, res) => {
  const masuv = fs.readFileSync('yggh.json', 'utf-8');
  const MASUV = JSON.parse(masuv);
    const ididid = Number(req.params.id);
    const poshyk_id = MASUV.findIndex(item => item.id === ididid);
      if(poshyk_id === -1){
        res.status(404).json({"error": "Задачу не знайдено"});
      }else{
        const remove = MASUV.splice(poshyk_id, 1);
        const transformation = JSON.stringify(MASUV, null, 2);
        const write = fs.writeFileSync('yggh.json', transformation);
        res.status(200).json({"message": "Задачу успішно видалено"});
      }
});
////HTTP запит PUT
app.put('/tasks/:id', (req, res) => {
  const masuv = fs.readFileSync('yggh.json', 'utf-8');
  const MASUV = JSON.parse(masuv);
  const id_number = Number(req.params.id);
  const poshyk_id = MASUV.find(item => item.id === id_number);
  if(!poshyk_id){
    res.status(404).json({"error": "Not Found"});
  }else{
    //оновлення даних
    poshyk_id.title = req.body.title !== undefined ? req.body.title : poshyk_id.title;
    poshyk_id.status = req.body.status !== undefined ? req.body.status : poshyk_id.status;
    poshyk_id.priority = req.body.priority !== undefined ? req.body.priority : poshyk_id.priority;
    //перезаписувати масив 
    const dhj = JSON.stringify(MASUV, null, 2);
    const writemasuv = fs.writeFileSync('yggh.json', dhj);
    res.status(200).json(poshyk_id);
  }
});
 //для розробника
app.listen(PORT, () => {
  console.log("===Сервер успішно запущено! Введіть посилання в браузер===" + "http://localhost:" + PORT);
});
//GET та POST — на http://localhost:2000/tasks
//DELETE та PUT — на http://localhost:2000/tasks/1 (або інше ID наприкінці).
