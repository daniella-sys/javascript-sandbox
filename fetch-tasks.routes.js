//ПІДКЛЮЧАЄМО PRISMA і роутер створюємо
 const express = require('express');
 const router = express.Router();

 // 1. Імпортуємо мідлвари
const { authMiddleware } = require('../middlewares/auth.js');

// 3. Імпортуємо контролер
const { getAllTasks} = require('../controllers/task.controller.js');
 //роутери 
 router.get(
    '/api/tasks',
    authMiddleware, //перевірка авторизації 
    getAllTasks //контролер
 );
 module.exports = router;
