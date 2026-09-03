const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma.js');

const SECRET_KEY = 'your_secret_key_here';
//Мідлвари
const autMiddleware = async (req, res, next) => {
    const auth = req.headers.authorization;
     if(!auth || !auth.startsWith('Bearer ')){
        return res.status(401).json({error: "Не існує токен або у неправильному форматі!"});
     }
      const token = auth.split(' ')[1];
      try{
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
      }catch(error){
        return res.status(401).json({error: error.message});
      }
}

//перевірка проєкту за конкретним id
const checkProjectOwner = async (req, res, next) => {
    const {id} = req.params; //витягуємо id з url
    try{
        //пошук проекту за айді і перевірка
        const project = await prisma.project.findUnique({
            where: {id: Number(id)}
        });
          //перевірка на наявність 
          if(!project){
            return res.status(404).json({error: "Не знайдено!"});
          }
            //перевірка на користувача 
            if(project.userId !== req.user.userId){
                return res.status(403).json({error: "Ви можете змінювати лише власні проекти!"});
            }
             req.project = project;
             next();
    }catch(error){
        return res.status(401).json({error: error.message});
    }
}

//експортуємо мідлвари 
module.exports = {
    autMiddleware,
    checkProjectOwner
}
