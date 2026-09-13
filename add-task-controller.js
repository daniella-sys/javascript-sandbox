//створюємо контролера 
const { success } = require('zod');
const prisma = require('../lib/prisma.js');

const createTask = async (req, res) => {
  try{
    const {title, isCompleted} = req.body;
    const userId = req.user.userId; //витягнула дані з тіла запиту та айді 
    //Запит до Бд(створюємо таску)
    const Task = await prisma.task.create({
      data: {
        title: title,
        isCompleted: isCompleted,
        userId: userId
      }
    });
     res.status(201).json({
      success: true,
      message: "Успішно створено таску!",
      task: Task
     });
  }catch(error){
    res.status(500).json({error: error.message});
  }
}
module.exports = {createTask};
