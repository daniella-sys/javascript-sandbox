//Мідлвар 
const validate = (schema) => (req, res, next) => {
  try{
    //Перевірка даних за схемою 
    const parsed = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query
    });
    //перезаписуємо дані які перевірили 
    if(parsed.params) req.params = parsed.params; 
    //Якщо є перевірені дані з id тоді req.params буде дорівнювати тому що вже запаршене
    if(parsed.body) req.body = parsed.body;
    next();
  }catch(error){
    return res.status(400).json({
      success: false,
      errors: error.errors ? error.errors.map(e => e.message) : [error.message]
    });
  }
};

module.exports = {validate};
