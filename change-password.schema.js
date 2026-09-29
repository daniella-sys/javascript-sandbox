const {z} = require('zod');

const changePasswordSchema = z.object({
    body: z.object({
        oldPassword: z.string().min(1, "Введіть поточний пароль!"),
        newPassword: z.string()
        .min(8, "Новий пароль має містити мінімально 8 символів!")
        .max(64, "Пароль надто довгий!")
        .regex(/[A-Z]/, "Пароль повинен містити хоча б одну велику літеру!") //Шукає в рядку хоть одну велику літеру від А-Z 
        .regex(/[0-9]/, "Пароль повинен містити хоча б одну цифру!"), //якщо не знаходить то виводе помилку 
        confirmPassword: z.string().min(1, "Підтвердіть новий пароль!") //додаткове поле підтвердження введеного нового пароля
    }).refine((data) => data.newPassword === data.confirmPassword, {
        message: "Новий пароль та підтвердження не збігаються!", //refine перевірки якщо умова не правдива виводить message 
        path: ['confirmPassword'] //і вказує поле де зявилась помилка (path: [])
    }).refine((data) => data.oldPassword !== data.newPassword, {
        message: "Новий пароль повинен відрізнятись від старого!",
        path: ["newPassword"]
    })
});
module.exports = {changePasswordSchema};
