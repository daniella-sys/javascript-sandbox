//import prisma
const prisma = require('../lib/prisma.js');
const bcrypt = require('bcrypt');

const changePassword = async (req, res) => {
  try{
    //витягуємо дані
    const USERID = req.user.userId;
    const {oldPassword, newPassword} = req.body;

    //шукаємо користувача за ID в БД
    const find_user = await prisma.user.findUnique({
      where: {id: USERID}
    });
    //ЯКЩО не знайдено 
    if(!find_user){
      return res.status(404).json({
        success: false,
        message: "Користувача не знайдено!"
      })
    }
    //Перевірка пароля 
    const Compare_passwords = await bcrypt.compare(oldPassword, find_user.password);
    if(!Compare_passwords){
      return res.status(400).json({
        success: false,
        message: "Перевірте введений пароль!"
      })
    }
    //Якщо все добре хешуємо пароль і оновлюємо
    const salt = 12;
    const hashedpassword = await bcrypt.hash(newPassword, salt);
    await prisma.user.update({
      where: {id: USERID},
      data: {
        password: hashedpassword
      }
    });
    //Виводимо 
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
