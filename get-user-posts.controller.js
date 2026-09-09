//створюємо контролера 
const { success } = require('zod/mini');
const prisma = require('../lib/prisma.js');

const getUserPosts = async (req, res) => {
  try{
    //виклик до БД аби отримати усі пости конкретного користувача 
    const posts = await prisma.post.findMany({
      where: {authorId: req.user.userId}, //пошук за користувачем
      orderBy: {
        createdAt: 'desc' //сортуванння від найновішого до найстарішого
      }
    });
      //вивід користувачу
      res.status(200).json({
        success: true, //повертає що все успішно пройшло корисно для frontend 
        count: posts.length, //кількість постів користувача
        posts //сам вивід постів
      });
  }catch(error){
    return res.status(500).json({error: error.message});
  }
}
module.exports = {getUserPosts}
