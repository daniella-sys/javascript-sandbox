const {z} = require('zod');

const replaceBookSchema = z.object({
    params: z.object({
        id: z.string().transform((val) => { //перетворює число із рядкового формату на числовий формат якщо не число виведе помилку
            const parsed = Number(val);
            if(isNaN(parsed)){
                throw new Error("ID має бути числом!");
            }
            return parsed; //якщо все добре поверне число уже готове до роботи 
        })
    }),
    body: z.object({
        title: z.string().trim().min(1, "Назва книги є обов'язковою!"),
        author: z.string().trim().min(1, "Автор повинен мати обов'язково назву!"), //валідація полів які поля і яких типів повинні бути 
        year: z.number().int("Рік має бути цілим числом!"),
        description: z.string().optional(),
        isRead: z.boolean({invalid_type_error: "isRead має бути false або true!"}).default(false)
    })
})
module.exports = {replaceBookSchema};
