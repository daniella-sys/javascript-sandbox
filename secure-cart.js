//підключення бібліотек
import express from 'express';
import fs from 'fs';
const PORT = 3000;
const app = express();
app.use(express.json());  //виконується для всіх запитів
//функція мідлвар
const apiGuard = (req, res, next) => {
  const userkey = req.headers['x-api-key']; //шукає ключ у заголовках
  if(userkey === "developer-vlad"){
    next();
  }else{
    return res.status(401).json({"error": "Невірний або відсутній API ключ!"});
  }
}
app.use(apiGuard); //підключення мідлвара до всіх запитів нище 
//HTTP(GET)
app.get('/cart', (req, res) => {
   const read_file = fs.readFileSync('yggh.json', 'utf-8'); //звичайний текст 
   const parsee = JSON.parse(read_file);
   res.status(200).json(parsee);
});
//HTTP(POST)
app.post('/cart', (req, res) => {
   const read_file = fs.readFileSync('yggh.json', 'utf-8'); //тут текстом треба об'єктом
   const parsefile = JSON.parse(read_file); //масив готовий для роботи 
   if(!req.body.name || !req.body.price){
    return res.status(400).json({"error": "Передані не всі дані!"});
   }else{
    let new_masuv = {
      id: parsefile.length + 1,
      name: req.body.name,
      price: req.body.price
    }
    parsefile.push(new_masuv);
    const updatedText = JSON.stringify(parsefile, null, 2);
    fs.writeFileSync('yggh.json', updatedText);
    res.status(201).json(new_masuv);
   }
});
//для розробника
app.listen(PORT, () => {
  console.log("===Сервер успішно запущено! Введіть посилання в браузер===" + "http://localhost:" + PORT);
});
//GET та POST — на http://localhost:3000/cart
//DELETE та PUT — на http://localhost:3000/cart/1 (або інше ID наприкінці).
