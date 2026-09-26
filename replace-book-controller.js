//Імпортуємо призму 
const prisma = require('../lib/prisma.js');

const replaceBook = async (req, res) => {
  try{
    const userID = req.user.userId;
    const bookID = req.params.id; //вже число завдяки Zod 
    //Шукаємо книгу за ID
    const findbook = await prisma.book.findUnique({
      where: {id: bookID}
    });
    //перевірка чи знайшли чи ні
    if(!findbook){
      return res.status(404).json({
        success: false,
        message: "Книгу не знайдено!"
      })
    }
    //Перевірка чи здійснює запит поточний користувач 
    if(findbook.userId !== userID){
      return res.status(403).json({
        success: false,
        message: "Здійснювати поточні дії може лише користувач!"
      });
    }
    //Якщо все добре оновлюємо дані
    const updatedani = await prisma.book.update({
      where: {
        id: bookID
      },
      data: {
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
        description: req.body.description || null,
        isRead: req.body.isRead
      }
    });
    //Повертаємо користувачу дані 
    return res.status(200).json({
      success: true,
      message: "Успішно оновлено дані!",
      book: updatedani
    });
  }catch(error){
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
module.exports = {replaceBook};
