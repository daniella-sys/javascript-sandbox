//методи  CRUD(READ)
async function getMostExpensivePhone(){
    const phoneget = await prisma.phone.findFirst({
        where: {
            inStock: true
        },
        orderBy: {
            price: 'desc'
        },
        select: {
            modelName: true,
            price: true
        }
    });
    console.log("Знайдений телефон:", phoneget);
}
getMostExpensivePhone();

async function getActiveAccountsCount(){
    const accountcount = await prisma.account.count({
        where: {
            isActive: true
        }
    });
    console.log("Кількість акаунтів:", accountcount);
}
getActiveAccountsCount();

async function getCheapestVipTicket(){
    const vipticket = await prisma.ticket.findFirst({
        where: {
            isVIP: true
        },
        orderBy: {
            price: "asc"
        },
        select: {
            event: true,
            price: true
        }
    });
    console.log("Знайдено квиток:", vipticket);
}
getCheapestVipTicket();

async function getCompletedTasksCount(){
    const taskscount = await prisma.task.count({
        where: {
            isCompleted: true
        }
    });
    console.log("Кількість виконаних завданнь:", taskscount);
}
getCompletedTasksCount();
