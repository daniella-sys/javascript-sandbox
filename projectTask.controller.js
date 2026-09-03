//створюємо контролера 
const prisma = require('.../lib/prisma.js');

//повертає проект за його id
const getProjectById = async (req, res) => {
  const {id} = req.params;
   try{
    const project = await prisma.project.findUnique({
      where: {id: Number(id),
        userId: req.user.userId
      },
      include: {
        user: {
          select: {id: true, name: true, email: true}
        },
        tasks: true
      }
    });
     res.status(200).json(project);
   }catch(error){
    return res.status(500).json({error: error.message});
   }
}

const updateProject = async (req, res) => {
  const {id} = req.params;
  const {title, description, isArchived} = req.body;
   try{
    const project = await prisma.project.findUnique({
      where: {id: Number(id)}
    });
      if(!project){
        return res.status(404).json({error: "Не знайдено!"});
      }
       if(project.userId !== req.user.userId){
        return res.status(403).json({error: "Ви можете змінювати лише власні дані!"});
       }
    const update = await prisma.project.update({
      where: {id: Number(id)},
      data: {
        title: title !== undefined ? title : project.title,
        description: description !== undefined ? description : project.description,
         isArchived: isArchived !== undefined ? isArchived : project.isArchived
      }
    });
     res.status(200).json({message: "Успішно оновлено!", project: update});
   }catch(error){
    return res.status(500).json({error: error.message});
   }
}

//Отримує всі таски поточного залогіненого користувача 
const getTasks = async (req, res) => {
  const {status} = req.query;
   try{
    //перетворення в числа 
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
     //обчислення скількох задач треба пропустити 
     const skip = (page - 1) * limit; 
       const tasks = await prisma.task.findMany({
        where: {userId: req.user.userId,
          status: status },
          take: limit,
          skip: skip
       });
         res.json(tasks);
   }catch(error){
    return res.status(500).json({error: error.message});
   }
}

const createTask = async (req, res) => {
  const { title, description, projectId } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: {
        title: title,
        description: description,
        projectId: Number(projectId),
        userId: req.user.userId //  обов'язково прив'язуємо таску до поточного юзера
      }
    });

    res.status(201).json({ message: "Успішно створено!", task: newTask });
  } catch (error) {
    return res.status(500).json({ error: error.message }); //  виправили комати на крапку res.status().json
  }
}
