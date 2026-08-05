//методи  CRUD(DELETE)
async function deleteUserAccount(userId){
    const deleteuser = await prisma.userAccount.delete({
        where: {
            id: userId
        },
         select: {
            id: true,
            username: true
         }
    });
     console.log('Видалено акаунт:', deleteuser);
}
deleteUserAccount(6);

async function deleteSubscriptionsByPlan(planName){
    const deletesub = await prisma.subscription.deleteMany({
        where: {
            planName: planName
        }
    });
      console.log("Кількість видалених підписок:", deletesub);
}
deleteSubscriptionsByPlan('free');

async function clearUnpublishedArticles(){
    const clear = await prisma.article.deleteMany({
        where: {
            isPublished: false
        }
    });
     console.log("Кількість видалених неопублікованих статей:", clear);
}
clearUnpublishedArticles();

async function deleteVideoIfZeroViews(videoId){
    const deletevideo = await prisma.video.deleteMany({
        where: {
            id: videoId,
             viewsCount: 0
        }
    });
       console.log("Результат видалення відео:", deletevideo);
}
deleteSubscriptionsByPlan(9);

async function deleteInactiveUser(userId){
    const deleteinactiveuser = await prisma.userAccount.deleteMany({
        where: {
            id: userId,
            email: {
                endsWith: "@test.com"
            } 
        }
    });
      console.log('Кількість видалених акаунтів:', deleteinactiveuser);
}
deleteInactiveUser(63);

async function deleteSpecificSubscription(subId){
    const deletespecifi = await prisma.subscription.delete({
        where: {
            id: subId
        },
          select: {
            id: true,
            planName: true
          }
    });
     console.log("Результат видаленої підписки:", deletespecifi);
}
deleteInactiveUser(23);

async function cleanOldArticles(maxViews){
    const deletearticle = await prisma.article.deleteMany({
        where: {
            isPublished: true,
            viewsCount: {
                lt: maxViews
            }
        }
    });
      console.log("Кількість видалених статей:", deletearticle);
}
cleanOldArticles(345);
