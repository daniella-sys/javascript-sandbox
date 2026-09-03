//створюємо контролера 
const prisma = require('../lib/prisma.js');


const getProduct = async (req, res) => {
  try{
    //Перетворюємо на числа 
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
     //скільки продуктів будемо пропускати 
     const skip = (page - 1) * limit; 
     //створення захищеного об'єкту
     const whereCondition = {
      userId: req.user.userId
     }
     //якщо є тоді беремо поточного користувача його категорію id і перетворюємо на число бо параметр query у рядковому форматі 
      if(req.query.categoryId){
        whereCondition.categoryId = Number(req.query.categoryId)
      }
      if(req.query.inStock !== undefined){
        whereCondition.inStock = req.query.inStock === 'true';
      }

      //робимо запит у БД шукаємо продукти 
      const products = await prisma.product.findMany({
        where: whereCondition,
        include: { category: { select: { title: true } } },
        take: limit,
        skip: skip
      });
       res.status(200).json(products);
  }catch(error){
    return res.status(500).json({error: error.message});
  }
}

//Створення продукту з перевіркою категорії
const createProduct = async (req, res) => {
  const {title, price, categoryId, inStock} = req.body;
  try{
    //пошук категорії за id 
    const category = await prisma.category.findUnique({
      where: {id: Number(categoryId)}
    });
     if(!category){
      return res.status(404).json({error: "Не існує категорії!"});
     }
     const create_product = await prisma.product.create({
      data: {
        title: title,
        price: Number(price),
        categoryId: Number(categoryId),
        inStock: inStock !== undefined ? Boolean(inStock) : true,
        userId: req.user.userId
      }
     });
      res.status(201).json({ message: "Успішно створено!", product: create_product });
  }catch(error){
    return res.status(500).json({error: error.message});
  }
}
