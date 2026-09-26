//ПІДКЛЮЧАЄМО PRISMA і роутер створюємо
 const express = require('express');
 const router = express.Router();

 // 1. Імпортуємо мідлвари
const { authMiddleware } = require('../middlewares/auth.js');
const { validate } = require('../middlewares/validate_middleware.js');

//2. Імпортуємо Zod-схему
const { replaceBookSchema } = require('../schema/validation_schema.js');

// 3. Імпортуємо контролер
const { replaceBook } = require('../controllers/project.controller.js');
 //роутер
router.put(
    '/:id',
    authMiddleware,
    validate(replaceBookSchema),
    replaceBook
);
module.exports = router;
