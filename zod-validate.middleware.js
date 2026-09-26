//Middlewares 
const validate = (schema) => (req, res, next) => {
  try{
    const parsed = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query
    });
    //Перезаписуємо дані 
    if(parsed.params) req.params = parsed.params;
    if(parsed.body) req.body = parsed.body; //якщо користувач передав дані ми їх прогнали 
                                        //через parse і якщо вони є перезаписуємо аби далі з ними працювати
    next();
  }catch(error){
    return res.status(400).json({
      success: false,
      errors: error.errors ? error.errors.map((e) => e.message) : [error.message]
    });
  }
};
module.exports = {validate};
