const { z } = require('zod'); //імпорт бібліотеки Zod 
//Схема валідації post 
const createTaskSchema = z.object({
    title: z
    .string({required_error: "Заговолок є обов'язковим полем!"}) // якщо не передано тоді буде виводитись помилка
    .min(3, "Назва завдання має містити мінімум 3 символи!"),

    isCompleted: z
    .boolean()
    .optional() //це означає що поле завершено є не обов'язковим для введення
});
module.exports = {createTaskSchema};
