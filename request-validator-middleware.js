//middleware(validation)
const validate = (schema) => (req, res, next) => {
  try{
    //проганяємо значення по схемі перевірки 
    const parsed = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query
    });
     //перевірка чи пройшли дані перевірку і якщо вони є первіреними будемо записувати наші дані 
     if(parsed.params) req.params = parsed.params; //якщо дані пройшли перевірку тоді req.params перезаписуємо 
     if(parsed.body) req.body = parsed.body; //якщо дані пройшли перевірку тоді req.body перезаписуються parsed.body
     next(); //продовжуємо код 
  }catch(error){
    return res.status(400).json({
      success: false,
      errors: error.errors ? error.errors.map(e => e.message) : [error.message] //якщо помилку викидає Zod тоді схема створює
           // масив помилок і якщо так помилка надійшла зі схеми тоді map шукає по всьому 
         // масиву повідомлення з помилкою якщо ні тоді масиву помилок немає так як помилка не надійшла саме від Zod  тоді існує просто error.message 
    });
  }
}
module.exports = {validate};
