//методи  CRUD(CREATE)
async function registerClient(){
    const clientt = await prisma.client.create({
        data: {
            email: "olena.shevchenko@gmail.com",
            password: "super_secret_pass_123",
            fullName: "Олена Шевченко"
        },
          select: {
            id: true,
            email: true,
            fullName: true
        }
    });
    console.log("Створено клієнта:", clientt);
}
registerClient();

async function importSubjects(){
    const importsubject = await prisma.subject.createMany({
        data: [
            {code: "JS-101", title: "Основи JavaScript" },
            { code: "DB-201", title: "Бази даних та Prisma ORM" },
            { code: "NODE-301", title: "Node.js Backend Розробка" }
        ],
        skipDuplicates: true
    });
}

async function createEmployee(){
    const createemployee = await prisma.employee.create({
        data: {
            email: "petro@company.com", salary: 45000, position: "Backend Developer"
        },
        select: {
            email: true,
            position: true
        }
    });
    console.log("Створено робітника:", createemployee);
}
createEmployee();

async function registerCar(){
    const register = await prisma.car.create({
        data: {
            vin: "1HGCR2F83HA000000", brand: "Honda Accord", year: 2017
        },
        select: {
            id: true,
            brand: true
        }
    });
    console.log("Зареєстровано машину:", register);
}
registerCar();

async function createOrder(){
    const create = await prisma.order.create({
        data: {
            orderNumber: "ORD-9942", totalAmount: 1850, status: "processing"
        },
        select: {
            orderNumber: true,
            status: true
        }
    });
    console.log("Створено замовлення:", create);
}
createOrder();

async function importCities(){
    const imporcity = await prisma.city.createMany({
        data: [
            { postalCode: "01001", cityName: "Київ" },
            { postalCode: "79000", cityName: "Львів" },
            { postalCode: "65000", cityName: "Одеса" }
        ],
        skipDuplicates: true
    });
    console.log(imporcity.count);
}
importCities();

async function importLogs(){
    const logs = await prisma.systemLog.createMany({
        data: [
            { logCode: "ERR-500-01", message: "Database connection failed" },
            { logCode: "ERR-404-02", message: "Page not found" },
            { logCode: "WARN-200-03", message: "High memory usage" }
        ],
        skipDuplicates: true
    });
    console.log(logs.count);
}
importLogs();

async function addCategories(){
    const categories = await prisma.category.createMany({
        data: [
            { slug: "electronics", title: "Електроніка" },
            { slug: "laptops", title: "Ноутбуки" },
            { slug: "accessories", title: "Аксесуари" }
        ],
        skipDuplicates: true
    });
    console.log(categories.count);
}
addCategories();
