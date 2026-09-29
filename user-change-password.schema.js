const {z} = require('zod');

const changePasswordSchema = z.object({
    body: z.object({
        oldPassword: z.string().min(1, "Пароль обов'язково повинен бути заповненим!"),
        newPassword: z.string()
        .min(8, "Новий пароль повинен містити мінімально 8 символів!")
        .max(64, "Пароль занадто довгий!")
        .regex(/[A-Z]/, "Пароль повинен містити хоча б одну велику літеру!") //перевіряє наявність хоча б одної 
        .regex(/[0-9]/, "Пароль повинен містити хоча б одну цифру!"), //великої літери від А-Z
        confirmPassword: z.string().min(1, "Підтвердіть новий пароль!"),
    }).refine((data) => data.newPassword === data.confirmPassword, { //перевірки 
        message: "Новий пароль повинен співпадати з підтверджувальним!",
        path: ["confirmPassword"]
    }).refine((data) => data.newPassword !== data.oldPassword, {
        message: "Новий пароль не повинен співпадати з старим паролем!",
        path: ['newPassword']
    })
});
module.exports = {changePasswordSchema};
