//створюємо контролера 
const prisma = require('../lib/prisma.js');

const getTask = async (req, res) => {
  try{
    //перетворюємо на число або встановлюємо значення за замовчуванням 
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    //скільки будемо пропускати 
    const skip = (page - 1) * limit;
    //створюємо захищений об'єкт користувача 
    const whereConditional = {
      userId: req.user.userId
    }
      //перевірка чи передано isCompleted 
      if(req.query.isCompleted !== undefined){
        whereConditional.isCompleted = req.query.isCompleted === 'true';
      }
      //якщо передано priority будемо перетворювати на число і взнавати пріоритет
      if(req.query.priority){
        whereConditional.priority = Number(req.query.priority);
      }
      //виводимо усі списки тасків 
      const tasks = await prisma.task.findMany({
        where: whereConditional,
        include: { user: {select: {email: true}}},
        take: limit,
        skip: skip
      });
       res.status(200).json(tasks)
  }catch(error){
    return res.status(500).json({error: error.message});
  }
}

//Створення таски за користувачем
const createTask = async (req, res) => {
  const {title, priority, isCompleted} = req.body; //витягуємо дані які будемо створювати до таски 
  try{
    //шукаємо користувача 
    const user = await prisma.user.findUnique({
      where: {id: req.user.userId}
    });
     //перевірка чи існує користувач 
     if(!user){
      return res.status(404).json({error: "Користувача не знайдено!"});
     }
     //користувач існує тоді створюємо таску 
     const taskk = await prisma.task.create({
      data: {
        title: title,
        priority: Number(priority),
        isCompleted: isCompleted !== undefined ? Boolean(isCompleted) : false,
        userId: req.user.userId
      }
     });
      res.status(201).json({message: "Успішно створено таску!", task: taskk});
  }catch(error){
    return res.status(500).json({error: error.message});
  }
}

//Оновлення статусу або даних завдання
const updateTask = async (req, res) => {
  const {id} = req.params; //витягуємо id таски з url
  const {title, isCompleted, priority} = req.body; //витягуємо дані з тіла запиту які будемо оновлювати 
   try{
     //шукаємо завдання яке хочемо оновити
     const task = await prisma.task.findUnique({
      where: {id: Number(id)}
     });
      //перевірка на існування завдання 
      if(!task){
        return res.status(404).json({error: "Не знайдено таску!"});
      }
       //перевіряємо чи це завдання належить конкретному корстувачу що здійснює запит з тим що у базі даних 
       if(req.user.userId !== task.userId){
        return res.status(403).json({error: "Ви можете оновлювати лише власні таски!"});
       }
       //все добре оновлюємо завдання 
       const dataToUpdate = {};
    if (title !== undefined) dataToUpdate.title = title;
    if (isCompleted !== undefined) dataToUpdate.isCompleted = Boolean(isCompleted);
    if (priority !== undefined) dataToUpdate.priority = Number(priority);
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: dataToUpdate
    });
        res.status(200).json({message: "Успішно оновлено таску!", task: updatedTask});
   }catch(error){
    return res.status(500).json({error: error.message});
   }
}

//Видалення завдання
const deleteTask = async (req, res) => {
  const {id} = req.params; //витягуємо id з url
   try{
    //пошук завдання за id
    const task = await prisma.task.findUnique({
      where: {id: Number(id)}
    });
      //перевірка чи існує завдання 
      if(!task){
        return res.status(404).json({error: "Завдання не знайдено!"});
      }
      //перевірка чи належить цьому користувачy
      if(task.userId !== req.user.userId){
        return res.status(403).json({error: "Ви можете видаляти лише свої таски!"});
      }
      //все добре тоді видаляємо 
      const deletetask = await prisma.task.delete({
        where: {id: Number(id)}
      });
      res.status(200).json({message: "Завдання успішно видалено!" });
   }catch(error){
    return res.status(500).json({error: error.message});
   }
}

module.exports = {
  getTask,
  createTask,
  updateTask,
  deleteTask
};
