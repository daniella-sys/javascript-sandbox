//створюємо контролера 
const prisma = require('../lib/prisma.js');

const createTask = async (req, res) => {
  try{
    const {title, isCompleted} = req.body; 
    const {authorId} = req.user.userId; //витягнули дані з тіла запиту та айді з токену 
     //запит до БД
     const task = await prisma.task.create({
      data: {
        title: title,
        isCompleted: isCompleted,
        authorId: authorId
      }
     });
       return res.status(201).json({
        success: true, ////повертає що все успішно пройшло корисно для frontend 
        message: "Успішно створено таску!",
        task: task
       });
  }catch(error){
    return res.status(500).json({message: error.message});
  }
}
module.exports = {createTask};
