//створюємо контролера 
const prisma = require('../lib/prisma.js');

const getTaskk = async (req, res) => {
  try{
    const {page, limit} = req.query;
    //вираховуємо скільки елементів будемо пропускати 
    const skip = (page - 1) * limit;
    //робимо запит до БД
    const task = await prisma.task.findMany({
      where: {userId: req.user.userId},
      skip: skip,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    });
      //повертаємо результат 
      res.json({
        page,
        limit,
        task
      });
  }catch(error){
    return res.status(500).json({error: error.message});
  }
}
module.exports = {getTaskk}
