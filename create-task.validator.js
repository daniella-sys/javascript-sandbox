const { z } = require('zod'); //імпорт бібліотеки Zod 
//Схема валідації post 
const createTaskSchema = z.object({
    title: z
    .string()
    .min(3, "Назва завдання має містити мінімум 3 символи!"),

    isCompleted: z
    .boolean()
    .optional() //не обов'язковий рядок 
     //заголоволок має бути рядком і мати мінімальну кількість літер 3 а isCompleted повинно бути булевим і опціональним(не обов'язковим)
});
//експортуємо 
module.exports = {createTaskSchema};
