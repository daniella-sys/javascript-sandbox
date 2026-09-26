//Імпортуємо призму 
const prisma = require('../lib/prisma.js');

const replaceBookStatus = async (req, res) => {
  try{
    const bookID = req.params.id;
    const userID = req.user.userId;

    //Пошук книги за id
    const findbook = await prisma.book.findUnique({
      where: {id: bookID}
    });
    //Перевірка на наявність 
    if(!findbook){
      return res.status(404).json({
        message: "Книгу не знайдено!",
        success: false
      });
    }
    //Перевірка чи поточний користувач здійснює запит 
    if(findbook.userId !== userID){
      return res.status(403).json({
        message: "Ці дії може виконувати лише поточний користувач!",
        success: false
      });
    }
    //Якщо все добре оновлюємо дані
    const updateDani = await prisma.book.update({
      where: {id: bookID},
      data: {
        isRead: req.body.isRead,
        description: req.body.description
      }
    });
    //Повертаємо дані користувачу
    return res.status(200).json({
      success: true,
      message: "Успішно оновлено книгу!",
      Book: updateDani
    });
  }catch(error){
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
module.exports = {replaceBookStatus};
