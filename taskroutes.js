//ПІДКЛЮЧАЄМО PRISMA і роутер створюємо
 const express = require('express');
 const router = express.Router();

 // 1. Імпортуємо мідлвари
const { authMiddleware } = require('../middlewares/auth.js');
const { validate } = require('../middlewares/validate_middleware.js');

//2. Імпортуємо Zod-схему
const { createTaskSchema } = require('../schema/validation_schema.js');

// 3. Імпортуємо контролер
const {  createTask  } = require('../controllers/task.controller.js');
 //роутер
 router.post(
    '/api/tasks',
    authMiddleware, //перевірка авторизації 
    validate(createTaskSchema), 
     createTask//контролер
 );
 module.exports = router;
 
