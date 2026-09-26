const {z} = require('zod');

const replaceStatusSchema = z.object({
    params: z.object({
        id: z.string().transform((val) => {
            const parsed = Number(val); //перетворюємо на число 
            if(isNaN(parsed)){
                throw new Error("ID має бути числом!"); //якщо не число тоді помилка
            }
            return parsed; //Якщо все добре то повернемо дані
        })
    }),
    body: z.object({
        isRead: z.boolean({invalid_type_error: "isRead має бути true або false!"}),
        description: z.string().trim().min(5, "Опис або відгук має містити мінімально 5 символів!")
    })
});
module.exports = {replaceStatusSchema};
