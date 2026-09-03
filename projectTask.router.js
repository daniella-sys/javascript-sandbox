const express = require('express') //підключаємо роутери 
const router = express.Router();
 //підключаємо мідлвар та функцію контролера 
const {authMiddleware, checkProjectOwner } = require('../middlewares/auth.js');
const {getProjectById, updateProject, getTasks, createTask} = require('.../router/project.controller.js');

//запит get 
router.get('/api/projects/:id', authMiddleware, checkProjectOwner, getProjectById);

router.patch('/api/projects/:id',authMiddleware, checkProjectOwner, updateProject );

router.get('/api/tasks', authMiddleware, getTasks);
 
router.post('/api/tasks', authMiddleware, createTask);
