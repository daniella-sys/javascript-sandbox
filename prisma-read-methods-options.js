//методи  CRUD(READ)
async function getBookByIsbn(){
    const getbookbyidbn = await prisma.book.findUnique({  //findUnique пошук чогось конкретного(за id)
      where: {
        isbn: "978-1-59327-950-9" //шукати буде саме це
      }
    });
    console.log("знайдений об'єкт книги:", getbookbyidbn);
}
getBookByIsbn(); //виклик функції

async function getGamerByUsername(){
    const getgamerbyusername = await prisma.gamer.findUnique({
        where: {
            username: "CyberHero" //шукає кортстувача за ім'ям
        }
    });
    console.log("Знайдений гравець:", getgamerbyusername);
}
getGamerByUsername();

async function getCarByVin(){
    const getcarbyvin = await prisma.car.findUnique({
      where: {
        vin: "1HGCR2F83HA000000"
      }
    });
    console.log("Знайдений код:", getcarbyvin);
}
getCarByVin();

async function getStudentByCard(){
    const getstudentbycard = await prisma.student.findUnique({
      where: {
        studentCard: "KB12345678"
      }
    });
    console.log("Знайдено студента:", getstudentbycard);
}
getStudentByCard();
//метод .findMany()
async function getAllLaptops(){ 
    const getalllaptops = await prisma.laptop.findMany()//.findMany() отримує всі ноутбуки з бази даних.
       console.log('Всі ноутбуки:', getalllaptops);
}
getAllLaptops();
//findMany + where
async function getActiveCourses(){
    const getactivecourses = await prisma.course.findMany({
       where: {
        //знаходить тільки ті курси, у яких isActive: true
        isActive: true
       }
    });
    console.log("Знайдено активні курси:", getactivecourses);
}
getActiveCourses();
//методи read + опції
async function getUserProfile(){
    const userprofile = await prisma.user.findUnique({
       where: {
        email: "alex@gmail.com"
       },
       select: {
        id: true,
        email: true,
        name: true
       }
    });
    console.log("Знайдено користувача:", userprofile);
}
getUserProfile();

async function getBestFreeGames(){
    const bestfreegames = await prisma.game.findMany({
        where: {
            isFree: true
        },
        select: {
            title: true,
            rating: true //повертає лише ці значення
        },
        orderBy: {
            rating: 'desc' //Сортує ігри за рейтингом від найвищого до найнижчого
        },
        take: {
            take: 3 //Обмежує результат топ-3 іграми
        }
    });
    console.log("Знайдено гру:", bestfreegames);
}
getBestFreeGames();

async function getBookByIsbn1(){
    const book = await prisma.book1.findUnique({
        where: {
            isbn: "978-3-16-148410-0"
        },
        select: {
            title: true,
            author: true
        }
    });
    console.log('Знайдено книгу:', book);
}
getBookByIsbn1();

async function getCheapestProducts(){
    const products = await prisma.product1.findMany({
        where: {
            inStock: true
        },
        select: {
            title: true,
            price: true
        },
        orderBy: {
            price: 'asc'
        },
        take: 4
    });
    console.log("Знайдено продукти:", products);
}
getCheapestProducts();
