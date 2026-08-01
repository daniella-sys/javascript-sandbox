//методи  CRUD(CREATE)
async function createProduct(){
const addProduct = await prisma.product.create({ //звернення до моделі з малої літери 
  data: {
    title: "Піца Пепероні",
    price: 280,
    inStock: true
  }
});
console.log(addProduct);
}
createProduct();
async function create() {
const add = await prisma.user.create({
    data: {
        email: "coder@gmail.com",
        nameuser: "Аліса",
        year: 19,
    }
    
});
console.log(add);
}
create(); //виклик функції

async function createCourse(){
    const create = await prisma.course.create({
      data: {
        course_name: "JavaScript Backend Hero",
        duration: 8,
        price: 4500,
      }
    });
    console.log(create);
}
createCourse();

async function createArticle(){
    const createarticle = await prisma.article.create({
        data: {
            title: "Як працює Prisma ORM",
            views: 180
        }
    });
}

async function createOrder(){
    const createorder = await prisma.order.create({
       data: {
        customerName: "Maksum",
         totalPrice: 1200
       }
    });
}
