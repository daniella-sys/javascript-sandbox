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
