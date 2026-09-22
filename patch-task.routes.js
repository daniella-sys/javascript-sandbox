//ПІДКЛЮЧАЄМО PRISMA і роутер створюємо
 const express = require('express');
 const router = express.Router();

 // 1. Імпортуємо мідлвари
const { authMiddleware } = require('../middlewares/auth.js');
const { validate } = require('../middlewares/validate_middleware.js');

//2. Імпортуємо Zod-схему
const { UpdatedTaskSchema } = require('../schema/validation_schema.js');

// 3. Імпортуємо контролер
const { updateTask } = require('../controllers/task.controller.js');
 //роутер
router.patch(
    '/:id',
    authMiddleware,
    validate(UpdatedTaskSchema),
    updateTask
);
module.exports = router;
