//створюємо контролера 
const prisma = require('../lib/prisma.js');

//Видалення 
const deleteTask = async (req, res) => {
  try{
    //витягуємо інформацію
    const taskId = req.params.id;
    const userId = req.user.userId;

    //Пошук Таски за id
    const task = await prisma.task.findUnique({
      where: {id: taskId}
    });
    //перевірка 
    if(!task){
      return res.status(404).json({
        success: false,
        message: "Таска не знайдена!"
      });
    }
    if(task.userId !== userId){
      return res.status(403).json({
        success: false,
        message: "Немає доступу до видалення таски!"
      });
    }
    //якщо все добре видаляємо таску
    await prisma.task.delete({
      where: {id: taskId}
    });
    res.status(200).json({
      success: true,
      message: "Успішно видалено таску!"
    });
  }catch(error){
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
module.exports = {deleteTask};
