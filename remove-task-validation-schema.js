const {z} = require('zod'); //імпорт бібліотеки Zod 
//створення Zod схеми для запиту delete
const deleteTaskSchema = z.object({
    params: z.object({ //перевіряємо params
        id: z.string().transform((val) => {
            const parsed = Number(val); //перетворюємо айді з рядкового значення на число
            if(isNaN(parsed)){
                throw new Error('ID має бути числом!');
            }
            //якщо перетоврили на число і все виконалось повертаємо наше числове значення
            return parsed;
        })
    })
});
//експортуємо 
module.exports = {deleteTaskSchema};
