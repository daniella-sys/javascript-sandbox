//Мідлвари щоб працювати з мідлварами потрібно імпортувати біблішотеки 
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma.js');

//Створення ключа сервера 
const SECRET_KEY = '63rgyehdbh8yr76t78uhrbfrnmrfoghbnj';

const authMiddleware = async (req, res, next) => {
  //витягує токен із заголовку 
  const auth = req.headers.authorization;
  //перевірка витягнутого токену 
  if(!auth || !auth.startsWith('Bearer ')){
    return res.status(401).json({error: "Не правильний токен або його немає!"});
  }
  //обрізаємо токен 
  const token = auth.split(' ')[1];
  try{
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  }catch(error){
    return res.status(401).json({error: error.message});
  }
}
//експортуємо мідлвар 
module.exports = {
  authMiddleware
}
