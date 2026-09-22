//Імпортуємо призму 
const prisma = require('../lib/prisma.js');

const updatebook = async (req, res) => {
  try{
    //витягуємо дані\
    const bookId = req.params.id;
    const userId = req.user.userId;
      //шукаємо книгу за ID
      const find_book = await prisma.book.findUnique({
        where: {id: bookId}
      });
      //перевірка чи існує ця книга взагалі
      if(!find_book){
        return res.status(404).json({
          success: false,
          message: "Книгу не знайдено спробуйте пізніше!"
        });
        }
          //перевірка чи взагалі той що треба користувач здійснює запит 
        if(find_book.userId !== userId){
          return res.status(403).json({
            success: false,
            message: "Ви можете змінювати лише власні книги!"
          });
      }
       //ЯКЩО все добре оновлюємо 
          const update = await prisma.book.update({
            where: {id: bookId},
            data: req.body
          });
          return res.status(200).json({
            success: true,
            message: "Успішно оновлено книгу!",
            book: update
          });
  }catch(error){
    return res.status(500).json({
      succes: false,
      message: error.message
    });
  }
}
//Експортуємо 
module.exports = {updatebook};
