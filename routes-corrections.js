//Робота над помилками
//створення Review на книгу 
app.post('/books/:id/reviews', authMiddleware, async (req, res) => {
  const {id} = req.params; //витягуємо ID книги з URL
  const {rating, comment} = req.body;
  //перевірка на наявність вказаних даних
    if(!rating || !comment){
      return res.status(400).json({error: "Обов'язково вкажіть ці дані!"});
    }
    try{
      //шукаємо саму книгу в БД
      const find_book = await prisma.book.findUnique({
        where: {id: Number(id)}
      });
      //якщо немає книги 
       if(!find_book){
        return res.status(404).json({error: "Не знайдено!"});
       }
        //Створюємо огляд
        const review_create = await prisma.review.create({
          data: {
            rating: rating,
            comment: comment,
            bookId: Number(id),
            userId: req.user.userId
          }
        });
         res.status(201).json({message: "Успішно створено огляд на книгу!", review: review_create});
    }catch(error){
      return res.status(500).json({error: error.message});
    }
});

//Отримання списку всіх книг 
app.get('/books', async (req, res) => {
  try{
    const find_books = await prisma.book.findMany({
      include: {
        reviews: true 
      }
    });
     res.status(200).json(find_books);
  }catch(error){
    return res.status(500).json({error: error.message});
  }
});

//Отримання однієї книги за її ID
app.get('/books/:id', async (req, res) => {
  const { id } = req.params; //витягуємо конкретну книгу за її id

  try {
    //Шукаємо книгу в БД
    const find_book = await prisma.book.findUnique({
      where: { id: Number(id) },
      include: {
        reviews: { // Вкладений include: підтягуємо огляди...
          include: {
            user: { // ...і для кожного огляду підтягуємо його автора!
              select: { id: true, name: true }
            }
          }
        }
      }
    });

    //перевірка чи є книга взагалі чи ні
    if (!find_book) {
      return res.status(404).json({ error: "Не знайдено дану книгу!" });
    }

    //якщо все добре просто повертаємо дані
    res.status(200).json(find_book);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
