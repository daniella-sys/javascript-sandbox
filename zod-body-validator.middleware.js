//Middlewares 
const validate = (schema) => (req, res, next) => {
  try{
    const parsed = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query
    });
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
