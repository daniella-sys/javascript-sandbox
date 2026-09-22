//Імпортуємо призму 
const prisma = require('../lib/prisma.js');

const updateTask = async(req, res) => {
  try{
  const taskId = req.params.id;
  const userId = req.user.userId; //витягуємо дані айді таски уже число завдяки Zod
  //Шукаємо нашу Таску 
  const findTask = await prisma.task.findUnique({
    where: {id: taskId}
  });
  //перевірка якщо не знайшли 
  if(!findTask){
    return res.status(404).json({
      success: false,
      message: "Таску не знайдено спробуйте пізніше!"
    });
  }
     //Перевірка на того користувача що здійснюєзапит чи ні 
    if(userId !== findTask.userId){
      return res.status(403).json({
        success: false,
        message: "Ви можете оновлювати лише свої дані!"
      });
    }
    //Якщо все добре оновлюємо таску 
    const updatet = await prisma.task.update({
      where: {id: taskId},
      data: req.body
    });
    return res.status(200).json({
      success: true,
      message: "Успішно оновлено таску!",
      task: updatet
    });
}catch(error){
  return res.status(500).json({
    success: false,
    message: error.message
  });
}
}
module.exports = {updateTask};
