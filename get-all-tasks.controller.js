//створюємо контролера 
const { success } = require('zod/mini');
const prisma = require('../lib/prisma.js');


const getAllTasks = async (req, res) => {
  try{
    //виклик до БД витягую таски конкретного користувача 
    const tasks = await prisma.task.findMany({
      where: {userId: req.user.userId},
      orderBy: {
        createdAt: 'desc' //сортування від найновіших до найстаріших 
      }
    });
      res.status(200).json({
        success: true, //для фронтенд-розробника що все пройшло успішно
        count: tasks.length, //кількість завдань користувача       
        tasks //вивід самих завдань 
      });
  }catch(error){
    return res.status(500).json({error: error.message});
  }
}
module.exports = {getAllTasks}
