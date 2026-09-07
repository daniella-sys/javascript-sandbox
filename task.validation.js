const { z } = require('zod'); //імпорт біблішотеки Zod
//Схема валідації get 
const getTasks = z.object({
    page: z.coerce
    .number()
    .int()
    .min(1, "Номер сторінки має бути 1!")
    .default(1), //Якщо нічого не буде вказано тоді за замовчуванням 1 
    limit: z.coerce
    .number()
    .int()
    .min(1, "Мінімум 1 елемент!")
    .max(100, "Максимальна кількість елементів це 100!")
    .default(10) //Якщо не передано тоді за замовчуванням буде стояти 10
});

//Експортуємо 
module.exports = {getTasks};

