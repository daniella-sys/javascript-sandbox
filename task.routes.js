//ПІДКЛЮЧАЄМО PRISMA і роутер створюємо
 const express = require('express');
 const router = express.Router();

 //підключаємо мідлвар та функцію контролера
 const {authMiddleware} = require('../middlewares/auth.js');
 const {getTask, createTask, updateTask, deleteTask} = require('../project.controller.js');

 //роутери 
 router.get('/api/tasks', authMiddleware, getTask);
 router.post('/api/tasks', authMiddleware, createTask);
router.patch('/api/tasks/:id', authMiddleware, updateTask);
router.delete('/api/tasks/:id', authMiddleware, deleteTask);
