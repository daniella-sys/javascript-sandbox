//middleware(validation)
const validate = (getTasks, target="body") => (req, res, next) => {
    const result = getTasks.safeParse(req[target]);
      //перевірка на помилки 
      if(!result.success){
        return res.status(400).json({
            error: "Помилка валідації вхідних даних",
            details: result.error.format()
        });
      }
          //якщо все добре код йде далі
        req[target] = result.data;
        next(); //продовжуємо код 
};
module.exports = {validate};


