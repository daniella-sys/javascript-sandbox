//middleware(validation)
const validate = (schema) => (req, res, next) => {
  try{
    const parsed = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query  //проганяємо через схему перевірки наші дані
    });
    if(parsed.params) req.params = parsed.params; //якщо дані перевірено тоді перезаписуємо req.params=parsed.params
    if(parsed.body) req.body = parsed.body; 
    next(); //продовжуємо код 
  }catch(error){
    return res.status(400).json({
      success: false,
      errors: error.errors ? error.errors.map(e => e.message) : [error.message] 
//Zod коли передає помилку створює масив помилок якщо помилка надійшла з Zod за допомогою map виводимо помилку шукаємо якщо 
// ні тоді немає масиву помилок бо не Zod передає помилку тоді існує error.message
    });
  }
}
module.exports = {validate};
