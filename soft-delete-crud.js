//Soft Delete
//Переводить замовлення в архів за його id.
async function archiveOrder(orderId){
    const archive = await prisma.order.update({
        where: {
            id: orderId
        },
          data: {
            isArchived: true
          }
    });
      console.log("Успішно збережено в архів:", archive);
}
archiveOrder(19);

//Позначає замовлення як м'яко видалене за його id
async function softDeleteOrder(orderId){
    const soft = await prisma.order.update({
        where: {
            id: orderId
        },
          data: {
            deletedAt: new Date()
          }
    });
      console.log('Успішно видалено:', soft);
}
softDeleteOrder(56);

//Відновлює м'яко видалене замовлення за його id.
async function restoreOrder(orderId){
    const restore = await prisma.order.update({
        where: {
            id: orderId
        },  
           data: {
            deletedAt: null
           }
    });
      console.log("Успішно відновлено:", restore);
}
restoreOrder(1);

async function getVisibleOrders(){
    const find = await prisma.order.findMany({
        where: {
            isArchived: false,
            deletedAt: null
        }
    });
       console.log("Лише ті замовлення які не видалені та не архівовані:", find);
}
getVisibleOrders();
