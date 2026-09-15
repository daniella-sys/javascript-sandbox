//створюємо контролера 
const prisma = require('../lib/prisma.js');

//Видалення таски
const deleteTask = async (req, res) => {
  try{
  const TaskId = req.params.id;
  const userId = req.user.userId;
   //Шукаємо таску в БД
   const task = await prisma.task.findUnique({
    where: {
      id: TaskId
    }
   });
    //перевірка 
    if(!task){
      return res.status(404).json({
        success: false,
        message: "Таску не знайдено!"
      });
    }
      if(task.userId !== userId){
        return res.status(403).json({
          success: false,
          message: "Немає доступу для видалення цієї таски!"
        });
      }
      //якщо все добре видаляємо таску
      await prisma.task.delete({
        where: {id:TaskId}
      });
        return res.status(200).json({
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
