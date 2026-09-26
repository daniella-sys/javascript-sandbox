//Middlewares 
const validate = (schema) => (req, res, next) => {
  try{
    const parsed = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query
    });
    //Дані за схемою перевіряємо 
    //Перезаписуємо дані 
    //Якщо користувач ввів дані овни пройшли перевірку тоді перезаписуємо аби працювати з цими даними 
    if(parsed.body) req.body = parsed.body;
    if(parsed.params) req.params = parsed.params;
    next();
  }catch(error){
    return res.status(400).json({
      success: false,
      errors: error.errors ? error.errors.map((e) => e.message) : [error.message]
    });
  }
};
module.exports = {validate};
