//методи  CRUD(UPDATE)
async function logUserVisit(ipAddress){
    const ipadres = await prisma.userStat.upsert({
       where: {
        ip: ipAddress
       },
         update: {
            visitCount: {increment: 1}
         },
           create: {
            ip: ipAddress,
            visitCount: 1
           },
             select: {
                ip: true,
                visitCount: true
             }
    });
    console.log(ipadres);
}
logUserVisit("192.168.1.1");

async function saveTheme(idOfUser, newTheme){
    const savetheme = await prisma.userSettings.upsert({
        where:{
            userId: idOfUser
        },
          update: {
            theme: newTheme
          },
            create: {
                userId: idOfUser,
                theme: newTheme
            },
             select: {
                userId: true,
                theme: true
             }
    });
       console.log(savetheme);
}
saveTheme(376736736, 'shjbjebdj');

async function addToCart(idOfProduct){
    const add = await prisma.cartItem.upsert({
        where: {
            productId: idOfProduct
        },
          update: {
            quantity: {increment: 1}
          },
             create: {
                productId: idOfProduct,
                quantity: 1
             },
               select: {
                productId: true,
                quantity: true
               }
    });
      console.log(add);
}
addToCart("747467kfjf3");
