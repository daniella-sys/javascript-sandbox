const { success } = require("zod");

//middleware(validation)
const validate = (schema) => (req, res, next) => {
  try{
    //парсимо і перевіряємо req.body 
    req.body = schema.parse(req.body); //перевіряє дані з тіла запиту по схемі Zod
    next();
  }catch(error){
    return res.status(400).json({
      success: false,
      errors: error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message
      })),
    })
  }
}
module.exports = {validate};
