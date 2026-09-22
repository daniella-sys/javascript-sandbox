const {z} = require('zod');

const updateBookUpdate = z.object({
    //валідуємо params.id
    params: z.object({
        id: z.string().transform((val) => {
            const parsed = Number(val); //ID рядковий формат перетоврюємо на число якщо якимось чином parsed=isNan(не число)
            if(isNaN(parsed)){ //тоді повертаємо помилку якщо все добре повертаємо перетворений
                throw new Error("ID має бути числом!"); //ID який уже перевірений і є числом з яким можна працювати
            }
            return parsed;
        })
    }),
    //валідуємо body 
    body: z.object({
        title: z.string().trim().min(1, "Назва не може бути порожньою!").optional(),
        author: z.string().trim().min(1, "Автор не може бути порожнім!").optional(),
        year: z.number().optional(),
        description: z.string().optional(),
        isRead: z.boolean().optional()
    })
    
     //захист аби не потрапляло порожнє поле оскільки БД всеодно це не оновить марна справа 
     .refine((data) => Object.keys(data).length > 0, {
        message: "Передайте хоча б одне поле для оновлення!"
     })
});
module.exports = {updateBookUpdate};
