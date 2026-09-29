//import prisma
const prisma = require('../lib/prisma.js');
const bcrypt = require('bcrypt');

const changePassword = async (req, res) => {
  try{
    const USERID = req.user.userId;
    const {oldPassword, newPassword} = req.body;

    //Шукаємо користувача в БД
    const find_user = await prisma.user.findUnique({
      where: {id: USERID}
    });
    //Перевірка чи існує взагалі користувач що здійснює поточний запит 
    if(!find_user){
      return res.status(404).json({
        message: "Користувача не знайдено!",
        success: false
      })
    }
    //перевірка чи збігаються паролі(старий парол із тим що ввів користувач у полі старий пароль)
    const isOLd_password_compare = await bcrypt.compare(oldPassword, find_user.password); 
                                                        //старий введений пароль //старий пароль із БД
     //перевірка чи зійшлись паролі
     if(!isOLd_password_compare){
      return res.status(400).json({
        success: false,
        message: "Не правильний поточний пароль!"
      })
     }
     //Якщо збіглись тоді хешуємо 
     const salt = 12;
     const hashedPassword = await bcrypt.hash(newPassword, salt);
     //Оновлюємо пароль 
     await prisma.user.update({
      where: {id: USERID},
      data: {
        password: hashedPassword
      }
     });
     //повертаємо інформацію користувачу 
     return res.status(200).json({
      success: true,
      message: "Успішно оновлено пароль!"
     });
  }catch(error){
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
module.exports = {changePassword};
