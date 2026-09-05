//створюємо контролера 
const prisma = require('../lib/prisma.js');

const getProduct = async (req, res) => {
  try{
    //переводимо у числа або задаємо одразу ( скільки продуктів будемо показувати за раз)
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    //скільки будемо пропускати 
    const skip = (page - 1)*limit;
      //захищений об'єкт користувача 
      const whereconditional = {
        userId: req.user.userId
      }
      //якщо Js розпарсив і отримав дані про категорію тоді перетворюємо на число аби знати категорію продукуту даного користувача
        if(req.query.categoryId){
          whereconditional.categoryId = Number(req.query.categoryId);
        }
        //якщо є якісь дані про наявність тоді товар внаявності якщо було б undefined тоді товара не має 
      if(req.query.inStock !== undefined){
        whereconditional.inStock = req.query.inStock === 'true';
      }
      //Вивід усіх продуктів 
      const products = await prisma.product.findMany({
        where: whereconditional,
        include: {
          category: {
            select: {title: true}
          }
        },
        take: limit,
        skip: skip
      });
      res.status(200).json(products);
  }catch(error){
    return res.status(500).json({error: error.message});
  }
}

const createProduct = async (req, res) => {
  const {title, price, categoryId, inStock} = req.body; //витягує дані 
  try{
     const find_categoryId = await prisma.category.findUnique({
      where: {id: Number(categoryId)}
     });
      //Якщоо категорії продукту не знайдено 
      if(!find_categoryId){
        return res.status(404).json({error: 'Не знайдено!'});
      }
      //якщо є створюємо продукт  
      const product = await prisma.product.create({
        data: {
          title: title,
          price: Number(price),
          categoryId: Number(categoryId),
          inStock: inStock !== undefined ? Boolean(inStock) : true,
          userId: req.user.userId
        }
      });
        res.status(201).json({message: "Успішно створено продукт!", product: product});
  }catch(error){
    return res.status(500).json({error: error.message});
  }
}
