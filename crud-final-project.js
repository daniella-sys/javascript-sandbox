//Підсумковий проєкт "Повний CRUD + Soft & Cascade Delete"
//створює користувача одразу з його першим постом
async function createUserWithPost(email, name, postTitle) {
  const createuser = await prisma.user.create({
    data: {
      email: email,
      name: name,
      posts: {
        create: {
          title: postTitle
        }
      }
    }
  });
  console.log("Створено користувача з постом:", createuser);
}
createUserWithPost('alex@gmail.com', 'Alex', 'Nested Write');
async function getUsersWithPosts(){
    const getuser = await prisma.user.findMany({
        where: {
            isDeleted: false
        },
        orderBy: { name: 'asc' },
          include: { posts: true }
    });
      console.log("Результат знаходження користувачів:", getuser);
}
getUsersWithPosts();

async function updateUserName(userId, newName){
    const updateuser = await prisma.user.update({
        where: {
            id: userId
        },
          data:  {
            name: newName
        }
    });
      console.log("Оновлено id користувача:", updateuser);
}
updateUserName(56, 'Alex');


async function softDeleteUser(userId){
    const sofydelete = await prisma.user.update({
        where: {
            id: userId
        },
          data: {
            isDeleted: true
          }
    });
     console.log('Успішно видалено:', sofydelete);
}
softDeleteUser(50);

async function hardDeleteUser(userId){
    const deletehard = await prisma.user.delete({
        where: {
            id: userId
        }
    });
     console.log("Успішно видалено:", deletehard);
}
hardDeleteUser(17);
