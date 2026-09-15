const {z} = require('zod'); //імпорт бібліщотеки Zod

//Схема Zod
const deleteTaskSchema = z.object({
    params: z.object({
        id: z.string().transform((val) => {
            const parsed = Number(val); //айді має бути числом а не рядком перетворюємо на число і записуємо 
                                          //у змінну parsed перевірка чи є числом parsed якщо так то створюємо помилку 
                                         //якщо ні виводимо і зупиняємо код return parsed
            if(isNaN(parsed)){
                throw new Error("ID має бути числом!");
            }
            return parsed;
        })
    })
});

module.exports = {deleteTaskSchema};
