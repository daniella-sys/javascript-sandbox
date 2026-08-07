//Cascade Delete
async function deleteUserAndCascade(userId){
    const deleteuser = await prisma.user.delete({
        where: {
            id: userId
        }
    });
      console.log("Успішно видалено:", deleteuser);
}
deleteUserAndCascade(26);


async function deleteCategoryWithProducts(categoryId){
    const deletecategory = await prisma.category.delete({
        where: {
            id: categoryId
        }
    });
      console.log("Успішно видалено:", deletecategory);
}
deleteCategoryWithProducts(14);


async function deleteCourseWithLessons(courseId){
    const deletecourse = await prisma.course.delete({
        where: {
            id:  courseId
        }
    });
      console.log('Успішно видалено:', deletecourse);
}
deleteCourseWithLessons(37);
