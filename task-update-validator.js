const { z } = require('zod');

//Схема валідації
const UpdatedTaskSchema = z.object({
    //валідуємо параметр айді 
    params: z.object({
        id: z.string().transform((val) => {
            const parsed = Number(val); //айді має бути рядком перетворюємо його на число 
            if(isNaN(parsed)){
                throw new Error('ID має бути числовим значенням !');  // якщо не число тоді повертаємо помилку все добре тоді повертаємо наше перетворене айді  
            };
            return parsed;
        })
    }),
      //валідуємо body
    body: z.object({
        title: z.string().trim().min(1, "Назва не може бути порожньою!").optional(),
        author: z.string().trim().min(1, "Назва автора не може бути порожньою!").optional(),
        year: z.number().optional(),
        description: z.string().optional(),
        isRead: z.boolean().optional()
    })
     .refine((data) => Object.keys(data).length > 0, {
        message: "Передайте хоча б одне поле для оновлення!" //перевірка аби не оновлювати і не марнувати час 
                              //на порожній рядок перевірка аби req.body > 0
     })
});
module.exports = {UpdatedTaskSchema};
