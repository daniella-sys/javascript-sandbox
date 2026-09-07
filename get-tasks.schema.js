const { z } = require('zod'); //імпорт біблішотеки Zod
//Схема валідації get 
const getTasks = z.object({
    page: z.coerce
    .number()
    .int()
    .min(1, "Мінімальне значення!")
    .default(1), //якщо нічого користувач не передав тоді за замовчуванням 1 

    limit: z.coerce
    .number()
    .int()
    .min(1, "Мінімальним елементом є 1")
    .max(100, "Максимальна кількість елементів")
    .default(10) //якщо нічого не ввели тоді за замовчуванням 10
});
//Експортуємо 
module.exports = {getTasks};

