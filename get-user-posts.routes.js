//ПІДКЛЮЧАЄМО PRISMA і роутер створюємо
 const express = require('express');
 const router = express.Router();

 // 1. Імпортуємо мідлвари
const { authMiddleware } = require('../middlewares/auth.js');

// 3. Імпортуємо контролер
const {  getUserPosts } = require('../controllers/task.controller.js');
 //роутери 
 router.get(
    '/api/posts',
    authMiddleware, //перевірка авторизації 
     getUserPosts //контролер
 );
 module.exports = router;
