//підключення призма клієнта 
const {PrismaClient} = require('@prisma/client');

//створюємо єдиний об'єкт для призма клієнт 
const prisma = new PrismaClient();
//експортуємо його аби використовувати в інших файлах 
module.exports = prisma;

