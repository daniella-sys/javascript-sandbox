//імпорт бібліотек та модуля
const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');
//підключення в файл сервера
const express = require('express'); //завантажує фреймворк для обробки http запитів
const {PrismaClient} = require('@prisma/client');// імпортує клас PrismaClient
const app = express();
const prisma = new PrismaClient(); //створює підключення до бази даних
app.use(express.json());
const PORT = 3000;
const SECRET_KEY = 'e6gsyu7287hc3456789iuhgfdxcvbnm, n';

//midlware
const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization; //витягнули 
  if(!auth || !auth.startsWith("Bearer ")){
    return res.status(401).json({ error: 'Відсутній токен авторизації' });
  }
  //витягуємо чистий токен 
  const token = auth.split(" ")[1];
  try{
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  }catch(error){
    return res.status(403).json({ error: 'Недійсний або застарілий токен' });
  }
}
//HTTP(PATCH) Часткове оновлення профілю
app.patch('/me', authMiddleware, async (req, res) => {
  try{
    //передаємо дані 
    const {email, name} = req.body;
    const updateuser = await prisma.user.update({
      where: {id: req.user.userId},
      data: {
        ...(name && {name}),
        ...(email && {email}) //якщо ім'я або пошту передано тоді оновлюємо 
      },
      select: {
        id: true,
        email: true,
        name: true
      } //те що будемо повертати 
    });
    res.status(200).json({message: "Успішно оновлено дані користувача!", user: updateuser});
  }catch(error){
    return res.status(500).json({error});
  }
});
//HTTP(PUT) Повне оновлення профілю
app.put('/me', authMiddleware, async (req, res) => {
  //передаємо дані
  const {email, name} = req.body;
  //перевірка будемо оновлювати лише тоді коли буде вказано обидва поля
  if(!name || !email){
    return res.status(400).json({error: "Усі поля є обов'язковими!"});
  }
  try{
    //якщо все добре код піде сюди і будемо оновлювати 
    const update = await prisma.user.update({
      where: {id: req.user.userId},  //те що будемо змінювати
      data: {name, email},
       select: {
        id: true,
        name: true,
        email: true
       }
    });
     res.status(200).json({message: "Успішно оновлено!"});
  }catch(error){
    return res.status(500).json({error});
  }
});
//HTTP(PATCH) Зміна пароля 
app.patch('/change-password', authMiddleware, async (req, res) => {
  //передаємо дані
  const {oldpassword, newpassword} = req.body;
  //перевірка чи передані обидва поля 
  if(!oldpassword || !newpassword){
    return res.status(400).json({error: "Вкажіть старий та новий паролі"});
  }
   //якщо все ок піде сюди 
    //шукаємо в БД користувача за id
    const user = await prisma.user.findUnique({
      where: {id: req.user.userId} //дістали користувача з БД
    });
    //звіряємо пароль з захешованим (старий пароль) потрібно перевірити чи правильний старий пароль вказаний 
    const isMatch = await bcrypt.compare(oldpassword, user.password);
    if(!isMatch){
      return res.status(400).json({error: 'Старий пароль вказано невірно'});
    }
      //якщо все правильно код йде далі 
   try{
    //хешуємо новий пароль 
    const newpasswordhash = await bcrypt.hash(newpassword, 12);
    //зберігаємо у БД
    await prisma.user.update({
      where: {id: req.user.userId},
      data: {password: newpasswordhash}
    });
     res.status(200).json({message: "Успішна зміна пароля!"});
   }catch(error){
    return res.status(500).json({error});
   }
});
//HTTP(DELETE) Видалення акаунта
app.delete('/me', authMiddleware, async (req, res) => {
  try{
  await prisma.user.delete({
    where: {id: req.user.userId}
  });
    res.status(200).json({message: "Успішно видалено!"});
}catch(error){
  return res.status(500).json({error});
}
});
//для розробника аби знати чи сервер працює чи ні
app.listen(PORT, () => {  
  console.log("Сервер готовий до роботи ! Відкрийте ось це посилання:" + 'http://localhost:' + PORT);
});
