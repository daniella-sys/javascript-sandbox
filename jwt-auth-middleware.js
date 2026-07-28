//підключення бібліотек та модуля
import fs from 'fs';
import jwt from 'jwtwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
const PORT = 5000;
const app = express();
const SECRET_KEY  = 'hjbdbiudbig2773gbc=-mdjnj' //токен сервера
app.use(express.json()); //виконується для всіх запитів 
//авторизація 
app.post('/register', (req, res) => {
   const read_file = fs.readFileSync('yggh.json', 'utf-8');
   const masuv = JSON.parse(read_file);
    if(!req.body.login || !req.body.password){
      return res.status(400).json({"error": "Заповніть усі поля!"});
    }else{
      //хешуємо пароль 
      const salt = 10;
      const password = req.body.password;
      const hashed_password = bcrypt.hashSync(password, salt);
      let new_masuv = {
         id: masuv.length + 1,
         login: req.body.login,
         password: hashed_password
      };
      masuv.push(new_masuv);
      const update_file = JSON.stringify(masuv, null, 2);
      fs.writeFileSync('yggh.json', update_file);
       res.status(201).json({"message": "Успішне оновлення даних!"});
    }
});
//вхід
app.post('/login', (req, res) => {
    const read_file = fs.readFileSync('yggh.json', 'utf-8');
    const masuv = JSON.parse(read_file);
    if(!req.body.login || !req.body.password){
      return res.status(400).json({"error": "Заповніть усі поля!"});
    }
     const find_user_login = masuv.find(item => item.login === req.body.login);
     if(!find_user_login || !bcrypt.compareSync(req.body.password, find_user_login.password)){
      return res.status(401).json({"error": "Не правильний логін або пароль !"});
     }else{
      //створення для користувача токена 
      const token = jwt.sign({id: find_user_login.id, login: find_user_login.login}, SECRET_KEY, {expiresIn: '1h'});
      return res.status(200).json({"message": "Успішний вхід!", "Token": token});
     }
});
//midlware
const checkAuth = (req, res, next) => {
   const auth = req.headers['authorization']; //тут лежить токен беремо 
   const token = auth && auth.split(' ')[1]; //вирізаємо все непотрібне залишаємо лише токен 
   if(!token){ //перевірка наявності токену  
      return res.status(401).json({"error": "Токен не надано"});
   }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if(err){
          return res.status(403).json({"error": "Помилка валідації токена"});
      }else{
         req.user = decoded;
         next();
      }
    });
}
//HTTP запит GET
app.get('/profile', checkAuth, (req, res) => {
   res.status(200).json({"message": "Ласкаво просимо у ваш кабінет!", "userId": req.user.id, "userLogin": req.user.login});
});
//для розробника 
app.listen(PORT, () => {
  console.log("Сервер готовий до роботи ! Відкрийте ось це посилання:" + 'http://localhost:' + PORT);
});
