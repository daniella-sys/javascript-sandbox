const express = require('express') //підключаємо роутери 
const router = express.Router();
 //підключаємо мідлвар та функцію контролера 
const {authMiddleware} = require('../middlewares/auth.js');
const {getProduct, createProduct} = require('.../router/project.controller.js');

//роутери
router.get('/api/products', authMiddleware, getProduct);
router.post('/api/products', authMiddleware, createProduct);
