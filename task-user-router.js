//ПІДКЛЮЧАЄМО PRISMA і роутер створюємо
 const express = require('express');
 const router = express.Router();

 // 1. Імпортуємо мідлвари
const { authMiddleware } = require('../middlewares/auth.js');
const { validate } = require('../middlewares/validate.js'); // перевір назву файлу

// 2. Імпортуємо Zod-схему для GET запиту
const { getTasks } = require('../schemas/task.schema.js');

// 3. Імпортуємо контролер
const { getTasks } = require('../controllers/task.controller.js');
 //роутери 
 router.get(
    '/api/tasks',
    authMiddleware,
    validate(getTasks, 'query'),
    getTaskk
 );
 module.exports = router;
