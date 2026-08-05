//методи  CRUD(UPDATE)
async function updateSubscriptionPrice(){
    const update = await prisma.subscription.update({
        where: {
            id: 1 //шукає за id===1
        },
          data: {
            price: 299,
            isActive: true //оновлює дані цими даними
          },
           select: {
            planName: true,
            price: true //повертає лише ці значення
           }
    });
    console.log("Оновлена ціна підписки:", update);
}
updateSubscriptionPrice();

async function unpublishZeroViewArticles(){
    const un = await prisma.article.updateMany({
        where: {
            views: 0
        },
         data: {
            isPublished: false
         }
    });
    console.log(un.count);
}
unpublishZeroViewArticles();

async function incrementVideoViews(){
    const incrementvideoviews = await prisma.video.update({
        where: {
            id: 1
        },
          data: {
            viewsCount: {increment: 1}
          },
           select: {
            title: true,
            viewsCount: true
           }
    });
      console.log("Нарахований перегляд відео:", incrementvideoviews);
}
incrementVideoViews();

async function applyDiscount(){
    const apply = await prisma.storeProduct.update({
        where: {
            id: 1
        },
          data: {
            price: {decrement: 50}
          }, 
            select: {
                title: true,
                price: true
            }
    });
    console.log('Оновлений товар:', apply);
}
applyDiscount();

async function doubleBonusPoints(){
    const double = await prisma.userAccount.update({
        where: {
            id: 1
        },
          data: {
            bonusPoints: {multiply: 2}
          },
            select: {
                username: true,
                bonusPoints: true
            }
    });
    console.log("Оновлені бонуси:", double);
}
doubleBonusPoints();

async function archiveOldCourses(){
    const archive = await prisma.course.updateMany({
        where: {
            category: "Legacy"
        },
          data: {
            isArchived: true
          }
    });
    console.log(archive.count);
}
archiveOldCourses();

async function resetFailedAttempts(){
    const reset = await prisma.loginAttempt.updateMany({
        where: {
            failedAttempts: 5 
        },
        data: {
            failedAttempts: 0
        }
    });
    console.log(reset.count);
}
